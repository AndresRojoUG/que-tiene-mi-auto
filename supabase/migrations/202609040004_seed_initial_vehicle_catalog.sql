-- Links the client vehicle keys to the UUID catalog used by community content.
-- Safe to run more than once.
insert into public.vehicle_makes (name, slug)
values ('Volkswagen', 'volkswagen'), ('Nissan', 'nissan')
on conflict (slug) do update set name = excluded.name;

insert into public.vehicle_models (make_id, name, slug)
select make.id, model.name, model.slug
from (
  values ('volkswagen', 'Jetta', 'jetta'), ('volkswagen', 'Golf', 'golf'), ('nissan', 'Sentra', 'sentra')
) as model(make_slug, name, slug)
join public.vehicle_makes make on make.slug = model.make_slug
on conflict (make_id, slug) do update set name = excluded.name;

insert into public.vehicle_generations (model_id, name, slug, year_start, year_end)
select model.id, generation.name, generation.slug, generation.year_start, generation.year_end
from (
  values ('jetta', 'A4 / Classic', 'a4-classic', 1999::smallint, 2014::smallint), ('golf', 'A4', 'a4', 1999::smallint, 2006::smallint), ('sentra', 'B16', 'b16', 2007::smallint, 2012::smallint)
) as generation(model_slug, name, slug, year_start, year_end)
join public.vehicle_models model on model.slug = generation.model_slug
on conflict (model_id, slug) do update set name = excluded.name, year_start = excluded.year_start, year_end = excluded.year_end;

insert into public.vehicles (generation_id, name, slug, year, engine, fuel, transmission, is_published)
select generation.id, vehicle.name, vehicle.slug, vehicle.year, vehicle.engine, vehicle.fuel, vehicle.transmission, true
from (
  values
    ('a4-classic', 'Volkswagen Jetta A4 / Classic 2009 2.0', 'vw-jetta-a4-classic-2009-2.0', 2009::smallint, '2.0', 'Gasolina', 'Manual'),
    ('a4', 'Volkswagen Golf A4 2008 2.0', 'vw-golf-a4-2008-2.0', 2008::smallint, '2.0', 'Gasolina', 'Manual'),
    ('b16', 'Nissan Sentra B16 2011 2.0', 'nissan-sentra-b16-2011-2.0', 2011::smallint, '2.0', 'Gasolina', 'Manual')
) as vehicle(generation_slug, name, slug, year, engine, fuel, transmission)
join public.vehicle_generations generation on generation.slug = vehicle.generation_slug
on conflict (slug) do update set name = excluded.name, is_published = true;
