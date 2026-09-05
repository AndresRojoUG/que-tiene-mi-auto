"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { useLanguage } from "@/components/LanguageProvider";

function MaintenanceContent() {
  const router = useRouter(); const vehicle = getVehicleById(useSearchParams().get("vehicle")); const { locale } = useLanguage(); const es = locale === "es";
  if (!vehicle) return null;
  const c = es ? { back: "Volver", tag: "Mantenimiento", intro: "Lista de observación segura. Consulta el manual del vehículo para intervalos, fluidos y especificaciones exactas.", items: ["Revisa si hay luces o mensajes activos en el tablero.", "Observa manchas, olores, humo o ruidos nuevos con el vehículo detenido.", "Consulta el manual antes de revisar cualquier nivel o fluido.", "Registra fecha, kilometraje y síntomas antes de una visita al taller."], warning: "No abras sistemas calientes ni trabajes bajo el vehículo sin equipo y soporte adecuados." } : { back: "Back", tag: "Maintenance", intro: "Safe observation checklist. Consult the vehicle manual for exact intervals, fluids, and specifications.", items: ["Check for active dashboard lights or messages.", "Observe stains, smells, smoke, or new noises with the vehicle stopped.", "Consult the manual before checking any level or fluid.", "Record date, mileage, and symptoms before a workshop visit."], warning: "Do not open hot systems or work under the vehicle without proper equipment and support." };
  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16"><button onClick={() => router.back()} className="text-sm text-slate-400">← {c.back}</button><p className="mt-8 text-sm font-bold text-sky-300">{c.tag}</p><h1 className="mt-2 text-4xl font-black">{getVehicleDisplayName(vehicle)}</h1><p className="mt-4 leading-7 text-slate-400">{c.intro}</p><div className="mt-8 space-y-3">{c.items.map((item, index) => <div key={item} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"><span className="font-black text-sky-300">{index + 1}</span><p className="leading-7">{item}</p></div>)}</div><aside className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-amber-100">⚠ {c.warning}</aside></section></main>;
}
export default function MaintenancePage() { return <Suspense fallback={null}><MaintenanceContent /></Suspense>; }
