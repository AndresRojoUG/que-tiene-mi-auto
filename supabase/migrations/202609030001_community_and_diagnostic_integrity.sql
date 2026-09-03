-- Extends the catalog without coupling the current public diagnostic flow to auth.
-- Apply this migration only through the configured database migration workflow.

alter table public.diagnostic_results
  add column if not exists safety_notice text;

create table if not exists public.diagnostic_result_causes (
  id uuid primary key default gen_random_uuid(),
  result_id uuid not null references public.diagnostic_results(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0
);

create index if not exists idx_result_causes_result
  on public.diagnostic_result_causes(result_id, sort_order);

-- A transition is valid only when it leads to one next question or one result.
-- NOT VALID keeps this migration safe for an existing database; validate it after
-- auditing any legacy catalog data.
alter table public.diagnostic_transitions
  add constraint diagnostic_transitions_one_destination
  check (num_nonnulls(next_question_id, result_key) = 1) not valid;

create table if not exists public.community_questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id),
  problem_id uuid references public.problems(id),
  title text not null check (char_length(trim(title)) between 8 and 160),
  body text not null check (char_length(trim(body)) between 20 and 5000),
  status text not null default 'pending'
    check (status in ('pending', 'published', 'hidden', 'removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.community_questions(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 10 and 5000),
  status text not null default 'pending'
    check (status in ('pending', 'published', 'hidden', 'removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid references public.community_questions(id) on delete cascade,
  answer_id uuid references public.community_answers(id) on delete cascade,
  reason text not null check (char_length(trim(reason)) between 10 and 1000),
  status text not null default 'open'
    check (status in ('open', 'reviewed', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  check (num_nonnulls(question_id, answer_id) = 1)
);

create index if not exists idx_community_questions_vehicle_status
  on public.community_questions(vehicle_id, status, created_at desc);
create index if not exists idx_community_questions_author
  on public.community_questions(author_id, created_at desc);
create index if not exists idx_community_answers_question_status
  on public.community_answers(question_id, status, created_at);
create index if not exists idx_community_reports_status
  on public.community_reports(status, created_at);

alter table public.diagnostic_result_causes enable row level security;
alter table public.community_questions enable row level security;
alter table public.community_answers enable row level security;
alter table public.community_reports enable row level security;

create policy "published result causes are public" on public.diagnostic_result_causes
  for select using (exists (
    select 1
    from public.diagnostic_results result
    join public.diagnostics diagnostic on diagnostic.id = result.diagnostic_id
    where result.id = diagnostic_result_causes.result_id
      and diagnostic.is_published
  ));

create policy "published community questions are public" on public.community_questions
  for select using (status = 'published');
create policy "authors can read their questions" on public.community_questions
  for select to authenticated using (auth.uid() = author_id);
create policy "authenticated users can create pending questions" on public.community_questions
  for insert to authenticated with check (
    auth.uid() = author_id and status = 'pending'
  );
create policy "authors can edit pending questions" on public.community_questions
  for update to authenticated using (
    auth.uid() = author_id and status = 'pending'
  ) with check (
    auth.uid() = author_id and status = 'pending'
  );

create policy "published community answers are public" on public.community_answers
  for select using (status = 'published');
create policy "authors can read their answers" on public.community_answers
  for select to authenticated using (auth.uid() = author_id);
create policy "authenticated users can create pending answers" on public.community_answers
  for insert to authenticated with check (
    auth.uid() = author_id and status = 'pending'
  );
create policy "authors can edit pending answers" on public.community_answers
  for update to authenticated using (
    auth.uid() = author_id and status = 'pending'
  ) with check (
    auth.uid() = author_id and status = 'pending'
  );

create policy "reporters can read their reports" on public.community_reports
  for select to authenticated using (auth.uid() = reporter_id);
create policy "authenticated users can create reports" on public.community_reports
  for insert to authenticated with check (auth.uid() = reporter_id);
