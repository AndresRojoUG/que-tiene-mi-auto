import { diagnosticDefinitions } from "../data/diagnostics";
import { diagnosticResults } from "../data/diagnostics/results";
import { validateDiagnosticDefinitions } from "../data/diagnostics/validate";

const issues = validateDiagnosticDefinitions(
  diagnosticDefinitions,
  diagnosticResults.map((result) => result.id),
);

if (issues.length > 0) {
  console.error("Diagnostic validation failed:");
  for (const issue of issues) {
    console.error(`- [${issue.diagnosticId}] ${issue.message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${diagnosticDefinitions.length} diagnostic definition(s).`);
}
