-- Cloud history mirrors the current client diagnostic IDs without coupling it
-- to the future UUID-based technical catalog.
create table if not exists public.user_diagnostic_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_entry_id uuid not null,
  vehicle_key text not null check (char_length(trim(vehicle_key)) > 0),
  problem_key text not null check (char_length(trim(problem_key)) > 0),
  result_key text not null check (char_length(trim(result_key)) > 0),
  completed_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (user_id, client_entry_id)
);

create index if not exists idx_user_diagnostic_history_user_date
  on public.user_diagnostic_history(user_id, completed_at desc);

alter table public.user_diagnostic_history enable row level security;

create policy "users read own diagnostic history" on public.user_diagnostic_history
  for select to authenticated using (auth.uid() = user_id);

create policy "users insert own diagnostic history" on public.user_diagnostic_history
  for insert to authenticated with check (auth.uid() = user_id);
