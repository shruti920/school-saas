-- ============================================================================
-- 0001_initial_schema.sql
-- School Management SaaS — Initial Schema
-- Covers every module from the PRD: schools, people, timetable, attendance,
-- exams, fees, payroll, library, transport, hostel, notes, notifications,
-- admissions, audit log.
--
-- Design notes:
-- - Every tenant-scoped table carries a school_id column (denormalized even
--   where it could be derived via a join) specifically so RLS policies can
--   filter on it directly without expensive joins.
-- - Nursery–Class 5 students have NO auth login (per PRD): students.profile_id
--   is nullable and only populated for Class 6+ students who get accounts.
-- - super_admin has school_id = NULL in profiles (franchise-level, not tied
--   to one school).
-- ============================================================================

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------

create type public.user_role as enum (
  'super_admin',
  'admin',            -- School Admin / Principal
  'teacher',
  'student',
  'parent',
  'accountant',
  'front_office',
  'librarian',
  'transport_manager'
);

create type public.board_type as enum ('CBSE', 'ICSE', 'STATE');

create type public.attendance_status as enum ('present', 'absent', 'late', 'half_day', 'on_leave');

create type public.fee_frequency as enum ('one_time', 'monthly', 'quarterly', 'annual');

create type public.fee_status as enum ('pending', 'partial', 'paid', 'overdue', 'waived', 'refunded');

create type public.payment_mode as enum ('online', 'cash', 'cheque', 'bank_transfer');

create type public.payroll_status as enum ('draft', 'approved', 'paid');

create type public.note_visibility as enum ('individual', 'class');

create type public.exam_category as enum ('unit_test', 'half_yearly', 'annual', 'board', 'competitive', 'other');

create type public.enquiry_status as enum ('new', 'contacted', 'converted', 'rejected');

-- ----------------------------------------------------------------------------
-- HELPER: updated_at trigger function (reused across tables)
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 1. SCHOOLS  (franchise branches, one per state)
-- ----------------------------------------------------------------------------

create table public.schools (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  state                 text not null,
  board_type            public.board_type not null,
  address               text,
  academic_year_start   date not null,
  academic_year_end     date not null,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (state) -- enforced business rule: one school per state
);

create trigger trg_schools_updated_at
before update on public.schools
for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. PROFILES  (1:1 extension of auth.users — every logged-in person)
-- ----------------------------------------------------------------------------

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  school_id     uuid references public.schools(id) on delete restrict, -- null only for super_admin
  role          public.user_role not null,
  full_name     text not null,
  phone         text,
  avatar_url    text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint chk_super_admin_no_school
    check ( (role = 'super_admin' and school_id is null) or (role <> 'super_admin' and school_id is not null) )
);

create index idx_profiles_school_role on public.profiles (school_id, role);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever an auth user is created.
-- Admin creates users via Supabase Admin API with user_metadata:
-- { "role": "...", "school_id": "...", "full_name": "...", "phone": "..." }
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, school_id, role, full_name, phone)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'school_id', '')::uuid,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'parent'),
    coalesce(new.raw_user_meta_data->>'full_name', 'Unnamed User'),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 3. MASTER DATA — classes, sections, subjects (per school)
-- ----------------------------------------------------------------------------

create table public.classes (
  id            uuid primary key default gen_random_uuid(),
  school_id     uuid not null references public.schools(id) on delete cascade,
  name          text not null, -- 'Nursery','LKG','UKG','1'..'12'
  sort_order    smallint not null,
  created_at    timestamptz not null default now(),
  unique (school_id, name)
);

create table public.sections (
  id            uuid primary key default gen_random_uuid(),
  school_id     uuid not null references public.schools(id) on delete cascade, -- denormalized for RLS
  class_id      uuid not null references public.classes(id) on delete cascade,
  name          text not null, -- 'A','B','C'
  created_at    timestamptz not null default now(),
  unique (class_id, name)
);

create table public.subjects (
  id            uuid primary key default gen_random_uuid(),
  school_id     uuid not null references public.schools(id) on delete cascade,
  name          text not null,
  code          text not null,
  created_at    timestamptz not null default now(),
  unique (school_id, code)
);

