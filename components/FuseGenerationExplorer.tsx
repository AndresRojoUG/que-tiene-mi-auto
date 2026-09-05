"use client";

import { useMemo, useState } from "react";
import type { FuseReferenceCoverage } from "@/data/technical/fuse-reference-catalog";
import { useLanguage } from "@/components/LanguageProvider";

export default function FuseGenerationExplorer({ coverage }: { coverage: FuseReferenceCoverage[] }) {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const [selectedId, setSelectedId] = useState(coverage[0]?.id ?? "");
  const selected = useMemo(() => coverage.find((item) => item.id === selectedId), [coverage, selectedId]);
  if (!selected) return null;
  const copy = isEnglish
    ? { eyebrow: "Generation explorer", title: "Find the matching Jetta reference", intro: "Choose the generation and year first. This reference is not yet an in-app verified map; confirm the original cover and vehicle configuration before acting.", generation: "Generation", year: "Years covered", boxes: "Reference boxes", interior: "Interior", battery: "Battery / fuse holder", source: "Open reference ↗" }
    : { eyebrow: "Explorador por generación", title: "Encuentra la referencia Jetta que corresponde", intro: "Elige primero generación y año. Esta referencia aún no es un mapa verificado dentro de la app; confirma la tapa original y configuración del vehículo antes de actuar.", generation: "Generación", year: "Años incluidos", boxes: "Cajas de referencia", interior: "Interior", battery: "Batería / portafusibles", source: "Abrir referencia ↗" };

  return <section className="mt-8 rounded-3xl border border-violet-400/20 bg-slate-900 p-5 sm:p-8"><p className="text-sm font-bold text-violet-300">{copy.eyebrow}</p><h2 className="mt-2 text-2xl font-black">{copy.title}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-400">{copy.intro}</p><div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={copy.generation}>{coverage.map((item) => <button key={item.id} type="button" role="tab" aria-selected={selected.id === item.id} onClick={() => setSelectedId(item.id)} className={`rounded-xl px-4 py-3 text-sm font-bold transition ${selected.id === item.id ? "bg-violet-300 text-slate-950" : "bg-slate-800 text-slate-200 hover:bg-slate-700"}`}>{item.generation}</button>)}</div><div className="mt-5 grid gap-4 rounded-2xl border border-slate-700 bg-slate-950 p-5 sm:grid-cols-2"><div><p className="text-sm text-slate-400">{copy.year}</p><p className="mt-1 text-lg font-bold">{selected.years.join(" · ")}</p></div><div><p className="text-sm text-slate-400">{copy.boxes}</p><p className="mt-1 text-lg font-bold">{selected.boxes.map((box) => box === "interior" ? copy.interior : copy.battery).join(" · ")}</p></div></div><a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl border border-violet-300/60 px-5 py-3 font-bold text-violet-200 transition hover:bg-violet-300/10">{copy.source}</a></section>;
}
