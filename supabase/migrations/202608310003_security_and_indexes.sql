-- Public catalog is readable only when explicitly published.
-- Keep RLS enabled on every table exposed through the public Supabase schema.

alter table public.vehicle_makes enable row level security;
alter table public.vehicle_models enable row level security;
alter table public.vehicle_generations enable row level security;
alter table public.vehicles enable row level security;
alter table public.problems enable row level security;
alter table public.diagnostics enable row level security;
alter table public.diagnostic_questions enable row level security;
alter table public.diagnostic_options enable row level security;
alter table public.diagnostic_transitions enable row level security;
alter table public.diagnostic_results enable row level security;
alter table public.diagnostic_checks enable row level security;

create policy "published vehicle makes are public" on public.vehicle_makes
  for select using (exists (
    select 1 from public.vehicle_models m
    join public.vehicle_generations g on g.model_id = m.id
    join public.vehicles v on v.generation_id = g.id
    where m.make_id = vehicle_makes.id and v.is_published
  ));

create policy "published vehicle models are public" on public.vehicle_models
  for select using (exists (
    select 1 from public.vehicle_generations g
    join public.vehicles v on v.generation_id = g.id
    where g.model_id = vehicle_models.id and v.is_published
  ));

create policy "published generations are public" on public.vehicle_generations
  for select using (exists (
    select 1 from public.vehicles v
    where v.generation_id = vehicle_generations.id and v.is_published
  ));

create policy "published vehicles are public" on public.vehicles
  for select using (is_published = true);

create policy "published problems are public" on public.problems
  for select using (is_published = true);

create policy "published diagnostics are public" on public.diagnostics
  for select using (is_published = true);

create policy "published diagnostic questions are public" on public.diagnostic_questions
  for select using (exists (
    select 1 from public.diagnostics d
    where d.id = diagnostic_questions.diagnostic_id and d.is_published
  ));

create policy "published diagnostic options are public" on public.diagnostic_options
  for select using (exists (
    select 1
    from public.diagnostic_questions q
    join public.diagnostics d on d.id = q.diagnostic_id
    where q.id = diagnostic_options.question_id and d.is_published
  ));

create policy "published diagnostic transitions are public" on public.diagnostic_transitions
  for select using (exists (
    select 1
    from public.diagnostic_questions q
    join public.diagnostics d on d.id = q.diagnostic_id
    where q.id = diagnostic_transitions.question_id and d.is_published
  ));

create policy "published diagnostic results are public" on public.diagnostic_results
  for select using (exists (
    select 1 from public.diagnostics d
    where d.id = diagnostic_results.diagnostic_id and d.is_published
  ));

create policy "published diagnostic checks are public" on public.diagnostic_checks
  for select using (exists (
    select 1
    from public.diagnostic_results r
    join public.diagnostics d on d.id = r.diagnostic_id
    where r.id = diagnostic_checks.result_id and d.is_published
  ));

-- Foreign-key lookup indexes for predictable query performance as the catalog grows.
create index if not exists idx_vehicle_models_make on public.vehicle_models(make_id);
create index if not exists idx_vehicle_generations_model on public.vehicle_generations(model_id);
create index if not exists idx_vehicles_generation on public.vehicles(generation_id);
create index if not exists idx_diagnostics_vehicle_problem on public.diagnostics(vehicle_id, problem_id);
create index if not exists idx_questions_diagnostic on public.diagnostic_questions(diagnostic_id);
create index if not exists idx_options_question on public.diagnostic_options(question_id);
create index if not exists idx_transitions_question on public.diagnostic_transitions(question_id);
create index if not exists idx_results_diagnostic on public.diagnostic_results(diagnostic_id);
create index if not exists idx_checks_result on public.diagnostic_checks(result_id);
