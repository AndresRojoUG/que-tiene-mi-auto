import { vehicles, type Vehicle } from "./vehicles";

export function validateVehicleCatalog(catalog: Vehicle[] = vehicles): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  const variants = new Set<string>();

  for (const vehicle of catalog) {
    if (!vehicle.id.trim()) issues.push("Vehicle has a blank ID.");
    if (ids.has(vehicle.id)) issues.push(`Duplicate vehicle ID: ${vehicle.id}.`);
    ids.add(vehicle.id);

    const requiredFields = [
      ["brand", vehicle.brand],
      ["model", vehicle.model],
      ["generation", vehicle.generation],
      ["engine", vehicle.engine],
      ["fuel", vehicle.fuel],
      ["transmission", vehicle.transmission],
    ] as const;
    for (const [field, value] of requiredFields) {
      if (!value.trim()) issues.push(`Vehicle ${vehicle.id} has a blank ${field}.`);
    }

    if (!Number.isInteger(vehicle.year) || vehicle.year < 1886 || vehicle.year > 2100) {
      issues.push(`Vehicle ${vehicle.id} has an invalid year.`);
    }

    const variant = [
      vehicle.brand,
      vehicle.model,
      vehicle.generation,
      vehicle.year,
      vehicle.engine,
      vehicle.fuel,
      vehicle.transmission,
    ].join(":");
    if (variants.has(variant)) issues.push(`Duplicate vehicle variant: ${variant}.`);
    variants.add(variant);
  }

  return issues;
}
