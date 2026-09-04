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
  | "home.simple.description";

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
  },
};

export type { TranslationKey };
