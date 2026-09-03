
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
  safetyNotice?: string;
  possibleCauses: string[];
  recommendedChecks: string[];
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  nextAction?: DiagnosticNextAction;
};

export const diagnosticResults: DiagnosticResult[] = [
  {
    id: "temperatura-riesgo-inmediato",
    title: "Detén el vehículo y deja enfriar el motor",
    summary:
      "El vapor, el humo, un olor intenso o una advertencia roja pueden indicar una condición que requiere atención inmediata. No continúes conduciendo si no puedes hacerlo con seguridad.",
    safetyNotice:
      "Detente en un lugar seguro, apaga el motor y no abras el tapón del sistema de refrigeración mientras esté caliente. Solicita ayuda profesional si la advertencia persiste o hay pérdida de líquido.",
    possibleCauses: [
      "Pérdida de refrigerante",
      "Problema de circulación o enfriamiento",
      "Falla que requiere inspección antes de seguir circulando",
    ],
    recommendedChecks: [
      "Esperar a que el motor se enfríe completamente antes de cualquier inspección visual.",
      "Consultar el manual del vehículo para la advertencia mostrada.",
      "Solicitar asistencia profesional si hay vapor, fuga o una advertencia roja.",
    ],
    difficulty: "Avanzado",
  },
  {
    id: "temperatura-en-baja-velocidad",
    title: "La temperatura parece subir a baja velocidad",
    summary:
      "El patrón puede ayudar a una revisión profesional, pero no identifica por sí solo una pieza dañada. Registra cuándo ocurre y evita esperar a que llegue a una advertencia roja.",
    possibleCauses: [
      "Condición que afecta el enfriamiento cuando hay poco flujo de aire",
      "Nivel o estado del refrigerante que requiere revisión",
      "Funcionamiento irregular de un componente del sistema de enfriamiento",
    ],
    recommendedChecks: [
      "Detenerse si la temperatura continúa subiendo.",
      "Registrar si ocurre con el aire acondicionado encendido o en tráfico.",
      "Programar una inspección del sistema de enfriamiento.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "temperatura-requiere-revision",
    title: "Conviene revisar el sistema de enfriamiento pronto",
    summary:
      "Una temperatura superior a la normal puede tener varias causas. No se puede determinar una causa definitiva con esta observación solamente.",
    possibleCauses: [
      "Nivel o condición del refrigerante",
      "Fuga o restricción en el sistema",
      "Funcionamiento irregular de un componente de enfriamiento",
    ],
    recommendedChecks: [
      "No continuar si aparece una advertencia roja o vapor.",
      "Esperar a que el motor se enfríe por completo antes de una inspección visual segura.",
      "Solicitar una revisión profesional si el síntoma se repite.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "temperatura-informacion-insuficiente",
    title: "Necesitamos observar la temperatura con más certeza",
    summary:
      "No hay información suficiente para orientar una causa. Una lectura imprecisa puede llevar a decisiones inseguras.",
    possibleCauses: [
      "Información insuficiente para proponer una causa",
    ],
    recommendedChecks: [
      "Consultar el manual para identificar el testigo o indicador de temperatura.",
      "No abrir el sistema de refrigeración si el motor está caliente.",
      "Detenerse en un lugar seguro si aparece una advertencia roja o vapor.",
    ],
    difficulty: "Básico",
  },
  {
    id: "se-apaga-en-movimiento",
    title: "Prioriza tu seguridad antes de continuar",
    summary:
      "Que el motor se apague durante la marcha puede afectar la dirección asistida, el frenado y otros sistemas. No continúes conduciendo si no puedes hacerlo con seguridad.",
    safetyNotice:
      "Detén el vehículo en un lugar seguro. Si el motor se apaga mientras conduces o el síntoma se repite, evita circular hasta que sea revisado.",
    possibleCauses: [
      "Falla intermitente de alimentación eléctrica",
      "Problema en el sistema de combustible",
      "Falla de encendido o de una señal del motor",
    ],
    recommendedChecks: [
      "Detener el vehículo en un lugar seguro.",
      "Anotar cuándo ocurrió y qué luces se encendieron.",
      "Solicitar una revisión profesional antes de volver a circular si el problema se repite.",
    ],
    difficulty: "Avanzado",
  },
  {
    id: "se-apaga-en-frio",
    title: "Posible problema durante el arranque en frío",
    summary:
      "El síntoma puede relacionarse con la mezcla de aire y combustible, el control de ralentí o una lectura de sensores. Hace falta una comprobación antes de señalar una causa concreta.",
    possibleCauses: [
      "Control de ralentí o admisión de aire",
      "Lectura incorrecta de un sensor del motor",
      "Alimentación de combustible insuficiente",
    ],
    recommendedChecks: [
      "Registrar si el problema mejora al calentarse el motor.",
      "Revisar si hay una luz de advertencia o códigos de falla con un escáner.",
      "Pedir una inspección si el auto se apaga repetidamente.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "se-apaga-al-detenerse",
    title: "Posible problema al mantener el ralentí",
    summary:
      "Si el motor se mantiene encendido al acelerar ligeramente pero se apaga al detenerse, conviene revisar el sistema que mantiene estable el ralentí. No es un diagnóstico definitivo.",
    possibleCauses: [
      "Control de aire al ralentí",
      "Admisión de aire con una condición anormal",
      "Lectura de sensores relacionada con el ralentí",
    ],
    recommendedChecks: [
      "Observar si ocurre con el aire acondicionado o cargas eléctricas activadas.",
      "Consultar códigos de falla si hay una luz de advertencia.",
      "Programar una revisión si el motor se apaga en cruces o semáforos.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "se-apaga-con-advertencia",
    title: "Hay una señal adicional que conviene registrar",
    summary:
      "Una luz de advertencia puede ayudar a orientar el diagnóstico, pero por sí sola no confirma una pieza dañada.",
    possibleCauses: [
      "Código de falla almacenado en el sistema",
      "Falla intermitente de un sensor o circuito",
      "Condición anormal de combustible, aire o encendido",
    ],
    recommendedChecks: [
      "Anotar el símbolo o mensaje mostrado en el tablero.",
      "Leer códigos con un escáner compatible sin borrar la información.",
      "Solicitar revisión profesional si aparece una advertencia roja o el motor se apaga en movimiento.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "se-apaga-sin-advertencia",
    title: "Se necesita reunir más evidencia",
    summary:
      "El síntoma puede tener varias causas y no hay datos suficientes para afirmar una sola. Registrar el momento y las condiciones ayudará a una revisión posterior.",
    possibleCauses: [
      "Falla intermitente de combustible, aire o encendido",
      "Conexión eléctrica intermitente",
      "Lectura irregular de un sensor",
    ],
    recommendedChecks: [
      "Anotar si ocurre en frío, caliente, al frenar o al usar accesorios eléctricos.",
      "Comprobar si existen códigos de falla con un escáner.",
      "Evitar conducir si el motor se apaga de forma impredecible.",
    ],
    difficulty: "Intermedio",
  },
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
