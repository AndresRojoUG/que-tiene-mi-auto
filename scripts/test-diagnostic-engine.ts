import assert from "node:assert/strict";
import {
  resolveDiagnosticDefinition,
  type DiagnosticDefinition,
} from "../data/diagnostics";
import { noArrancaDiagnostic } from "../data/diagnostics/no-arranca";
import { seApagaDiagnostic } from "../data/diagnostics/se-apaga";
import { seCalientaDiagnostic } from "../data/diagnostics/se-calienta";
import { electricoDiagnostic } from "../data/diagnostics/electrico";
import { luzTableroDiagnostic } from "../data/diagnostics/luz-tablero";
import { fugaDiagnostic } from "../data/diagnostics/fuga";
import { pierdePotenciaDiagnostic } from "../data/diagnostics/pierde-potencia";
import { runDiagnostic } from "../data/diagnostics/engine";

const startQuestionId = "motor-gira";

const genericDefinition: DiagnosticDefinition = {
  problemId: "escalable",
  startQuestionId: "inicio",
  questions: [],
};
const vehicleSpecificDefinition: DiagnosticDefinition = {
  ...genericDefinition,
  vehicleId: "vehiculo-especifico",
};
assert.equal(
  resolveDiagnosticDefinition(
    [genericDefinition, vehicleSpecificDefinition],
    "escalable",
    "vehiculo-especifico",
  ),
  vehicleSpecificDefinition,
);
assert.equal(
  resolveDiagnosticDefinition(
    [genericDefinition, vehicleSpecificDefinition],
    "escalable",
    "otro-vehiculo",
  ),
  genericDefinition,
);

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

const staleAnswersAreIgnored = runDiagnostic(noArrancaDiagnostic, startQuestionId, {
  "motor-gira": "no-gira",
  "no-gira": "clic",
  "gira-no-arranca": "si",
});
assert.deepEqual(staleAnswersAreIgnored.answers, {
  "motor-gira": "no-gira",
  "no-gira": "clic",
});

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

const temperatureWarning = runDiagnostic(seCalientaDiagnostic, "sintoma-temperatura", {
  "sintoma-temperatura": "advertencia-roja",
});
assert.equal(temperatureWarning.status, "result");
if (temperatureWarning.status === "result") {
  assert.equal(temperatureWarning.resultId, "temperatura-riesgo-inmediato");
}

const temperatureInTraffic = runDiagnostic(seCalientaDiagnostic, "sintoma-temperatura", {
  "sintoma-temperatura": "temperatura-alta",
  "cuando-sube-temperatura": "trafico-o-detenerme",
});
assert.equal(temperatureInTraffic.status, "result");
if (temperatureInTraffic.status === "result") {
  assert.equal(temperatureInTraffic.resultId, "temperatura-en-baja-velocidad");
}

const electricalRisk = runDiagnostic(electricoDiagnostic, "riesgo-electrico", {
  "riesgo-electrico": "si",
});
assert.equal(electricalRisk.status, "result");
if (electricalRisk.status === "result") {
  assert.equal(electricalRisk.resultId, "electrico-riesgo-inmediato");
}

const isolatedAccessory = runDiagnostic(electricoDiagnostic, "riesgo-electrico", {
  "riesgo-electrico": "no",
  "alcance-falla-electrica": "un-accesorio",
});
assert.equal(isolatedAccessory.status, "result");
if (isolatedAccessory.status === "result") {
  assert.equal(isolatedAccessory.resultId, "electrico-accesorio-aislado");
}

const flashingCheckEngine = runDiagnostic(luzTableroDiagnostic, "color-o-senal-tablero", {
  "color-o-senal-tablero": "check-parpadeando",
});
assert.equal(flashingCheckEngine.status, "result");
if (flashingCheckEngine.status === "result") {
  assert.equal(flashingCheckEngine.resultId, "tablero-check-parpadeando");
}

const fuelLeakRisk = runDiagnostic(fugaDiagnostic, "tipo-de-fuga", {
  "tipo-de-fuga": "humo-olor-combustible",
});
assert.equal(fuelLeakRisk.status, "result");
if (fuelLeakRisk.status === "result") {
  assert.equal(fuelLeakRisk.resultId, "fuga-riesgo-inmediato");
}

const suddenPowerLoss = runDiagnostic(pierdePotenciaDiagnostic, "momento-perdida-potencia", {
  "momento-perdida-potencia": "advertencia-o-humo",
});
assert.equal(suddenPowerLoss.status, "result");
if (suddenPowerLoss.status === "result") {
  assert.equal(suddenPowerLoss.resultId, "potencia-riesgo-inmediato");
}

console.log("Diagnostic engine tests passed.");
