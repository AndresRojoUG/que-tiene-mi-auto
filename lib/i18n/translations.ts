export const supportedLocales = ["es", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "es";

type TranslationKey =
  | "language.es"
  | "language.en"
  | "language.label"
  | "nav.history"
  | "nav.feedback"
  | "nav.account"
  | "nav.myVehicle"
  | "nav.diagnose"
  | "nav.home"
  | "nav.menu"
  | "footer.safety"
  | "footer.feedback"
  | "home.badge"
  | "home.title"
  | "home.description"
  | "home.startDiagnostic"
  | "home.findVehicle"
  | "home.guided.title"
  | "home.guided.description"
  | "home.vehicleInfo.title"
  | "home.vehicleInfo.description"
  | "home.simple.title"
  | "home.simple.description"
  | "common.back"
  | "common.continue"
  | "vehicle.setup"
  | "vehicle.question"
  | "vehicle.description"
  | "vehicle.brand"
  | "vehicle.model"
  | "vehicle.generation"
  | "vehicle.year"
  | "vehicle.engine"
  | "vehicle.selectBrand"
  | "vehicle.selectModel"
  | "vehicle.selectGeneration"
  | "vehicle.selectYear"
  | "vehicle.selectEngine"
  | "vehicle.selected"
  | "vehicle.continueWith"
  | "diagnostic.title"
  | "diagnostic.selectVehicle"
  | "diagnostic.selectVehicleDescription"
  | "diagnostic.startTitle"
  | "diagnostic.startDescription"
  | "diagnostic.selectedVehicle"
  | "diagnostic.howItWorks"
  | "diagnostic.stepOne"
  | "diagnostic.stepTwo"
  | "diagnostic.stepThree"
  | "diagnostic.start"
  | "diagnostic.problemStep"
  | "diagnostic.problemQuestion"
  | "diagnostic.problemDescription"
  | "diagnostic.loading"
  | "myVehicle.notFound"
  | "myVehicle.notFoundDescription"
  | "myVehicle.title"
  | "myVehicle.diagnosisTitle"
  | "myVehicle.diagnosisDescription"
  | "myVehicle.fusesTitle"
  | "myVehicle.fusesDescription"
  | "myVehicle.comingSoon"
  | "myVehicle.relaysTitle"
  | "myVehicle.relaysDescription"
  | "myVehicle.obdTitle"
  | "myVehicle.obdDescription"
  | "myVehicle.maintenanceTitle"
  | "myVehicle.maintenanceDescription"
  | "myVehicle.technicalTitle"
  | "myVehicle.technicalDescription";

type Translations = Record<TranslationKey, string>;

export const translations: Record<Locale, Translations> = {
  es: {
    "language.es": "Español",
    "language.en": "English",
    "language.label": "Idioma",
    "nav.history": "Historial",
    "nav.feedback": "Sugerencias",
    "nav.account": "Cuenta",
    "nav.myVehicle": "Mi auto",
    "nav.diagnose": "Diagnosticar",
    "nav.home": "¿Qué tiene mi auto? — Inicio",
    "nav.menu": "Menú",
    "footer.safety": "Diagnóstico orientativo. Ante una falla que comprometa la seguridad, detén el vehículo en un lugar seguro y busca apoyo profesional.",
    "footer.feedback": "Enviar sugerencia",
    "home.badge": "Diagnóstico automotriz guiado",
    "home.title": "¿Qué tiene mi auto?",
    "home.description": "Identifica posibles causas de una falla con preguntas claras, comprobaciones sencillas e información específica de tu vehículo.",
    "home.startDiagnostic": "Comenzar diagnóstico",
    "home.findVehicle": "Buscar mi vehículo",
    "home.guided.title": "Diagnóstico guiado",
    "home.guided.description": "Responde preguntas sencillas y avanza paso a paso.",
    "home.vehicleInfo.title": "Información de tu auto",
    "home.vehicleInfo.description": "Consulta datos técnicos organizados por vehículo.",
    "home.simple.title": "Sin complicaciones",
    "home.simple.description": "Pensado para usarlo desde el teléfono junto a tu auto.",
    "common.back": "Volver",
    "common.continue": "Continuar",
    "vehicle.setup": "Configura tu vehículo",
    "vehicle.question": "¿Qué vehículo tienes?",
    "vehicle.description": "Selecciona los datos de tu vehículo para mostrar información y diagnósticos específicos.",
    "vehicle.brand": "Marca",
    "vehicle.model": "Modelo",
    "vehicle.generation": "Generación",
    "vehicle.year": "Año",
    "vehicle.engine": "Motor",
    "vehicle.selectBrand": "Selecciona una marca",
    "vehicle.selectModel": "Selecciona un modelo",
    "vehicle.selectGeneration": "Selecciona una generación",
    "vehicle.selectYear": "Selecciona un año",
    "vehicle.selectEngine": "Selecciona un motor",
    "vehicle.selected": "Vehículo seleccionado",
    "vehicle.continueWith": "Continuar con este vehículo",
    "diagnostic.title": "Diagnóstico",
    "diagnostic.selectVehicle": "Selecciona un vehículo",
    "diagnostic.selectVehicleDescription": "Necesitamos saber qué vehículo quieres diagnosticar.",
    "diagnostic.startTitle": "Vamos a revisar tu auto",
    "diagnostic.startDescription": "Te haremos algunas preguntas sobre el problema que presenta tu vehículo para ayudarte a encontrar las posibles causas.",
    "diagnostic.selectedVehicle": "Vehículo seleccionado",
    "diagnostic.howItWorks": "¿Cómo funciona?",
    "diagnostic.stepOne": "Seleccionarás el problema que presenta tu vehículo.",
    "diagnostic.stepTwo": "Te haremos preguntas sencillas sobre los síntomas.",
    "diagnostic.stepThree": "Analizaremos tus respuestas para mostrarte posibles causas y qué puedes comprobar.",
    "diagnostic.start": "Comenzar diagnóstico",
    "diagnostic.problemStep": "Paso 2",
    "diagnostic.problemQuestion": "¿Qué problema tiene tu auto?",
    "diagnostic.problemDescription": "Selecciona el problema que más se parezca a lo que estás experimentando.",
    "diagnostic.loading": "Cargando diagnóstico...",
    "myVehicle.notFound": "Vehículo no encontrado",
    "myVehicle.notFoundDescription": "No pudimos encontrar el vehículo seleccionado.",
    "myVehicle.title": "Mi vehículo",
    "myVehicle.diagnosisTitle": "Diagnóstico",
    "myVehicle.diagnosisDescription": "Descubre qué puede estar causando el problema de tu vehículo.",
    "myVehicle.fusesTitle": "Fusibles",
    "myVehicle.fusesDescription": "Consulta fusibles, ubicaciones y procedimientos de comprobación.",
    "myVehicle.comingSoon": "Próximamente",
    "myVehicle.relaysTitle": "Relevadores",
    "myVehicle.relaysDescription": "Consulta información de relevadores y circuitos.",
    "myVehicle.obdTitle": "OBD",
    "myVehicle.obdDescription": "Consulta códigos y aprende a interpretar problemas de diagnóstico.",
    "myVehicle.maintenanceTitle": "Mantenimiento",
    "myVehicle.maintenanceDescription": "Servicios, revisiones y mantenimiento recomendado.",
    "myVehicle.technicalTitle": "Información técnica",
    "myVehicle.technicalDescription": "Consulta información técnica relacionada con este vehículo.",
  },
  en: {
    "language.es": "Español",
    "language.en": "English",
    "language.label": "Language",
    "nav.history": "History",
    "nav.feedback": "Feedback",
    "nav.account": "Account",
    "nav.myVehicle": "My vehicle",
    "nav.diagnose": "Diagnose",
    "nav.home": "What’s wrong with my car? — Home",
    "nav.menu": "Menu",
    "footer.safety": "This diagnostic is for guidance only. If a fault could compromise safety, stop the vehicle in a safe place and seek professional assistance.",
    "footer.feedback": "Send feedback",
    "home.badge": "Guided automotive diagnosis",
    "home.title": "What’s wrong with my car?",
    "home.description": "Identify possible causes of a fault with clear questions, simple checks, and information specific to your vehicle.",
    "home.startDiagnostic": "Start diagnosis",
    "home.findVehicle": "Find my vehicle",
    "home.guided.title": "Guided diagnosis",
    "home.guided.description": "Answer simple questions and move forward step by step.",
    "home.vehicleInfo.title": "Your vehicle information",
    "home.vehicleInfo.description": "View technical information organized by vehicle.",
    "home.simple.title": "No complications",
    "home.simple.description": "Designed to use from your phone beside your car.",
    "common.back": "Back",
    "common.continue": "Continue",
    "vehicle.setup": "Set up your vehicle",
    "vehicle.question": "Which vehicle do you have?",
    "vehicle.description": "Select your vehicle details to show information and diagnostics specific to it.",
    "vehicle.brand": "Make",
    "vehicle.model": "Model",
    "vehicle.generation": "Generation",
    "vehicle.year": "Year",
    "vehicle.engine": "Engine",
    "vehicle.selectBrand": "Select a make",
    "vehicle.selectModel": "Select a model",
    "vehicle.selectGeneration": "Select a generation",
    "vehicle.selectYear": "Select a year",
    "vehicle.selectEngine": "Select an engine",
    "vehicle.selected": "Selected vehicle",
    "vehicle.continueWith": "Continue with this vehicle",
    "diagnostic.title": "Diagnosis",
    "diagnostic.selectVehicle": "Select a vehicle",
    "diagnostic.selectVehicleDescription": "We need to know which vehicle you want to diagnose.",
    "diagnostic.startTitle": "Let’s look at your car",
    "diagnostic.startDescription": "We’ll ask a few questions about the problem your vehicle has to help identify possible causes.",
    "diagnostic.selectedVehicle": "Selected vehicle",
    "diagnostic.howItWorks": "How does it work?",
    "diagnostic.stepOne": "You will select the problem your vehicle has.",
    "diagnostic.stepTwo": "We’ll ask simple questions about the symptoms.",
    "diagnostic.stepThree": "We’ll analyze your answers to show possible causes and safe checks.",
    "diagnostic.start": "Start diagnosis",
    "diagnostic.problemStep": "Step 2",
    "diagnostic.problemQuestion": "What problem does your car have?",
    "diagnostic.problemDescription": "Select the problem that most resembles what you are experiencing.",
    "diagnostic.loading": "Loading diagnosis...",
    "myVehicle.notFound": "Vehicle not found",
    "myVehicle.notFoundDescription": "We could not find the selected vehicle.",
    "myVehicle.title": "My vehicle",
    "myVehicle.diagnosisTitle": "Diagnosis",
    "myVehicle.diagnosisDescription": "Find out what may be causing your vehicle’s problem.",
    "myVehicle.fusesTitle": "Fuses",
    "myVehicle.fusesDescription": "View fuses, locations, and checking procedures.",
    "myVehicle.comingSoon": "Coming soon",
    "myVehicle.relaysTitle": "Relays",
    "myVehicle.relaysDescription": "View relay and circuit information.",
    "myVehicle.obdTitle": "OBD",
    "myVehicle.obdDescription": "View codes and learn to interpret diagnostic issues.",
    "myVehicle.maintenanceTitle": "Maintenance",
    "myVehicle.maintenanceDescription": "Services, inspections, and recommended maintenance.",
    "myVehicle.technicalTitle": "Technical information",
    "myVehicle.technicalDescription": "View technical information related to this vehicle.",
  },
};

export const diagnosticProblemTranslations: Record<Locale, Record<string, { title: string; description: string }>> = {
  es: {},
  en: {
    "no-arranca": { title: "Won’t start", description: "The engine does not start or crank." },
    "se-apaga": { title: "Stalls", description: "The vehicle starts but then shuts off." },
    tironea: { title: "Jerks or hesitates", description: "The engine runs unevenly." },
    "pierde-potencia": { title: "Loses power", description: "The vehicle does not respond as it should." },
    "se-calienta": { title: "Overheats", description: "Engine temperature rises too much." },
    "luz-tablero": { title: "Dashboard warning light", description: "An EPC, Check Engine, or other warning light came on." },
    ruido: { title: "Makes an unusual noise", description: "The vehicle has an abnormal noise." },
    fuga: { title: "Has a leak", description: "There is oil, coolant, or another fluid." },
    electrico: { title: "Electrical issue", description: "There are issues with lights, accessories, or power supply." },
  },
};

export type { TranslationKey };
