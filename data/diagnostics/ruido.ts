import type { DiagnosticQuestion } from "./types";

export const ruidoDiagnostic: DiagnosticQuestion[] = [
  {
    id: "tipo-ruido",
    question: "¿Cómo es el ruido que observaste?",
    explanation:
      "No intentes reproducir el ruido ni te acerques a partes móviles. Responde solo con lo que pudiste percibir conduciendo o con el vehículo detenido de forma segura.",
    options: [
      {
        id: "golpe-fuerte-o-control-anormal",
        label: "Golpe fuerte, roce continuo, frenos o dirección con comportamiento anormal",
        result: "ruido-riesgo-inmediato",
      },
      {
        id: "motor-con-advertencia",
        label: "Ruido del motor junto con una advertencia o vibración intensa",
        result: "ruido-requiere-revision-pronta",
      },
      {
        id: "aparece-en-movimiento",
        label: "Aparece principalmente mientras el auto está en movimiento",
        result: "ruido-en-movimiento",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        result: "ruido-informacion-insuficiente",
      },
    ],
  },
];
