export type ObdCode = {
  code: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  safety: "info" | "review-soon" | "stop-if-symptoms";
  scope: "generic" | "manufacturer";
};

/** Generic SAE-style powertrain DTCs. They describe a system, never confirm a part. */
export const obdCodes: ObdCode[] = [
  { code: "P0101", title: { es: "Rango o desempeño del circuito de flujo de aire", en: "Mass air flow circuit range/performance" }, description: { es: "El sistema detectó una lectura de aire fuera del rango esperado. Requiere diagnóstico; no confirma un sensor específico.", en: "The system detected an air reading outside the expected range. Diagnosis is required; it does not confirm a specific sensor." }, safety: "review-soon", scope: "generic" },
  { code: "P0171", title: { es: "Sistema demasiado pobre, banco 1", en: "System too lean, bank 1" }, description: { es: "La corrección de mezcla llegó a un límite. Puede relacionarse con aire, combustible o medición, sin confirmar una causa.", en: "Fuel-trim correction reached a limit. It may involve air, fuel, or measurement without confirming a cause." }, safety: "review-soon", scope: "generic" },
  { code: "P0300", title: { es: "Falla de encendido aleatoria o múltiple detectada", en: "Random or multiple cylinder misfire detected" }, description: { es: "Puede provocar vibración o pérdida de potencia. Si la luz Check Engine parpadea, evita conducir hasta una revisión.", en: "It can cause vibration or power loss. If the Check Engine light flashes, avoid driving until inspection." }, safety: "stop-if-symptoms", scope: "generic" },
  { code: "P0420", title: { es: "Eficiencia del catalizador por debajo del umbral, banco 1", en: "Catalyst system efficiency below threshold, bank 1" }, description: { es: "Indica una condición registrada en el sistema de emisiones; se necesitan más datos antes de señalar un componente.", en: "It indicates a recorded emissions-system condition; more data is needed before identifying a component." }, safety: "review-soon", scope: "generic" },
  { code: "P0442", title: { es: "Fuga pequeña detectada en el sistema EVAP", en: "EVAP system small leak detected" }, description: { es: "El sistema detectó una pérdida pequeña de vapor de combustible. No confirma una manguera, tapa o válvula concreta.", en: "The system detected a small fuel-vapor leak. It does not confirm a specific hose, cap, or valve." }, safety: "info", scope: "generic" },
  { code: "P0562", title: { es: "Voltaje del sistema bajo", en: "System voltage low" }, description: { es: "El módulo registró alimentación baja. Conviene revisar el sistema de carga con mediciones, no sustituir piezas por suposición.", en: "The module recorded low supply voltage. Check the charging system with measurements; do not replace parts by assumption." }, safety: "review-soon", scope: "generic" },
];

export function findObdCode(code: string) {
  return obdCodes.find((item) => item.code === code.trim().toUpperCase());
}
