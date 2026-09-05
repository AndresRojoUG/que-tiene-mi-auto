"use client";

import Link from "next/link";
import { getTechnicalSourcesForTopic, type TechnicalSource } from "@/data/technical/sources";
import { useLanguage } from "@/components/LanguageProvider";

type Topic = TechnicalSource["topics"][number];

export default function TechnicalReferenceList({ vehicleId, topic }: { vehicleId: string | null; topic: Topic }) {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const sources = getTechnicalSourcesForTopic(vehicleId, topic);
  const copy = isEnglish
    ? { eyebrow: "Useful references", title: "Consult a source before acting", official: "Official manual", reference: "External reference", market: "Applies to", open: "Open source ↗", noSource: "No compatible source is cataloged for this vehicle yet.", request: "Request this information" }
    : { eyebrow: "Referencias útiles", title: "Consulta una fuente antes de actuar", official: "Manual oficial", reference: "Referencia externa", market: "Aplica para", open: "Abrir fuente ↗", noSource: "Aún no hay una fuente compatible en el catálogo para este vehículo.", request: "Solicitar esta información" };

  const requestHref = vehicleId ? `/sugerencias?vehicle=${encodeURIComponent(vehicleId)}&topic=${topic}` : "/sugerencias";

  return <section className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-left sm:p-6"><p className="text-sm font-bold text-emerald-300">{copy.eyebrow}</p><h2 className="mt-2 text-2xl font-black">{copy.title}</h2>{sources.length === 0 ? <div className="mt-4"><p className="leading-7 text-slate-300">{copy.noSource}</p><Link href={requestHref} className="mt-5 inline-flex rounded-xl border border-emerald-300/50 px-4 py-2 font-bold text-emerald-200">{copy.request}</Link></div> : <div className="mt-5 space-y-3">{sources.map((source) => <article key={source.url} className="rounded-2xl border border-white/10 bg-slate-950 p-4"><p className="text-xs font-bold uppercase tracking-wide text-emerald-300">{source.kind === "official" ? copy.official : copy.reference}</p><h3 className="mt-1 font-bold">{source.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{source.description}</p><p className="mt-3 text-xs text-slate-500">{copy.market}: {source.market}</p><a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-sky-300 hover:text-sky-200">{copy.open}</a></article>)}</div>}</section>;
}
