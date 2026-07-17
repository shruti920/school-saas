-- ============================================================================
-- 0003_academic_years.sql
-- Academic Year Management
-- ============================================================================

-- Create academic_years table
create table public.academic_years (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid not null references public.schools(id) on delete cascade,
  name            text not null, -- e.g., '2023-2024', '2024-2025'
  start_date      date not null,
  end_date        date not null,
  is_current      boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint valid_date_range check (end_date >= start_date),
  constraint unique_school_name unique (school_id, name),
  constraint single_current_per_school check (
    (is_current = false) or
    (is_current = true and
     (select count(*) from public.academic_years where school_id = academic_years.school_id and is_current = true) = 1)
  )
);

-- Updated_at trigger
create trigger trg_academic_years_updated_at
before update on public.academic_years
for each row execute function public.set_updated_at();

-- RLS Policies
alter table public.academic_years enable row level security;

-- Select: users can view academic years for their school (or super admin can see all)
create policy academic_years_select on public.academic_years
for select using (
  public.is_super_admin() or
  school_id = public.auth_school_id()
);

-- Insert: school admins and super admins can create academic years for their school
create policy academic_years_insert on public.academic_years
for insert with check (
  public.is_super_admin() or
  (public.auth_role() = 'admin' and school_id = public.auth_school_id())
);

-- Update: school admins and super admins can update academic years for their school
create policy academic_years_update on public.academic_years
for update using (
  public.is_super_admin() or
  (public.auth_role() = 'admin' and school_id = public.auth_school_id())
)
with check (
  public.is_super_admin() or
  (public.auth_role() = 'admin' and school_id = public.auth_school_id())
);

-- Delete: school admins and super admins can delete academic years for their school
-- (with restriction: cannot delete current academic year)
create policy academic_years_delete on public.academic_years
for delete using (
  public.is_super_admin() or
  (public.auth_role() = 'admin' and school_id = public.auth_school_id())
)
using (
  is_current = false or
  (select count(*) from public.academic_years where school_id = academic_years.school_id and is_current = true) > 1
);