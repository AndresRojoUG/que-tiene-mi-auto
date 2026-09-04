import type { DiagnosticQuestion } from "./types";

export const tironeaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "cuando-tironea",
    question: "¿Cuándo aparecen los jalones o tirones?",
    explanation: "No provoques el síntoma ni hagas pruebas de aceleración. Responde con base en lo que ya observaste conduciendo con seguridad.",
    options: [
      { id: "perdida-control-advertencia", label: "Hay pérdida fuerte de potencia, luz parpadeando o advertencia roja", result: "tironeo-riesgo-inmediato" },
      { id: "al-acelerar", label: "Principalmente al acelerar", result: "tironeo-al-acelerar" },
      { id: "ralenti-o-detenerme", label: "En ralentí o al detenerme", result: "tironeo-ralenti" },
      { id: "no-estoy-seguro", label: "No estoy seguro", result: "tironeo-informacion-insuficiente" },
    ],
  },
];