-- ----------------------------------------------------------------------------
-- 4. STUDENTS  (independent entity — login optional, Class 6+ only)
-- ----------------------------------------------------------------------------

create table public.students (
  id                uuid primary key default gen_random_uuid(),
  school_id         uuid not null references public.schools(id) on delete cascade,
  profile_id        uuid unique references public.profiles(id) on delete set null, -- null until Class 6+ login created
  class_id          uuid not null references public.classes(id),
  section_id        uuid not null references public.sections(id),
  admission_no      text not null,
  full_name         text not null,
  date_of_birth     date,
  gender            text,
  admission_date    date not null default current_date,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (school_id, admission_no)
);

create index idx_students_school_class_section on public.students (school_id, class_id, section_id);

create trigger trg_students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. PARENTS <-> STUDENTS  (many-to-many, sibling support)
-- ----------------------------------------------------------------------------

create table public.parents_students (
  id                  uuid primary key default gen_random_uuid(),
  parent_profile_id   uuid not null references public.profiles(id) on delete cascade,
  student_id          uuid not null references public.students(id) on delete cascade,
  relation            text, -- 'father','mother','guardian'
  created_at          timestamptz not null default now(),
  unique (parent_profile_id, student_id)
);

create index idx_parents_students_student on public.parents_students (student_id);

-- ----------------------------------------------------------------------------
-- 6. TEACHER SUBJECT/CLASS ASSIGNMENTS
-- ----------------------------------------------------------------------------

create table public.teacher_subject_assignments (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  teacher_profile_id  uuid not null references public.profiles(id) on delete cascade,
  subject_id          uuid not null references public.subjects(id) on delete cascade,
  class_id            uuid not null references public.classes(id) on delete cascade,
  section_id          uuid not null references public.sections(id) on delete cascade,
  academic_year       text not null,
  created_at          timestamptz not null default now(),
  unique (teacher_profile_id, subject_id, class_id, section_id, academic_year)
);

-- ----------------------------------------------------------------------------
-- 7. TIMETABLE
-- ----------------------------------------------------------------------------

create table public.timetable_slots (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  class_id            uuid not null references public.classes(id),
  section_id          uuid not null references public.sections(id),
  subject_id          uuid not null references public.subjects(id),
  teacher_profile_id  uuid not null references public.profiles(id),
  day_of_week         smallint not null check (day_of_week between 1 and 7),
  period_number       smallint not null check (period_number > 0),
  start_time          time not null,
  end_time            time not null,
  room                text,
  academic_year       text not null,
  created_at          timestamptz not null default now(),
  -- a section can't have two subjects in the same period
  unique (section_id, day_of_week, period_number, academic_year),
  -- a teacher can't be in two places in the same period
  unique (teacher_profile_id, day_of_week, period_number, academic_year)
);

create index idx_timetable_school on public.timetable_slots (school_id);

-- Substitutions: logged when a teacher covers another's absent class.
-- Feeds directly into payroll extra-pay (see 0008 payroll tables).
create table public.substitutions (
  id                      uuid primary key default gen_random_uuid(),
  school_id               uuid not null references public.schools(id) on delete cascade,
  timetable_slot_id       uuid not null references public.timetable_slots(id) on delete cascade,
  date                    date not null,
  original_teacher_id     uuid not null references public.profiles(id),
  substitute_teacher_id   uuid not null references public.profiles(id),
  extra_pay_amount        numeric(10,2) not null default 0,
  payroll_run_id          uuid, -- set once processed into a payroll run (FK added in 0008 after payroll_runs exists)
  created_at              timestamptz not null default now(),
  unique (timetable_slot_id, date)
);

-- ----------------------------------------------------------------------------
-- 8. ATTENDANCE
-- ----------------------------------------------------------------------------

create table public.attendance (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  student_id      uuid not null references public.students(id) on delete cascade,
  date            date not null,
  period_number   smallint, -- null = whole-day attendance
  status          public.attendance_status not null,
  marked_by       uuid not null references public.profiles(id),
  created_at      timestamptz not null default now()
);

-- Unique per student/date/period, treating NULL period as its own single slot (daily)
create unique index idx_attendance_unique
  on public.attendance (student_id, date, coalesce(period_number, -1));

