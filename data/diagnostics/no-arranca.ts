export type DiagnosticOption = {
  id: string;
  label: string;
  nextQuestion?: string;
  result?: string;
};

export type DiagnosticQuestion = {
  id: string;
  question: string;
  explanation?: string;
  options: DiagnosticOption[];
};

export const noArrancaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "motor-gira",
    question: "¿Qué ocurre cuando intentas encender el auto?",
    explanation:
      "Esto nos ayuda a determinar si el problema está en el sistema de arranque o si el motor gira pero no logra encender.",
    options: [
      {
        id: "no-gira",
        label: "El motor no gira",
        nextQuestion: "no-gira",
      },
      {
        id: "gira-no-arranca",
        label: "El motor gira, pero no arranca",
        nextQuestion: "gira-no-arranca",
      },
      {
        id: "arranca-apaga",
        label: "Arranca y se apaga inmediatamente",
        nextQuestion: "arranca-apaga",
      },
      {
        id: "no-se",
        label: "No estoy seguro",
        nextQuestion: "identificar-sonido",
      },
    ],
  },

  {
    id: "identificar-sonido",
    question:
      "Cuando giras la llave, ¿escuchas que el motor hace un sonido repetitivo como 'rrr-rrr-rrr'?",
    explanation:
      "El objetivo es determinar si el motor está siendo girado por el motor de arranque.",
    options: [
      {
        id: "si",
        label: "Sí",
        nextQuestion: "gira-no-arranca",
      },
      {
        id: "no",
        label: "No",
        nextQuestion: "no-gira",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
      },
    ],
  },

  {
    id: "no-gira",
    question: "Cuando intentas arrancar, ¿qué escuchas?",
    options: [
      {
        id: "clic",
        label: "Se escucha un clic",
        result: "posible-arranque-clic",
      },
      {
        id: "nada",
        label: "No se escucha nada",
        result: "posible-alimentacion-arranque",
      },
      {
        id: "gira-lento",
        label: "El motor gira muy lentamente",
        result: "posible-bateria",
      },
    ],
  },

  {
    id: "gira-no-arranca",
    question: "¿La bomba de combustible se escucha durante unos segundos al poner el switch?",
    explanation:
      "La bomba normalmente se activa brevemente al colocar el switch en posición de encendido. Esto puede ayudarnos a determinar si debemos investigar el sistema de combustible.",
    options: [
      {
        id: "si",
        label: "Sí",
        nextQuestion: "check-engine",
      },
      {
        id: "no",
        label: "No",
        nextQuestion: "fusible-bomba",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "check-engine",
      },
    ],
  },

  {
    id: "fusible-bomba",
    question:
      "¿Quieres revisar primero el fusible relacionado con la bomba de combustible?",
    options: [
      {
        id: "si",
        label: "Sí",
        result: "revisar-fusible-bomba",
      },
      {
        id: "no",
        label: "Continuar con el diagnóstico",
        nextQuestion: "check-engine",
      },
    ],
  },

  {
    id: "check-engine",
    question:
      "¿La luz de Check Engine se enciende al poner el switch antes de arrancar?",
    options: [
      {
        id: "si",
        label: "Sí",
        nextQuestion: "rpm-arranque",
      },
      {
        id: "no",
        label: "No",
        nextQuestion: "rpm-arranque",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "rpm-arranque",
      },
    ],
  },

  {
    id: "rpm-arranque",
    question:
      "Si tienes un escáner OBD, ¿puedes ver las RPM mientras intentas arrancar?",
    explanation:
      "La información de RPM durante el arranque puede ayudar a evaluar si la ECU está recibiendo una señal de giro del motor.",
    options: [
      {
        id: "si-hay-rpm",
        label: "Sí, aparecen RPM",
        result: "continuar-diagnostico-combustible-chispa",
      },
      {
        id: "no-hay-rpm",
        label: "No aparecen RPM",
        result: "investigar-senal-rpm",
      },
      {
        id: "sin-escaner",
        label: "No tengo escáner",
        result: "continuar-sin-escaner",
      },
    ],
  },
];