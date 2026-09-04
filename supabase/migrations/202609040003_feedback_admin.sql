create table if not exists public.app_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.app_roles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.app_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create policy "admins read all feedback" on public.product_feedback
  for select to authenticated using (public.is_admin());

create policy "admins update feedback" on public.product_feedback
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
