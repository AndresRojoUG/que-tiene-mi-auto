export type DiagnosticProblem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const diagnosticProblems: DiagnosticProblem[] = [
  {
    id: "no-arranca",
    title: "No enciende",
    description: "El motor no arranca o no da marcha.",
    icon: "🔴",
  },
  {
    id: "se-apaga",
    title: "Se apaga",
    description: "El vehículo arranca pero se apaga.",
    icon: "🟠",
  },
  {
    id: "tironea",
    title: "Tironea o da jalones",
    description: "El motor funciona de manera irregular.",
    icon: "🟡",
  },
  {
    id: "pierde-potencia",
    title: "Pierde potencia",
    description: "El vehículo no responde como debería.",
    icon: "🔵",
  },
  {
    id: "se-calienta",
    title: "Se calienta",
    description: "La temperatura del motor aumenta demasiado.",
    icon: "🌡️",
  },
  {
    id: "luz-tablero",
    title: "Luz en el tablero",
    description: "Se encendió EPC, Check Engine u otra luz.",
    icon: "💡",
  },
  {
    id: "ruido",
    title: "Hace un ruido extraño",
    description: "El vehículo presenta un ruido anormal.",
    icon: "🔊",
  },
  {
    id: "fuga",
    title: "Tiene una fuga",
    description: "Hay aceite, refrigerante u otro líquido.",
    icon: "💧",
  },
  {
    id: "electrico",
    title: "Problema eléctrico",
    description: "Hay fallas con luces, accesorios o alimentación.",
    icon: "⚡",
  },
];