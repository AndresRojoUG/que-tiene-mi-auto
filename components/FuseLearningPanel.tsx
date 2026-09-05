"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type AreaId = "cover" | "puller" | "mini" | "maxi" | "warning";

export default function FuseLearningPanel() {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        eyebrow: "Interactive learning guide",
        title: "Understand a fuse box safely",
        intro: "This is an educational illustration, not a diagram for your vehicle. Select an area to learn what to check on the original box.",
        areas: {
          cover: { label: "Original cover", title: "Start with the original legend", description: "The cover or nearby label is the first reference for the exact vehicle. Its layout can change by market, engine, options, and production date." },
          puller: { label: "Fuse puller", title: "Use the proper extractor", description: "Turn ignition and relevant switches off first. If the vehicle includes a fuse puller, use it rather than improvised metal tools." },
          mini: { label: "Small fuses", title: "Do not guess the circuit", description: "Fuses of the same size or color do not necessarily protect the same circuit. Read the vehicle-specific legend before removing one." },
          maxi: { label: "High-current fuses", title: "High-current circuits need extra caution", description: "These may protect major systems. Do not probe, bridge, or replace them without the exact documentation and safe conditions." },
          warning: { label: "Safety", title: "Never increase amperage", description: "A replacement must match the specified rating. If a replacement opens again, stop and request an electrical inspection instead of trying a larger fuse." },
        },
        selected: "Selected area",
      }
    : {
        eyebrow: "Guía interactiva de aprendizaje",
        title: "Entiende una caja de fusibles con seguridad",
        intro: "Esta es una ilustración didáctica, no un diagrama para tu vehículo. Toca una zona para saber qué revisar en la caja original.",
        areas: {
          cover: { label: "Tapa original", title: "Comienza con la leyenda original", description: "La tapa o etiqueta cercana es la primera referencia para el vehículo exacto. Su distribución puede cambiar por mercado, motor, equipamiento y fecha de producción." },
          puller: { label: "Extractor", title: "Usa el extractor adecuado", description: "Apaga el encendido y los interruptores correspondientes primero. Si el vehículo incluye extractor, úsalo en lugar de herramientas metálicas improvisadas." },
          mini: { label: "Fusibles pequeños", title: "No adivines el circuito", description: "Fusibles del mismo tamaño o color no necesariamente protegen el mismo circuito. Lee la leyenda específica del vehículo antes de retirar uno." },
          maxi: { label: "Fusibles de alta corriente", title: "Los circuitos de alta corriente requieren más precaución", description: "Pueden proteger sistemas importantes. No los midas, puentes ni sustituyas sin la documentación exacta y condiciones seguras." },
          warning: { label: "Seguridad", title: "Nunca aumentes el amperaje", description: "El reemplazo debe coincidir con el valor indicado. Si vuelve a abrirse, detente y solicita una inspección eléctrica en vez de probar uno mayor." },
        },
        selected: "Zona seleccionada",
      };
  const [selected, setSelected] = useState<AreaId>("cover");
  const active = copy.areas[selected];
  const areas: AreaId[] = ["cover", "puller", "mini", "maxi", "warning"];

  return (
    <section className="mt-8 rounded-3xl border border-sky-400/20 bg-slate-900 p-5 sm:p-8">
      <p className="text-sm font-bold text-sky-300">{copy.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black">{copy.title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-400">{copy.intro}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)]">
        <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5" role="group" aria-label={copy.title}>
          <div className="rounded-2xl border-2 border-slate-700 bg-slate-900 p-4 shadow-inner shadow-black/30">
            <button type="button" onClick={() => setSelected("cover")} aria-pressed={selected === "cover"} className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-bold transition ${selected === "cover" ? "border-sky-300 bg-sky-400 text-slate-950" : "border-slate-600 bg-slate-800 text-slate-200 hover:border-sky-400"}`}>▤ {copy.areas.cover.label}</button>
            <div className="mt-4 grid grid-cols-[0.7fr_1fr] gap-4">
              <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-950 p-3">
                <button type="button" onClick={() => setSelected("puller")} aria-pressed={selected === "puller"} className={`flex min-h-16 w-full items-center justify-center rounded-lg border text-2xl transition ${selected === "puller" ? "border-sky-300 bg-sky-400 text-slate-950" : "border-slate-700 bg-slate-800 hover:border-sky-400"}`}>⌇</button>
                <button type="button" onClick={() => setSelected("warning")} aria-pressed={selected === "warning"} className={`flex min-h-14 w-full items-center justify-center rounded-lg border text-xl transition ${selected === "warning" ? "border-amber-200 bg-amber-300 text-slate-950" : "border-slate-700 bg-slate-800 hover:border-amber-300"}`}>⚠</button>
              </div>
              <div className="space-y-3">
                <button type="button" onClick={() => setSelected("mini")} aria-pressed={selected === "mini"} className={`grid min-h-28 w-full grid-cols-4 gap-2 rounded-xl border p-3 transition ${selected === "mini" ? "border-sky-300 bg-sky-400/15" : "border-slate-700 bg-slate-950 hover:border-sky-400"}`}>{["bg-blue-500", "bg-amber-500", "bg-rose-500", "bg-blue-500", "bg-amber-500", "bg-emerald-500", "bg-blue-500", "bg-rose-500"].map((color, index) => <span key={index} className={`rounded ${color}`} />)}</button>
                <button type="button" onClick={() => setSelected("maxi")} aria-pressed={selected === "maxi"} className={`grid min-h-16 w-full grid-cols-3 gap-2 rounded-xl border p-3 transition ${selected === "maxi" ? "border-sky-300 bg-sky-400/15" : "border-slate-700 bg-slate-950 hover:border-sky-400"}`}>{["bg-emerald-500", "bg-amber-500", "bg-rose-500"].map((color, index) => <span key={index} className={`rounded-lg ${color}`} />)}</button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{areas.map((area) => <button key={area} type="button" onClick={() => setSelected(area)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${selected === area ? "bg-sky-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>{copy.areas[area].label}</button>)}</div>
        </div>
        <aside className="rounded-3xl border border-slate-700 bg-slate-950 p-5" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{copy.selected}</p>
          <h3 className="mt-2 text-xl font-black text-sky-300">{active.title}</h3>
          <p className="mt-4 leading-7 text-slate-300">{active.description}</p>
        </aside>
      </div>
    </section>
  );
}
