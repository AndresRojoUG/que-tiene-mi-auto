
export type DiagnosticNextAction = {
  type: "technical-info";
  title: string;
  description: string;
  href: string;
};

export type DiagnosticResult = {
  id: string;
  title: string;
  summary: string;
  possibleCauses: string[];
  recommendedChecks: string[];
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  nextAction?: DiagnosticNextAction;
};

export const diagnosticResults: DiagnosticResult[] = [
  {
    id: "posible-arranque-clic",

    title: "Posible problema en el sistema de arranque",

    summary:
      "El clic al intentar arrancar puede indicar un problema relacionado con la batería, conexiones eléctricas, relevador o motor de arranque.",

    possibleCauses: [
      "Batería con poca carga",
      "Terminales o conexiones deficientes",
      "Problema en el circuito de arranque",
      "Motor de arranque",
    ],

    recommendedChecks: [
      "Comprobar el estado y voltaje de la batería.",
      "Revisar que los bornes estén limpios y firmes.",
      "Comprobar las conexiones del sistema de arranque.",
    ],

    difficulty: "Intermedio",
  },

  {
    id: "posible-alimentacion-arranque",

    title: "Posible problema de alimentación del sistema de arranque",

    summary:
      "Si no se escucha ningún sonido al intentar arrancar, debemos investigar primero la alimentación y el circuito de mando del arranque.",

    possibleCauses: [
      "Batería descargada",
      "Conexión eléctrica deficiente",
      "Interruptor o circuito de arranque",
      "Motor de arranque",
    ],

    recommendedChecks: [
      "Comprobar el voltaje de la batería.",
      "Verificar conexiones.",
      "Comprobar el circuito de arranque.",
    ],

    difficulty: "Intermedio",
  },

  {
    id: "posible-bateria",

    title: "La batería es una de las primeras cosas que debemos comprobar",

    summary:
      "Un motor que gira demasiado lentamente puede tener dificultades para arrancar.",

    possibleCauses: [
      "Batería descargada",
      "Batería deteriorada",
      "Terminales sulfatadas",
      "Problema en el sistema de carga",
    ],

    recommendedChecks: [
      "Comprobar el voltaje de la batería.",
      "Revisar terminales y conexiones.",
      "Si es posible, realizar una prueba de batería.",
    ],

    difficulty: "Básico",
  },

  {
    id: "revisar-fusible-bomba",

    title: "Revisar alimentación de la bomba de combustible",

    summary:
      "Si no se escucha la bomba, debemos comprobar primero su circuito eléctrico antes de asumir que la bomba está dañada.",

    possibleCauses: [
      "Fusible",
      "Relevador",
      "Cableado",
      "Alimentación eléctrica",
      "Bomba de combustible",
    ],

    recommendedChecks: [
      "Identificar el fusible correspondiente al vehículo.",
      "Comprobar el estado del fusible.",
      "Comprobar alimentación eléctrica de la bomba.",
    ],

    difficulty: "Intermedio",

    nextAction: {
      type: "technical-info",
      title: "Revisar el fusible de la bomba",
      description:
        "Antes de asumir que la bomba está dañada, podemos revisar el fusible relacionado con su alimentación.",
      href: "/informacion/fusibles?from=diagnostico",
    },
  },

  {
    id: "investigar-senal-rpm",

    title: "Investigar la señal de RPM",

    summary:
      "Si durante el arranque no aparece señal de RPM en el escáner, debemos investigar el sistema que informa a la ECU sobre la velocidad de giro del motor.",

    possibleCauses: [
      "Sensor de posición del cigüeñal",
      "Cableado o conector",
      "Alimentación o tierra del circuito",
      "Problema relacionado con la ECU",
    ],

    recommendedChecks: [
      "Confirmar nuevamente las RPM durante el arranque.",
      "Revisar conectores y cableado.",
      "Realizar diagnóstico con escáner.",
    ],

    difficulty: "Avanzado",
  },

  {
    id: "continuar-diagnostico-combustible-chispa",

    title: "Continuar con combustible y chispa",

    summary:
      "El motor gira y hay indicios de que la bomba funciona. El siguiente paso es comprobar combustible, chispa y señales necesarias para el arranque.",

    possibleCauses: [
      "Presión de combustible incorrecta",
      "Problema de encendido",
      "Inyectores",
      "Sensores del motor",
    ],

    recommendedChecks: [
      "Comprobar presión de combustible.",
      "Comprobar presencia de chispa.",
      "Realizar lectura de códigos OBD.",
    ],

    difficulty: "Intermedio",
  },

  {
    id: "continuar-sin-escaner",

    title: "Necesitamos realizar algunas comprobaciones básicas",

    summary:
      "Aunque no tengas un escáner OBD, podemos continuar realizando comprobaciones básicas del sistema de combustible y encendido.",

    possibleCauses: [
      "Problema de combustible",
      "Problema de encendido",
      "Sensor del motor",
      "Problema eléctrico",
    ],

    recommendedChecks: [
      "Comprobar combustible.",
      "Comprobar chispa.",
      "Revisar fusibles relacionados.",
    ],

    difficulty: "Intermedio",
  },
];
