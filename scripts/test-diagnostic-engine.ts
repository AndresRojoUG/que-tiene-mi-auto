import assert from "node:assert/strict";
import { noArrancaDiagnostic } from "../data/diagnostics/no-arranca";
import { seApagaDiagnostic } from "../data/diagnostics/se-apaga";
import { runDiagnostic } from "../data/diagnostics/engine";

const startQuestionId = "motor-gira";

const initialState = runDiagnostic(noArrancaDiagnostic, startQuestionId);
assert.equal(initialState.status, "question");
if (initialState.status === "question") {
  assert.equal(initialState.question.id, startQuestionId);
}

const startSystemResult = runDiagnostic(noArrancaDiagnostic, startQuestionId, {
  "motor-gira": "no-gira",
  "no-gira": "clic",
});
assert.equal(startSystemResult.status, "result");
if (startSystemResult.status === "result") {
  assert.equal(startSystemResult.resultId, "posible-arranque-clic");
}

const noScannerResult = runDiagnostic(noArrancaDiagnostic, startQuestionId, {
  "motor-gira": "gira-no-arranca",
  "gira-no-arranca": "si",
  "check-engine": "si",
  "rpm-arranque": "sin-escaner",
});
assert.equal(noScannerResult.status, "result");
if (noScannerResult.status === "result") {
  assert.equal(noScannerResult.resultId, "continuar-sin-escaner");
}

const invalidOption = runDiagnostic(noArrancaDiagnostic, startQuestionId, {
  "motor-gira": "respuesta-inexistente",
});
assert.equal(invalidOption.status, "error");

const invalidStart = runDiagnostic(noArrancaDiagnostic, "pregunta-inexistente");
assert.equal(invalidStart.status, "error");

const stallingWhileDriving = runDiagnostic(seApagaDiagnostic, "momento-se-apaga", {
  "momento-se-apaga": "en-movimiento",
});
assert.equal(stallingWhileDriving.status, "result");
if (stallingWhileDriving.status === "result") {
  assert.equal(stallingWhileDriving.resultId, "se-apaga-en-movimiento");
}

const stallingAtIdle = runDiagnostic(seApagaDiagnostic, "momento-se-apaga", {
  "momento-se-apaga": "al-detenerme",
  "se-mantiene-acelerado": "si",
});
assert.equal(stallingAtIdle.status, "result");
if (stallingAtIdle.status === "result") {
  assert.equal(stallingAtIdle.resultId, "se-apaga-al-detenerse");
}

console.log("Diagnostic engine tests passed.");
