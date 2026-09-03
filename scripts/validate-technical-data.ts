import { validateTechnicalCatalog } from "../data/technical/validate";

const issues = validateTechnicalCatalog();

if (issues.length > 0) {
  console.error("Technical data validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log("Technical data validation passed.");
}
