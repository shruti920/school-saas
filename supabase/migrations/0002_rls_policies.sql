-- ============================================================================
-- 0002_rls_policies.sql
-- Row Level Security — the real enforcement layer for multi-tenancy and
-- role-based access. Every tenant-scoped table gets RLS enabled; nothing
-- relies on the app to "remember" to filter by school_id.
--
-- DESIGN CHOICE: helper functions read from the `profiles` table (SECURITY
-- DEFINER, STABLE) rather than custom JWT claims. This avoids requiring a
-- Supabase Auth Hook to be configured in the dashboard before anything works,
-- and is a well-established, safe pattern. If school count/load grows large
-- enough that the extra lookup matters, custom JWT claims can be added later
-- as a pure performance optimization — the policies below don't need to
-- change, only the helper function bodies would.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- HELPER FUNCTIONS
-- ----------------------------------------------------------------------------

create or replace function public.auth_role()
returns public.user_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.auth_school_id()
returns uuid
language sql stable security definer set search_path = public
as $$
  select school_id from public.profiles where id = auth.uid();
$$;

create or replace function public.is_super_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin');
$$;

-- true if the caller is super_admin, OR belongs to the given school
create or replace function public.same_school(target_school uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_super_admin() or public.auth_school_id() = target_school;
$$;

-- true if caller is super_admin, OR is management staff (admin/accountant/
-- front_office/librarian/transport_manager) of the given school
create or replace function public.is_school_management(target_school uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_super_admin() or (
    public.auth_school_id() = target_school
    and public.auth_role() in ('admin','accountant','front_office','librarian','transport_manager')
  );
$$;

-- true if caller is super_admin, OR is specifically the Admin/Principal of the given school
create or replace function public.is_admin_of(target_school uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_super_admin() or (public.auth_school_id() = target_school and public.auth_role() = 'admin');
$$;

-- true if caller is a teacher belonging to the given school
create or replace function public.is_teacher_of(target_school uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select public.auth_school_id() = target_school and public.auth_role() = 'teacher';
$$;

-- true if the caller (parent) is linked to the given student
create or replace function public.is_parent_of_student(target_student uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.parents_students ps
    where ps.student_id = target_student and ps.parent_profile_id = auth.uid()
  );
$$;

-- true if the caller (parent) has any child in the given section (for class-wide notes)
create or replace function public.is_parent_in_section(target_section uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.parents_students ps
    join public.students s on s.id = ps.student_id
    where s.section_id = target_section and ps.parent_profile_id = auth.uid()
  );
$$;

-- true if the caller IS the given student (Class 6+ students with their own login)
create or replace function public.is_self_student(target_student uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.students s
    where s.id = target_student and s.profile_id = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- ENABLE RLS on every table
-- ----------------------------------------------------------------------------

alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.sections enable row level security;
alter table public.subjects enable row level security;
alter table public.students enable row level security;
alter table public.parents_students enable row level security;
alter table public.teacher_subject_assignments enable row level security;
alter table public.timetable_slots enable row level security;
alter table public.substitutions enable row level security;
alter table public.attendance enable row level security;
alter table public.staff_attendance enable row level security;
alter table public.exams enable row level security;
alter table public.exam_schedule enable row level security;
alter table public.exam_marks enable row level security;
alter table public.board_exam_results enable row level security;
alter table public.competitive_exam_results enable row level security;
alter table public.fee_categories enable row level security;
alter table public.fee_structures enable row level security;
alter table public.student_fee_assignments enable row level security;
alter table public.fee_payments enable row level security;
alter table public.fee_waivers enable row level security;
alter table public.staff_salary_structures enable row level security;
alter table public.payroll_runs enable row level security;
alter table public.library_books enable row level security;
alter table public.library_issues enable row level security;
alter table public.transport_routes enable row level security;
alter table public.student_transport enable row level security;
alter table public.hostel_rooms enable row level security;
alter table public.hostel_allotments enable row level security;
alter table public.teacher_notes enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_reads enable row level security;
alter table public.admission_enquiries enable row level security;
alter table public.audit_log enable row level security;

-- ----------------------------------------------------------------------------
-- SCHOOLS
-- ----------------------------------------------------------------------------

create policy schools_select on public.schools
for select using ( public.is_super_admin() or id = public.auth_school_id() );

create policy schools_insert on public.schools
for insert with check ( public.is_super_admin() );

create policy schools_update on public.schools
for update using ( public.is_super_admin() or public.is_admin_of(id) );

create policy schools_delete on public.schools
for delete using ( public.is_super_admin() );

-- ----------------------------------------------------------------------------
-- PROFILES
-- ----------------------------------------------------------------------------

create policy profiles_select on public.profiles
for select using (
  id = auth.uid()
  or public.is_super_admin()
  or public.same_school(school_id)
);

create policy profiles_insert on public.profiles
for insert with check ( public.is_super_admin() or public.is_admin_of(school_id) );

create policy profiles_update on public.profiles
for update using ( id = auth.uid() or public.is_super_admin() or public.is_admin_of(school_id) );

create policy profiles_delete on public.profiles
for delete using ( public.is_super_admin() or public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- MASTER DATA: classes, sections, subjects
-- ----------------------------------------------------------------------------

create policy classes_select on public.classes for select using ( public.same_school(school_id) );
create policy classes_write  on public.classes for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy sections_select on public.sections for select using ( public.same_school(school_id) );
create policy sections_write  on public.sections for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy subjects_select on public.subjects for select using ( public.same_school(school_id) );
create policy subjects_write  on public.subjects for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- STUDENTS
-- ----------------------------------------------------------------------------

create policy students_select on public.students
for select using (
  public.same_school(school_id)              -- any staff/teacher/parent/student in-school context handled below too
  or public.is_self_student(id)
  or public.is_parent_of_student(id)
);

create policy students_insert on public.students
for insert with check ( public.is_school_management(school_id) );

create policy students_update on public.students
for update using ( public.is_school_management(school_id) );

create policy students_delete on public.students
for delete using ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- PARENTS <-> STUDENTS
-- ----------------------------------------------------------------------------

create policy parents_students_select on public.parents_students
for select using (
  parent_profile_id = auth.uid()
  or public.is_super_admin()
  or exists (
    select 1 from public.students s
    where s.id = parents_students.student_id and public.same_school(s.school_id)
  )
);

create policy parents_students_write on public.parents_students
for all using (
  exists (
    select 1 from public.students s
    where s.id = parents_students.student_id and public.is_school_management(s.school_id)
  )
)
with check (
  exists (
    select 1 from public.students s
    where s.id = parents_students.student_id and public.is_school_management(s.school_id)
  )
);

-- ----------------------------------------------------------------------------
-- TEACHER ASSIGNMENTS, TIMETABLE, SUBSTITUTIONS
-- ----------------------------------------------------------------------------

create policy teacher_assignments_select on public.teacher_subject_assignments
for select using ( public.same_school(school_id) );

create policy teacher_assignments_write on public.teacher_subject_assignments
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy timetable_select on public.timetable_slots
for select using ( public.same_school(school_id) );

create policy timetable_write on public.timetable_slots
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy substitutions_select on public.substitutions
for select using ( public.same_school(school_id) );

create policy substitutions_write on public.substitutions
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- ATTENDANCE
-- ----------------------------------------------------------------------------

create policy attendance_select on public.attendance
for select using (
  public.is_school_management(school_id)
  or public.is_teacher_of(school_id)
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy attendance_insert on public.attendance
for insert with check (
  public.is_school_management(school_id)
  or (public.is_teacher_of(school_id) and marked_by = auth.uid())
);

create policy attendance_update on public.attendance
for update using ( public.is_admin_of(school_id) or marked_by = auth.uid() );

create policy attendance_delete on public.attendance
for delete using ( public.is_admin_of(school_id) );

create policy staff_attendance_select on public.staff_attendance
for select using (
  public.is_school_management(school_id)
  or staff_profile_id = auth.uid()
);

create policy staff_attendance_write on public.staff_attendance
for all using (
  public.is_school_management(school_id) or staff_profile_id = auth.uid()
)
with check (
  public.is_school_management(school_id) or staff_profile_id = auth.uid()
);

-- ----------------------------------------------------------------------------
-- EXAMS, EXAM SCHEDULE (TIMETABLE), MARKS
-- ----------------------------------------------------------------------------

create policy exams_select on public.exams for select using ( public.same_school(school_id) );
create policy exams_write  on public.exams for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy exam_schedule_select on public.exam_schedule
for select using (
  exists (select 1 from public.exams e where e.id = exam_schedule.exam_id and public.same_school(e.school_id))
);

create policy exam_schedule_write on public.exam_schedule
for all using (
  exists (select 1 from public.exams e where e.id = exam_schedule.exam_id and public.is_admin_of(e.school_id))
)
with check (
  exists (select 1 from public.exams e where e.id = exam_schedule.exam_id and public.is_admin_of(e.school_id))
);

create policy exam_marks_select on public.exam_marks
for select using (
  public.is_super_admin()
  or exists (
    select 1 from public.exam_schedule es join public.exams e on e.id = es.exam_id
    where es.id = exam_marks.exam_schedule_id and public.same_school(e.school_id)
  )
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy exam_marks_insert on public.exam_marks
for insert with check (
  exists (
    select 1 from public.exam_schedule es join public.exams e on e.id = es.exam_id
    where es.id = exam_marks.exam_schedule_id
      and e.marks_entry_open = true
      and (public.is_admin_of(e.school_id) or public.is_teacher_of(e.school_id))
  )
);

create policy exam_marks_update on public.exam_marks
for update using (
  entered_by = auth.uid()
  or exists (
    select 1 from public.exam_schedule es join public.exams e on e.id = es.exam_id
    where es.id = exam_marks.exam_schedule_id and public.is_admin_of(e.school_id)
  )
);

create policy exam_marks_delete on public.exam_marks
for delete using (
  exists (
    select 1 from public.exam_schedule es join public.exams e on e.id = es.exam_id
    where es.id = exam_marks.exam_schedule_id and public.is_admin_of(e.school_id)
  )
);

create policy board_results_select on public.board_exam_results
for select using (
  public.same_school(school_id) or public.is_self_student(student_id) or public.is_parent_of_student(student_id)
);
create policy board_results_write on public.board_exam_results
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy competitive_results_select on public.competitive_exam_results
for select using (
  public.same_school(school_id) or public.is_self_student(student_id) or public.is_parent_of_student(student_id)
);
create policy competitive_results_write on public.competitive_exam_results
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- FEES
-- ----------------------------------------------------------------------------

create policy fee_categories_select on public.fee_categories for select using ( public.same_school(school_id) );
create policy fee_categories_write  on public.fee_categories for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

create policy fee_structures_select on public.fee_structures for select using ( public.same_school(school_id) );
create policy fee_structures_write  on public.fee_structures for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

create policy student_fee_assignments_select on public.student_fee_assignments
for select using (
  public.is_school_management(school_id)
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy student_fee_assignments_write on public.student_fee_assignments
for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

create policy fee_payments_select on public.fee_payments
for select using (
  paid_by = auth.uid()
  or exists (
    select 1 from public.student_fee_assignments sfa
    where sfa.id = fee_payments.student_fee_assignment_id
      and (
        public.is_school_management(sfa.school_id)
        or public.is_self_student(sfa.student_id)
        or public.is_parent_of_student(sfa.student_id)
      )
  )
);

create policy fee_payments_insert on public.fee_payments
for insert with check (
  paid_by = auth.uid()
  or exists (
    select 1 from public.student_fee_assignments sfa
    where sfa.id = fee_payments.student_fee_assignment_id and public.is_school_management(sfa.school_id)
  )
);

create policy fee_payments_update on public.fee_payments
for update using (
  exists (
    select 1 from public.student_fee_assignments sfa
    where sfa.id = fee_payments.student_fee_assignment_id and public.is_school_management(sfa.school_id)
  )
);

create policy fee_waivers_all on public.fee_waivers
for all using (
  exists (
    select 1 from public.student_fee_assignments sfa
    where sfa.id = fee_waivers.student_fee_assignment_id and public.is_school_management(sfa.school_id)
  )
)
with check (
  exists (
    select 1 from public.student_fee_assignments sfa
    where sfa.id = fee_waivers.student_fee_assignment_id and public.is_school_management(sfa.school_id)
  )
);

-- ----------------------------------------------------------------------------
-- PAYROLL
-- ----------------------------------------------------------------------------

create policy salary_structures_select on public.staff_salary_structures
for select using ( public.is_school_management(school_id) or staff_profile_id = auth.uid() );

create policy salary_structures_write on public.staff_salary_structures
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy payroll_runs_select on public.payroll_runs
for select using ( public.is_school_management(school_id) or staff_profile_id = auth.uid() );

create policy payroll_runs_write on public.payroll_runs
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- LIBRARY
-- ----------------------------------------------------------------------------

create policy library_books_select on public.library_books for select using ( public.same_school(school_id) );
create policy library_books_write  on public.library_books for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

create policy library_issues_select on public.library_issues
for select using (
  public.is_school_management(school_id)
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy library_issues_write on public.library_issues
for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

-- ----------------------------------------------------------------------------
-- TRANSPORT
-- ----------------------------------------------------------------------------

create policy transport_routes_select on public.transport_routes for select using ( public.same_school(school_id) );
create policy transport_routes_write  on public.transport_routes for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

create policy student_transport_select on public.student_transport
for select using (
  public.is_school_management(school_id)
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy student_transport_write on public.student_transport
for all using ( public.is_school_management(school_id) ) with check ( public.is_school_management(school_id) );

-- ----------------------------------------------------------------------------
-- HOSTEL
-- ----------------------------------------------------------------------------

create policy hostel_rooms_select on public.hostel_rooms for select using ( public.same_school(school_id) );
create policy hostel_rooms_write  on public.hostel_rooms for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

create policy hostel_allotments_select on public.hostel_allotments
for select using (
  public.is_school_management(school_id)
  or public.is_self_student(student_id)
  or public.is_parent_of_student(student_id)
);

create policy hostel_allotments_write on public.hostel_allotments
for all using ( public.is_admin_of(school_id) ) with check ( public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- TEACHER NOTES TO PARENTS
-- Enforced here at the DB level: a parent can ONLY ever see notes addressed
-- to their own linked student(s) or their child's section — never anyone else's.
-- ----------------------------------------------------------------------------

create policy teacher_notes_select on public.teacher_notes
for select using (
  teacher_profile_id = auth.uid()
  or public.is_admin_of(school_id)
  or (visibility = 'individual' and public.is_parent_of_student(student_id))
  or (visibility = 'class' and public.is_parent_in_section(section_id))
);

create policy teacher_notes_insert on public.teacher_notes
for insert with check ( public.is_teacher_of(school_id) and teacher_profile_id = auth.uid() );

create policy teacher_notes_update on public.teacher_notes
for update using ( teacher_profile_id = auth.uid() or public.is_admin_of(school_id) );

create policy teacher_notes_delete on public.teacher_notes
for delete using ( teacher_profile_id = auth.uid() or public.is_admin_of(school_id) );

-- ----------------------------------------------------------------------------
-- NOTIFICATIONS
-- ----------------------------------------------------------------------------

create policy notifications_select on public.notifications
for select using (
  school_id is null                      -- franchise-wide notice, visible to all authenticated users
  or public.same_school(school_id)
);

create policy notifications_insert on public.notifications
for insert with check (
  (school_id is null and public.is_super_admin())
  or public.is_school_management(school_id)
  or public.is_teacher_of(school_id)
);

create policy notification_reads_own on public.notification_reads
for all using ( profile_id = auth.uid() ) with check ( profile_id = auth.uid() );

-- ----------------------------------------------------------------------------
-- ADMISSION ENQUIRIES  (public form submits without auth; only staff can read)
-- ----------------------------------------------------------------------------

create policy admission_enquiries_public_insert on public.admission_enquiries
for insert to anon, authenticated
with check ( true );

create policy admission_enquiries_select on public.admission_enquiries
for select using (
  school_id is null and public.is_super_admin()
  or (school_id is not null and public.is_school_management(school_id))
);

create policy admission_enquiries_update on public.admission_enquiries
for update using (
  public.is_super_admin() or (school_id is not null and public.is_school_management(school_id))
);

-- ----------------------------------------------------------------------------
-- AUDIT LOG  (management/super_admin read-only visibility; writes happen
-- through security-definer trigger functions in application logic, not
-- direct client inserts)
-- ----------------------------------------------------------------------------

create policy audit_log_select on public.audit_log
for select using (
  public.is_super_admin() or (school_id is not null and public.is_admin_of(school_id))
);
