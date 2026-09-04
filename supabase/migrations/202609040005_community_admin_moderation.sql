-- Allows the existing application admin role to moderate community content.
create policy "admins read all community questions" on public.community_questions
  for select to authenticated using (public.is_admin());
create policy "admins update community questions" on public.community_questions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admins read all community answers" on public.community_answers
  for select to authenticated using (public.is_admin());
create policy "admins update community answers" on public.community_answers
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
