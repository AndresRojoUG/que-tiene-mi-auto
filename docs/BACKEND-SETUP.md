# Backend setup checklist

The current public diagnostic flow works without a database. Database and
authentication are intentionally enabled only after a provider has been created
and its security settings reviewed.

## When the project is ready to connect

1. Create the PostgreSQL/Supabase project owned by the project owner.
2. Apply the SQL migrations in `supabase/migrations` through the provider's
   migration workflow, in filename order.
3. Copy `.env.example` to `.env.local` on the machine or hosting environment.
4. Fill in only the values supplied by the provider:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` only where server-side administrative work
     explicitly requires it.

5. Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code, public environment
   variables, Git commits, screenshots, or chat messages.
6. Test row-level security with a normal user account before enabling community
   publishing or diagnostic history.

## What is already prepared

- Published catalog data is readable through row-level security.
- Diagnostic history is scoped to its authenticated owner.
- Community questions and answers start in `pending` moderation status.
- Public visitors can read only content published by moderation.
- Reports are private to the reporting user and the server-side moderation flow.

No production database, user account, credential, or secret is included in this
repository.