create index idx_attendance_school_date on public.attendance (school_id, date);

create table public.staff_attendance (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  staff_profile_id    uuid not null references public.profiles(id) on delete cascade,
  date                date not null,
  status              public.attendance_status not null,
  marked_by           uuid not null references public.profiles(id),
  created_at          timestamptz not null default now(),
  unique (staff_profile_id, date)
);

-- ----------------------------------------------------------------------------
-- 9. EXAMS, EXAM TIMETABLE, MARKS
-- ----------------------------------------------------------------------------

create table public.exams (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  name                text not null, -- e.g. 'Half Yearly 2025-26'
  exam_category       public.exam_category not null,
  academic_year       text not null,
  start_date          date,
  end_date            date,
  marks_entry_open    boolean not null default false,
  created_at          timestamptz not null default now()
);

-- Exam timetable — separate from the regular class timetable.
create table public.exam_schedule (
  id              uuid primary key default gen_random_uuid(),
  exam_id         uuid not null references public.exams(id) on delete cascade,
  class_id        uuid not null references public.classes(id),
  subject_id      uuid not null references public.subjects(id),
  exam_date       date not null,
  start_time      time not null,
  end_time        time not null,
  room            text,
  max_marks       numeric(6,2) not null,
  passing_marks   numeric(6,2) not null,
  created_at      timestamptz not null default now(),
  unique (exam_id, class_id, subject_id)
);

create table public.exam_marks (
  id                  uuid primary key default gen_random_uuid(),
  exam_schedule_id    uuid not null references public.exam_schedule(id) on delete cascade,
  student_id          uuid not null references public.students(id) on delete cascade,
  marks_obtained      numeric(6,2),
  grade               text,
  remarks             text,
  entered_by          uuid references public.profiles(id),
  entered_at          timestamptz,
  created_at          timestamptz not null default now(),
  unique (exam_schedule_id, student_id)
);

-- Manual entry: board exam (10th/12th) results, for internal analytics only.
create table public.board_exam_results (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  student_id      uuid not null references public.students(id) on delete cascade,
  board_type      public.board_type not null,
  exam_year       int not null,
  percentage      numeric(5,2),
  grade           text,
  subjects_detail jsonb, -- [{ "subject": "Maths", "marks": 92, "max_marks": 100 }, ...]
  created_at      timestamptz not null default now()
);

