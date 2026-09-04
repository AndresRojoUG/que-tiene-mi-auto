create table if not exists public.product_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  category text not null default 'suggestion'
    check (category in ('suggestion', 'issue', 'content_request')),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'planned', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists idx_product_feedback_status_date
  on public.product_feedback(status, created_at desc);
create index if not exists idx_product_feedback_user_date
  on public.product_feedback(user_id, created_at desc);

alter table public.product_feedback enable row level security;

create policy "users create own feedback" on public.product_feedback
  for insert to authenticated with check (auth.uid() = user_id);

create policy "users read own feedback" on public.product_feedback
  for select to authenticated using (auth.uid() = user_id);
