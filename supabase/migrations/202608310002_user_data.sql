create table if not exists public.user_vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id),
  nickname text,
  created_at timestamptz not null default now(),
  unique (user_id, vehicle_id, nickname)
);

create table if not exists public.diagnostic_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id),
  diagnostic_id uuid not null references public.diagnostics(id),
  result_id uuid references public.diagnostic_results(id) on delete set null,
  status text not null default 'in_progress' check (status in ('in_progress','completed','abandoned')),
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.diagnostic_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.diagnostic_sessions(id) on delete cascade,
  question_id uuid not null references public.diagnostic_questions(id),
  option_id uuid not null references public.diagnostic_options(id),
  answered_at timestamptz not null default now(),
  unique (session_id, question_id)
);

create index if not exists idx_user_vehicles_user on public.user_vehicles(user_id);
create index if not exists idx_sessions_user_date on public.diagnostic_sessions(user_id, started_at desc);
create index if not exists idx_answers_session on public.diagnostic_answers(session_id);

alter table public.profiles enable row level security;
alter table public.user_vehicles enable row level security;
alter table public.diagnostic_sessions enable row level security;
alter table public.diagnostic_answers enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "user vehicles own rows" on public.user_vehicles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions own rows" on public.diagnostic_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "answers own sessions" on public.diagnostic_answers for all using (
  exists (select 1 from public.diagnostic_sessions s where s.id = session_id and s.user_id = auth.uid())
) with check (
  exists (select 1 from public.diagnostic_sessions s where s.id = session_id and s.user_id = auth.uid())
);
