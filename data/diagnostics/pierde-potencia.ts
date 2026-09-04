import type { DiagnosticQuestion } from "./types";

export const pierdePotenciaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "momento-perdida-potencia",
    question: "¿Cuándo notas más la pérdida de potencia?",
    explanation: "No hagas pruebas de aceleración en la vía. Responde solo con lo que ya hayas observado conduciendo con seguridad.",
    options: [
      { id: "advertencia-o-humo", label: "Hay una advertencia roja, humo o una pérdida de potencia repentina", result: "potencia-riesgo-inmediato" },
      { id: "al-acelerar-o-subida", label: "Al acelerar, subir una pendiente o cargar el vehículo", result: "potencia-bajo-carga" },
      { id: "siempre", label: "Casi todo el tiempo", result: "potencia-requiere-revision" },
      { id: "no-estoy-seguro", label: "No estoy seguro", result: "potencia-informacion-insuficiente" },
    ],
  },
];