-- Manual entry: JEE/NEET/CUET/etc qualifiers, for alumni/marketing analytics.
create table public.competitive_exam_results (
  id            uuid primary key default gen_random_uuid(),
  school_id     uuid not null references public.schools(id) on delete cascade,
  student_id    uuid not null references public.students(id) on delete cascade,
  exam_name     text not null, -- 'JEE Main', 'NEET', 'CUET', 'CLAT', etc.
  exam_year     int not null,
  rank          int,
  score         numeric(8,2),
  qualified     boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 10. FEES
-- ----------------------------------------------------------------------------

create table public.fee_categories (
  id            uuid primary key default gen_random_uuid(),
  school_id     uuid not null references public.schools(id) on delete cascade,
  name          text not null, -- 'Tuition','Transport','Hostel','Misc'
  created_at    timestamptz not null default now(),
  unique (school_id, name)
);

create table public.fee_structures (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  class_id            uuid not null references public.classes(id),
  fee_category_id     uuid not null references public.fee_categories(id),
  amount              numeric(10,2) not null,
  frequency           public.fee_frequency not null,
  academic_year       text not null,
  due_day             smallint, -- day of month fee is due, for recurring frequencies
  late_fee_per_day    numeric(8,2) not null default 0,
  created_at          timestamptz not null default now()
);

-- Actual fee line items assigned to a specific student for the year
-- (generated from fee_structures, with room for per-student overrides/opt-ins
-- like transport or hostel).
create table public.student_fee_assignments (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  student_id          uuid not null references public.students(id) on delete cascade,
  fee_structure_id    uuid not null references public.fee_structures(id),
  amount_due          numeric(10,2) not null,
  due_date            date not null,
  status              public.fee_status not null default 'pending',
  academic_year       text not null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger trg_student_fee_assignments_updated_at
before update on public.student_fee_assignments
for each row execute function public.set_updated_at();

create table public.fee_payments (
  id                          uuid primary key default gen_random_uuid(),
  student_fee_assignment_id  uuid not null references public.student_fee_assignments(id) on delete cascade,
  amount_paid                 numeric(10,2) not null,
  payment_mode                public.payment_mode not null,
  gateway_name                text, -- 'razorpay','cashfree', null if offline
  gateway_ref                  text,
  paid_by                      uuid references public.profiles(id),
  receipt_no                   text,
  status                       text not null default 'success', -- success/failed/refunded
  paid_at                      timestamptz not null default now()
);

create table public.fee_waivers (
  id                          uuid primary key default gen_random_uuid(),
  student_fee_assignment_id  uuid not null references public.student_fee_assignments(id) on delete cascade,
  waived_amount               numeric(10,2) not null,
  reason                      text,
  approved_by                 uuid not null references public.profiles(id),
  created_at                  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 11. PAYROLL  (staff salary + substitution extra pay)
-- ----------------------------------------------------------------------------

create table public.staff_salary_structures (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  staff_profile_id    uuid not null references public.profiles(id) on delete cascade,
  base_pay            numeric(10,2) not null,
  allowances          numeric(10,2) not null default 0,
  deductions          numeric(10,2) not null default 0,
  effective_from      date not null default current_date,
  created_at          timestamptz not null default now()
);

create table public.payroll_runs (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  staff_profile_id    uuid not null references public.profiles(id) on delete cascade,
  month               date not null, -- first day of the month this run covers
  base_pay            numeric(10,2) not null default 0,
  extra_pay           numeric(10,2) not null default 0, -- aggregated substitution pay etc.
  deductions          numeric(10,2) not null default 0,
  net_pay             numeric(10,2) generated always as (base_pay + extra_pay - deductions) stored,
  status              public.payroll_status not null default 'draft',
  approved_by         uuid references public.profiles(id),
  payout_ref          text,
  paid_at             timestamptz,
  created_at          timestamptz not null default now(),
  unique (staff_profile_id, month)
);

-- now that payroll_runs exists, wire up the FK left pending on substitutions
alter table public.substitutions
  add constraint fk_substitutions_payroll_run
  foreign key (payroll_run_id) references public.payroll_runs(id) on delete set null;

-- ----------------------------------------------------------------------------
-- 12. LIBRARY
-- ----------------------------------------------------------------------------

create table public.library_books (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid not null references public.schools(id) on delete cascade,
  title               text not null,
  author              text,
  isbn                text,
  category            text,
  total_copies        int not null default 1,
  available_copies    int not null default 1,
  created_at          timestamptz not null default now(),
  check (available_copies >= 0 and available_copies <= total_copies)
);

create table public.library_issues (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  book_id         uuid not null references public.library_books(id) on delete cascade,
  student_id      uuid not null references public.students(id) on delete cascade,
  issued_by       uuid not null references public.profiles(id),
  issue_date      date not null default current_date,
  due_date        date not null,
  return_date     date,
  fine_amount     numeric(8,2) not null default 0,
  status          text not null default 'issued', -- issued/returned/overdue
  created_at      timestamptz not null default now()
);

create index idx_library_issues_student on public.library_issues (student_id);

-- ----------------------------------------------------------------------------
-- 13. TRANSPORT
-- ----------------------------------------------------------------------------

create table public.transport_routes (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  route_name      text not null,
  vehicle_number  text,
  driver_name     text,
  driver_phone    text,
  capacity        int,
  created_at      timestamptz not null default now()
);

create table public.student_transport (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  student_id      uuid not null references public.students(id) on delete cascade,
  route_id        uuid not null references public.transport_routes(id),
  pickup_point    text,
  monthly_fee     numeric(8,2),
  academic_year   text not null,
  created_at      timestamptz not null default now(),
  unique (student_id, academic_year)
);

-- ----------------------------------------------------------------------------
-- 14. HOSTEL
-- ----------------------------------------------------------------------------

create table public.hostel_rooms (
  id                    uuid primary key default gen_random_uuid(),
  school_id             uuid not null references public.schools(id) on delete cascade,
  block_name            text not null,
  room_number           text not null,
  capacity              int not null default 1,
  warden_profile_id     uuid references public.profiles(id),
  created_at            timestamptz not null default now(),
  unique (school_id, block_name, room_number)
);

create table public.hostel_allotments (
  id                uuid primary key default gen_random_uuid(),
  school_id         uuid not null references public.schools(id) on delete cascade,
  student_id        uuid not null references public.students(id) on delete cascade,
  room_id           uuid not null references public.hostel_rooms(id),
  allotted_from     date not null default current_date,
  allotted_to       date,
  monthly_fee       numeric(8,2),
  created_at        timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 15. TEACHER NOTES TO PARENTS
-- ----------------------------------------------------------------------------

create table public.teacher_notes (
  id                    uuid primary key default gen_random_uuid(),
  school_id             uuid not null references public.schools(id) on delete cascade,
  teacher_profile_id    uuid not null references public.profiles(id),
  student_id            uuid references public.students(id) on delete cascade,  -- set when visibility = 'individual'
  section_id            uuid references public.sections(id) on delete cascade, -- set when visibility = 'class'
  visibility            public.note_visibility not null,
  content               text not null,
  created_at            timestamptz not null default now(),
  check (
    (visibility = 'individual' and student_id is not null and section_id is null)
    or
    (visibility = 'class' and section_id is not null and student_id is null)
  )
);

create index idx_teacher_notes_student on public.teacher_notes (student_id);
create index idx_teacher_notes_section on public.teacher_notes (section_id);

-- ----------------------------------------------------------------------------
-- 16. NOTIFICATIONS / CIRCULARS  (in-app only, per PRD)
-- ----------------------------------------------------------------------------

create table public.notifications (
  id                uuid primary key default gen_random_uuid(),
  school_id         uuid references public.schools(id) on delete cascade, -- null = franchise-wide, Super Admin only
  created_by        uuid not null references public.profiles(id),
  title             text not null,
  body              text,
  target_role       public.user_role,     -- null = all roles
  target_class_id   uuid references public.classes(id),
  target_section_id uuid references public.sections(id),
  created_at        timestamptz not null default now()
);

create table public.notification_reads (
  id                uuid primary key default gen_random_uuid(),
  notification_id   uuid not null references public.notifications(id) on delete cascade,
  profile_id        uuid not null references public.profiles(id) on delete cascade,
  read_at           timestamptz not null default now(),
  unique (notification_id, profile_id)
);

-- ----------------------------------------------------------------------------
-- 17. ADMISSION ENQUIRIES  (public homepage lead form -> Front Office CRM)
-- ----------------------------------------------------------------------------

create table public.admission_enquiries (
  id                    uuid primary key default gen_random_uuid(),
  school_id             uuid references public.schools(id) on delete set null, -- state/school preference, nullable
  student_name          text not null,
  parent_name           text not null,
  phone                 text not null,
  email                 text,
  class_applying_for    text,
  message               text,
  status                public.enquiry_status not null default 'new',
  created_at            timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 18. AUDIT LOG
-- ----------------------------------------------------------------------------

create table public.audit_log (
  id                  uuid primary key default gen_random_uuid(),
  school_id           uuid references public.schools(id) on delete set null,
  actor_profile_id    uuid references public.profiles(id),
  action              text not null, -- e.g. 'fee_waiver_approved', 'marks_edited'
  table_name          text not null,
  record_id           uuid,
  old_data            jsonb,
  new_data            jsonb,
  created_at          timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 19. UTILITY: seed the standard Nursery-12 class list for a new school
-- Call after inserting a school: select public.create_default_classes('<school_id>');
-- ----------------------------------------------------------------------------

create or replace function public.create_default_classes(target_school_id uuid)
returns void
language plpgsql
as $$
declare
  class_names text[] := array['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
  i int;
begin
  for i in 1 .. array_length(class_names, 1) loop
    insert into public.classes (school_id, name, sort_order)
    values (target_school_id, class_names[i], i)
    on conflict (school_id, name) do nothing;
  end loop;
end;
$$;
