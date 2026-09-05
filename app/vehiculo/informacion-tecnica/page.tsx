"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTechnicalSourcesForVehicle } from "@/data/technical/sources";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { useLanguage } from "@/components/LanguageProvider";

function TechnicalInformationContent() {
  const router = useRouter();
  const vehicleId = useSearchParams().get("vehicle");
  const vehicle = getVehicleById(vehicleId);
  const sources = getTechnicalSourcesForVehicle(vehicleId);
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { back: "Back", eyebrow: "Technical information", title: "Technical sources", intro: "Technical assignments are published only after a source is matched to the vehicle’s exact market and configuration.", available: "Available sources", market: "Market", verify: "Verify before using", noSources: "No verified source is cataloged for this configuration yet.", noSourcesDescription: "Do not rely on generic diagrams from another vehicle. You can help us verify the correct manual or a clear photo of the original fuse-box label.", open: "Open source ↗" }
    : { back: "Volver", eyebrow: "Información técnica", title: "Fuentes técnicas", intro: "Las asignaciones técnicas solo se publican cuando una fuente coincide con el mercado y la configuración exacta del vehículo.", available: "Fuentes disponibles", market: "Mercado", verify: "Verifica antes de usar", noSources: "Aún no hay una fuente verificada en el catálogo para esta configuración.", noSourcesDescription: "No uses diagramas genéricos de otro vehículo. Puedes ayudarnos a verificar el manual correcto o una foto clara de la etiqueta original de la caja de fusibles.", open: "Abrir fuente ↗" };

  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16"><button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← {copy.back}</button><p className="mt-8 text-sm font-bold text-sky-300">{copy.eyebrow}</p><h1 className="mt-2 text-4xl font-black">{copy.title}</h1><p className="mt-3 text-slate-400">{vehicle ? getVehicleDisplayName(vehicle) : ""}</p><p className="mt-5 leading-7 text-slate-300">{copy.intro}</p>{sources.length === 0 ? <div className="mt-8 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6"><h2 className="text-xl font-bold">{copy.noSources}</h2><p className="mt-3 leading-7 text-amber-50/90">{copy.noSourcesDescription}</p></div> : <div className="mt-8 space-y-4"><h2 className="text-2xl font-bold">{copy.available}</h2>{sources.map((source) => <article key={source.url} className="rounded-3xl border border-slate-800 bg-slate-900 p-6"><p className="text-sm font-bold text-sky-300">{source.publisher} · {source.publishedYear}</p><h3 className="mt-2 text-xl font-bold">{source.title}</h3><p className="mt-3 leading-7 text-slate-300">{source.description}</p><p className="mt-4 text-sm text-amber-200">{copy.market}: {source.market} · {copy.verify}</p><a href={source.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950">{copy.open}</a></article>)}</div>}</section></main>;
}

export default function TechnicalInformationPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950" />}><TechnicalInformationContent /></Suspense>; }
