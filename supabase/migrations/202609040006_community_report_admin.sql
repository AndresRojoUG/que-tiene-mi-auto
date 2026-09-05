-- Allows application admins to review and resolve community reports.
create policy "admins read all community reports" on public.community_reports
  for select to authenticated using (public.is_admin());
create policy "admins update community reports" on public.community_reports
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
