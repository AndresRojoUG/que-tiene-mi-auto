create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_makes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.vehicle_models (
  id uuid primary key default gen_random_uuid(),
  make_id uuid not null references public.vehicle_makes(id),
  name text not null,
  slug text not null,
  unique (make_id, slug)
);

create table if not exists public.vehicle_generations (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.vehicle_models(id),
  name text not null,
  slug text not null,
  year_start smallint,
  year_end smallint,
  unique (model_id, slug),
  check (year_start is null or year_start between 1886 and 2100),
  check (year_end is null or year_end between 1886 and 2100),
  check (year_end is null or year_start is null or year_end >= year_start)
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  generation_id uuid not null references public.vehicle_generations(id),
  name text not null,
  slug text not null unique,
  year smallint not null check (year between 1886 and 2100),
  engine text not null,
  fuel text not null,
  transmission text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  is_published boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  problem_id uuid not null references public.problems(id),
  name text not null,
  version integer not null default 1 check (version > 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (vehicle_id, problem_id, version)
);

create table if not exists public.diagnostic_questions (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  question_key text not null,
  question text not null,
  description text,
  sort_order integer not null default 0,
  unique (diagnostic_id, question_key)
);

create table if not exists public.diagnostic_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.diagnostic_questions(id) on delete cascade,
  option_key text not null,
  label text not null,
  sort_order integer not null default 0,
  unique (question_id, option_key)
);

create table if not exists public.diagnostic_transitions (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.diagnostic_questions(id) on delete cascade,
  option_id uuid not null references public.diagnostic_options(id) on delete cascade,
  next_question_id uuid references public.diagnostic_questions(id),
  result_key text,
  unique (question_id, option_id)
);

create table if not exists public.diagnostic_results (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  result_key text not null,
  title text not null,
  description text not null,
  probability_label text,
  difficulty text,
  next_action text,
  unique (diagnostic_id, result_key)
);

create table if not exists public.diagnostic_checks (
  id uuid primary key default gen_random_uuid(),
  result_id uuid not null references public.diagnostic_results(id) on delete cascade,
  title text not null,
  description text not null,
  safety_note text,
  sort_order integer not null default 0
);
