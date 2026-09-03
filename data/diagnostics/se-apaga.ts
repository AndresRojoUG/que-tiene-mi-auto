import type { DiagnosticQuestion } from "./types";

export const seApagaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "momento-se-apaga",
    question: "¿En qué momento se apaga el motor con más frecuencia?",
    explanation:
      "El momento en que ocurre ayuda a separar una falla al arrancar de una falla que aparece al detenerse o durante la marcha.",
    options: [
      {
        id: "poco-despues-arrancar",
        label: "Arranca, pero se apaga a los pocos segundos",
        nextQuestion: "temperatura-motor",
      },
      {
        id: "al-detenerme",
        label: "Al detenerme o bajar la velocidad",
        nextQuestion: "se-mantiene-acelerado",
      },
      {
        id: "en-movimiento",
        label: "Mientras voy conduciendo",
        result: "se-apaga-en-movimiento",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "luz-tablero-se-apaga",
      },
    ],
  },
  {
    id: "temperatura-motor",
    question: "¿Ocurre principalmente cuando el motor está frío?",
    explanation:
      "No hagas comprobaciones cerca de bandas, ventiladores o partes calientes con el motor en marcha.",
    options: [
      {
        id: "si",
        label: "Sí, principalmente en frío",
        result: "se-apaga-en-frio",
      },
      {
        id: "no",
        label: "No, también ocurre con el motor caliente",
        nextQuestion: "luz-tablero-se-apaga",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "luz-tablero-se-apaga",
      },
    ],
  },
  {
    id: "se-mantiene-acelerado",
    question: "Si mantienes el motor ligeramente acelerado y el auto está detenido, ¿permanece encendido?",
    explanation:
      "Haz esta observación únicamente con el vehículo inmovilizado, transmisión en neutral o estacionamiento y freno de estacionamiento aplicado.",
    options: [
      {
        id: "si",
        label: "Sí, se mantiene encendido",
        result: "se-apaga-al-detenerse",
      },
      {
        id: "no",
        label: "No, también se apaga",
        nextQuestion: "luz-tablero-se-apaga",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "luz-tablero-se-apaga",
      },
    ],
  },
  {
    id: "luz-tablero-se-apaga",
    question: "¿Se enciende alguna luz de advertencia antes o después de que el motor se apaga?",
    explanation:
      "Observa las luces sin distraerte de la conducción. Si el motor se apaga en marcha, prioriza detenerte en un lugar seguro.",
    options: [
      {
        id: "si",
        label: "Sí",
        result: "se-apaga-con-advertencia",
      },
      {
        id: "no",
        label: "No",
        result: "se-apaga-sin-advertencia",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        result: "se-apaga-sin-advertencia",
      },
    ],
  },
];
