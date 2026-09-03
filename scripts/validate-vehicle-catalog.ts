import { validateVehicleCatalog } from "../data/vehicles.validate";

const issues = validateVehicleCatalog();

if (issues.length > 0) {
  console.error("Vehicle catalog validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log("Vehicle catalog validation passed.");
}
