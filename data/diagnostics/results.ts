
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
    id: "ruido-riesgo-inmediato",
    title: "Prioriza detenerte de forma segura",
    summary: "Un golpe fuerte, roce continuo o cambios anormales en frenos o dirección pueden comprometer la conducción.",
    safetyNotice: "Detente en un lugar seguro. No continúes si el vehículo no frena, dirige o responde de forma predecible, o si el ruido es intenso y repentino.",
    possibleCauses: ["Condición mecánica o de seguridad que requiere inspección", "Componente que no debe identificarse solo por el sonido"],
    recommendedChecks: ["Solicitar asistencia o una revisión profesional antes de volver a circular.", "Registrar cuándo apareció el ruido sin acercarse a componentes en movimiento."],
    difficulty: "Avanzado",
  },
  {
    id: "ruido-requiere-revision-pronta",
    title: "Conviene revisar el vehículo antes de exigirlo",
    summary: "Un ruido del motor acompañado de advertencia o vibración intensa necesita diagnóstico; el sonido no confirma una pieza específica.",
    safetyNotice: "Detente si aparece una advertencia roja, humo, olor a quemado o pérdida de potencia. Evita acelerar para intentar identificar el origen.",
    possibleCauses: ["Condición de motor que requiere diagnóstico", "Sistema con una falla registrada o pendiente de inspección"],
    recommendedChecks: ["Anotar las luces o mensajes del tablero.", "Solicitar lectura de códigos sin borrarlos y programar una revisión."],
    difficulty: "Intermedio",
  },
  {
    id: "ruido-en-movimiento",
    title: "Registra en qué condiciones aparece el ruido",
    summary: "Un ruido al circular puede provenir de distintos sistemas. Se requiere una revisión para determinar su origen con certeza.",
    possibleCauses: ["Condición de rodaje, frenos, suspensión o tren motriz que requiere revisión", "Elemento externo o de carrocería que debe inspeccionarse"],
    recommendedChecks: ["Anotar si aparece al frenar, girar, pasar un bache o con cierta velocidad, sin provocar maniobras.", "Programar una revisión si se repite o aumenta."],
    difficulty: "Básico",
  },
  {
    id: "ruido-informacion-insuficiente",
    title: "Necesitamos identificar mejor el patrón del ruido",
    summary: "No hay información suficiente para orientar una causa específica de forma segura.",
    possibleCauses: ["Información insuficiente para clasificar el ruido"],
    recommendedChecks: ["Registrar cuándo ocurre y si hay luces o mensajes en el tablero.", "Detenerse si el ruido es repentino, muy intenso o afecta la dirección, los frenos o el motor."],
    difficulty: "Básico",
  },
  {
    id: "tironeo-riesgo-inmediato",
    title: "No continúes si el vehículo pierde funcionamiento de forma intensa",
    summary: "Tirones junto con una advertencia roja, una luz parpadeando o pérdida fuerte de potencia requieren atención antes de seguir circulando.",
    safetyNotice: "Detente en un lugar seguro. Evita conducir si el auto no responde de forma predecible, el motor vibra intensamente o aparece humo.",
    possibleCauses: ["Condición de motor que requiere diagnóstico", "Sistema con una falla que debe revisarse antes de circular"],
    recommendedChecks: ["Registrar las luces o mensajes del tablero.", "Solicitar lectura de códigos sin borrarlos."],
    difficulty: "Avanzado",
  },
  {
    id: "tironeo-al-acelerar",
    title: "El síntoma aparece al pedir aceleración",
    summary: "Este patrón puede estar relacionado con distintos sistemas, pero no confirma una causa sin una revisión y datos del vehículo.",
    possibleCauses: ["Condición de combustible, aire, encendido o control del motor", "Código de falla almacenado"],
    recommendedChecks: ["Anotar el rango de velocidad o condiciones en que ocurre.", "Consultar códigos de falla con un escáner compatible.", "Programar una revisión si se repite."],
    difficulty: "Intermedio",
  },
  {
    id: "tironeo-ralenti",
    title: "El funcionamiento irregular aparece en ralentí",
    summary: "Un motor irregular detenido puede tener varias causas. No es posible identificar una pieza con este síntoma solamente.",
    possibleCauses: ["Condición de admisión, encendido o control de ralentí", "Lectura de sensor que requiere diagnóstico"],
    recommendedChecks: ["Observar el síntoma con el vehículo inmovilizado y freno de estacionamiento aplicado.", "Consultar códigos de falla si hay una advertencia."],
    difficulty: "Intermedio",
  },
  {
    id: "tironeo-informacion-insuficiente",
    title: "Necesitamos identificar mejor el patrón",
    summary: "No hay información suficiente para orientar una causa específica con seguridad.",
    possibleCauses: ["Información insuficiente para clasificar el funcionamiento irregular"],
    recommendedChecks: ["Registrar si ocurre en frío, caliente, al acelerar o al detenerse.", "Detenerse si aparecen advertencias rojas, humo o pérdida fuerte de potencia."],
    difficulty: "Básico",
  },
  {
    id: "potencia-riesgo-inmediato",
    title: "Prioriza detenerte de forma segura",
    summary: "Una pérdida repentina de potencia junto con humo o una advertencia roja puede afectar la capacidad de circular con seguridad.",
    safetyNotice: "No intentes compensar acelerando. Detente en un lugar seguro y solicita asistencia si el síntoma persiste, hay humo o aparece una advertencia roja.",
    possibleCauses: ["Condición que requiere inspección antes de circular", "Sistema de motor o seguridad con funcionamiento anormal"],
    recommendedChecks: ["Registrar las luces o mensajes del tablero.", "Solicitar una revisión profesional antes de volver a circular si la potencia sigue limitada."],
    difficulty: "Avanzado",
  },
  {
    id: "potencia-bajo-carga",
    title: "La pérdida aparece cuando el motor necesita más esfuerzo",
    summary: "El patrón puede orientar una revisión, pero no confirma una causa sin datos del vehículo y códigos de falla.",
    possibleCauses: ["Condición de admisión, combustible, encendido o escape", "Lectura de sensor o control del motor que requiere diagnóstico"],
    recommendedChecks: ["Registrar si hay luz de Check Engine o mensajes en el tablero.", "Solicitar lectura de códigos sin borrarlos.", "Evitar remolcar o exigir el vehículo hasta revisarlo."],
    difficulty: "Intermedio",
  },
  {
    id: "potencia-requiere-revision",
    title: "Conviene programar una revisión del funcionamiento del motor",
    summary: "Una pérdida constante de potencia puede tener distintas causas. Se necesita información adicional antes de señalar una pieza.",
    possibleCauses: ["Condición de mantenimiento o funcionamiento del motor", "Código de falla almacenado"],
    recommendedChecks: ["Anotar cuándo comenzó y si aumenta el consumo de combustible.", "Consultar códigos de falla con un escáner compatible.", "Programar una revisión si el síntoma continúa."],
    difficulty: "Intermedio",
  },
  {
    id: "potencia-informacion-insuficiente",
    title: "Necesitamos observar mejor el patrón de la pérdida",
    summary: "No hay información suficiente para orientar una causa específica de forma segura.",
    possibleCauses: ["Información insuficiente para clasificar el síntoma"],
    recommendedChecks: ["Registrar si ocurre en frío, caliente, con aire acondicionado o en pendientes.", "Detenerse si aparece una advertencia roja o humo."],
    difficulty: "Básico",
  },
  {
    id: "fuga-riesgo-inmediato",
    title: "No continúes hasta evaluar la condición con seguridad",
    summary: "Humo, olor fuerte a combustible, vapor o una advertencia roja pueden indicar una condición que necesita atención inmediata.",
    safetyNotice: "Detente en un lugar seguro, apaga el motor si hacerlo es seguro y evita fuentes de ignición. No abras el sistema de refrigeración cuando esté caliente.",
    possibleCauses: ["Fuga que requiere inspección profesional", "Condición de combustible, aceite o refrigeración que no debe asumirse sin revisión"],
    recommendedChecks: ["Solicitar asistencia si hay humo, combustible o vapor.", "Registrar la ubicación de la mancha solo cuando el vehículo esté frío y detenido."],
    difficulty: "Avanzado",
  },
  {
    id: "fuga-requiere-identificacion",
    title: "Conviene identificar el líquido y vigilar el nivel",
    summary: "Una mancha por sí sola no confirma el origen. El color puede cambiar con el tiempo y diferentes sistemas pueden dejar líquidos parecidos.",
    possibleCauses: ["Pérdida de un fluido que requiere identificación", "Residuo externo que no necesariamente pertenece al vehículo"],
    recommendedChecks: ["Colocar cartón limpio debajo del auto estacionado para observar la zona, sin trabajar bajo el vehículo.", "Consultar el manual para revisar niveles solo con el vehículo frío y en una superficie nivelada.", "Programar una revisión si la mancha crece o vuelve a aparecer."],
    difficulty: "Básico",
  },
  {
    id: "fuga-informacion-insuficiente",
    title: "Necesitamos observar la fuga con más certeza",
    summary: "Sin conocer la ubicación y si existen otras señales, no es seguro orientar una causa específica.",
    possibleCauses: ["Información insuficiente para clasificar la fuga"],
    recommendedChecks: ["Tomar una foto desde una distancia segura cuando el auto esté detenido.", "Detenerse y solicitar ayuda si aparece humo, olor a combustible, vapor o advertencia roja."],
    difficulty: "Básico",
  },
  {
    id: "tablero-riesgo-inmediato",
    title: "Detente de forma segura y no ignores la advertencia",
    summary: "Una luz roja o un mensaje para detenerse puede indicar una condición que requiere atención inmediata.",
    safetyNotice: "Detente en un lugar seguro. No continúes si hay pérdida de potencia, temperatura alta, olor extraño, humo o una advertencia de frenos, aceite o dirección.",
    possibleCauses: ["Condición de seguridad que requiere inspección", "Sistema que necesita atención antes de circular"],
    recommendedChecks: ["Consultar el manual del vehículo para identificar el símbolo.", "Solicitar asistencia profesional si la advertencia permanece activa."],
    difficulty: "Avanzado",
  },
  {
    id: "tablero-check-parpadeando",
    title: "La luz de Check Engine parpadea",
    summary: "Una luz parpadeando requiere atención más pronta que una luz fija. No permite identificar una pieza por sí sola.",
    safetyNotice: "Reduce la marcha y detente si el motor funciona irregularmente, pierde potencia, vibra mucho o notas olor a combustible. Evita seguir conduciendo hasta una revisión.",
    possibleCauses: ["Condición de motor que requiere diagnóstico", "Código de falla almacenado"],
    recommendedChecks: ["Registrar cuándo apareció la luz.", "Solicitar lectura de códigos sin borrarlos."],
    difficulty: "Avanzado",
  },
  {
    id: "tablero-check-fija",
    title: "Conviene leer los códigos de falla",
    summary: "Una luz de Check Engine fija indica que el sistema registró una condición. La luz por sí sola no confirma una causa concreta.",
    possibleCauses: ["Código de falla almacenado", "Condición relacionada con emisiones, sensores o funcionamiento del motor"],
    recommendedChecks: ["Leer códigos con un escáner compatible sin borrarlos.", "Registrar síntomas adicionales antes de pedir revisión."],
    difficulty: "Intermedio",
  },
  {
    id: "tablero-advertencia-ambar",
    title: "Identifica la advertencia antes de decidir",
    summary: "Las luces ámbar suelen indicar que se requiere atención, pero el significado exacto depende de la marca, modelo y año.",
    possibleCauses: ["Sistema que requiere consulta específica del vehículo", "Advertencia de mantenimiento o funcionamiento"],
    recommendedChecks: ["Consultar el manual del vehículo para el símbolo exacto.", "Registrar el mensaje o tomar una foto cuando el auto esté detenido."],
    difficulty: "Básico",
  },
  {
    id: "tablero-identificar-luz",
    title: "Necesitamos identificar el símbolo con certeza",
    summary: "Sin el color y el símbolo exactos no es seguro orientar una causa o una acción.",
    possibleCauses: ["Información insuficiente para clasificar la advertencia"],
    recommendedChecks: ["Detenerse de forma segura si la luz es roja, parpadea o hay otro síntoma.", "Consultar el manual o tomar una foto del tablero detenido."],
    difficulty: "Básico",
  },
  {
    id: "electrico-riesgo-inmediato",
    title: "No continúes manipulando el sistema eléctrico",
    summary:
      "El humo, chispas, olor a quemado o calor anormal pueden indicar una condición de riesgo. No intentes aislar ni reparar cables por tu cuenta.",
    safetyNotice:
      "Detente en un lugar seguro y apaga el vehículo si hacerlo es seguro. Solicita asistencia profesional; ante humo o fuego, aléjate del vehículo y llama a emergencias.",
    possibleCauses: [
      "Cortocircuito o conexión con sobrecalentamiento",
      "Componente eléctrico con una condición anormal",
      "Cableado o aislamiento que requiere inspección profesional",
    ],
    recommendedChecks: [
      "No tocar cables, fusibles ni componentes calientes.",
      "Registrar el lugar y las condiciones en que apareció la señal.",
      "Solicitar una inspección profesional antes de volver a usar el vehículo.",
    ],
    difficulty: "Avanzado",
  },
  {
    id: "electrico-requiere-revision-carga",
    title: "Conviene revisar el sistema de carga pronto",
    summary:
      "La luz de batería normalmente informa sobre el sistema de carga, no confirma que la batería sea la única causa. El vehículo puede perder alimentación después de un tiempo.",
    safetyNotice:
      "Si la luz aparece mientras conduces, reduce el uso de accesorios y busca detenerte con seguridad. No continúes si notas pérdida de dirección asistida, luces o funcionamiento irregular.",
    possibleCauses: [
      "Sistema de carga con funcionamiento irregular",
      "Conexión de batería o tierra que requiere revisión",
      "Batería con una condición que necesita comprobación",
    ],
    recommendedChecks: [
      "Anotar cuándo se enciende la luz y si desaparece.",
      "Solicitar una prueba del sistema de carga y de la batería.",
      "Evitar asumir una pieza dañada sin una medición profesional.",
    ],
    difficulty: "Intermedio",
  },
  {
    id: "electrico-falla-en-marcha",
    title: "Prioriza detenerte de forma segura",
    summary:
      "Una falla eléctrica durante la marcha puede afectar la iluminación, los avisos o sistemas de asistencia. No es posible identificar un circuito específico sin datos del vehículo y una revisión.",
    safetyNotice:
      "No continúes conduciendo si las luces esenciales, el tablero o la dirección asistida fallan. Detente en un lugar seguro y solicita revisión profesional.",
    possibleCauses: [
      "Falla intermitente de alimentación o conexiones",
      "Condición anormal en el sistema de carga",
      "Circuito que requiere diagnóstico específico del vehículo",
    ],
    recommendedChecks: [
      "Registrar qué sistemas fallaron y en qué momento.",
      "No sustituir fusibles por uno de mayor capacidad.",
      "Solicitar diagnóstico con la información específica del vehículo.",
    ],
    difficulty: "Avanzado",
  },
  {
    id: "electrico-accesorio-aislado",
    title: "La falla parece limitada a un circuito o accesorio",
    summary:
      "Un accesorio que falla puede relacionarse con su alimentación, su control o el propio componente. Sin el diagrama correcto del vehículo no se debe señalar un fusible concreto.",
    possibleCauses: [
      "Fusible o protección del circuito que requiere identificación verificada",
      "Conector, cableado o control del accesorio",
      "El accesorio con una condición propia",
    ],
    recommendedChecks: [
      "Consultar el manual correspondiente a la marca, modelo y año exactos.",
      "No instalar un fusible de mayor capacidad ni puentear una protección.",
      "Solicitar revisión si el mismo fusible vuelve a fallar.",
    ],
    difficulty: "Básico",
  },
  {
    id: "electrico-informacion-insuficiente",
    title: "Necesitamos identificar mejor el síntoma eléctrico",
    summary:
      "Las fallas eléctricas pueden involucrar muchos circuitos. Identificar qué funciona y qué no ayudará a realizar una revisión segura y específica.",
    possibleCauses: [
      "Información insuficiente para orientar un circuito concreto",
      "Más de un síntoma que requiere una inspección ordenada",
    ],
    recommendedChecks: [
      "Anotar los testigos, accesorios y momentos en que aparece la falla.",
      "Consultar el manual del vehículo antes de revisar protecciones.",
      "Solicitar revisión si hay pérdida de funciones esenciales o señales de calentamiento.",
    ],
    difficulty: "Básico",
  },
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
