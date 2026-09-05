"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { relays } from "@/data/technical/relays";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { useLanguage } from "@/components/LanguageProvider";

function RelayContent() {
  const router = useRouter();
  const vehicleId = useSearchParams().get("vehicle");
  const vehicle = getVehicleById(vehicleId);
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const verifiedRelays = relays.filter((relay) => relay.vehicleId === vehicleId && relay.verification.status === "verified");
  const copy = isEnglish
    ? { back: "Back", eyebrow: "Technical information", title: "Relays", unavailable: "Verified relay assignments are not available yet", description: "Relay numbers, locations, and functions can vary by market, engine, and equipment. We will publish them only after matching a reliable technical source to this exact configuration.", source: "View technical sources" }
    : { back: "Volver", eyebrow: "Información técnica", title: "Relevadores", unavailable: "Las asignaciones verificadas de relevadores aún no están disponibles", description: "Los números, ubicaciones y funciones de los relevadores pueden cambiar según mercado, motor y equipamiento. Solo los publicaremos después de vincular una fuente técnica confiable con esta configuración exacta.", source: "Ver fuentes técnicas" };

  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16"><button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← {copy.back}</button><p className="mt-8 text-sm font-bold text-sky-300">{copy.eyebrow}</p><h1 className="mt-2 text-4xl font-black">{copy.title}</h1><p className="mt-3 text-slate-400">{vehicle ? getVehicleDisplayName(vehicle) : ""}</p>{verifiedRelays.length === 0 ? <section className="mt-8 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6"><h2 className="text-xl font-bold">{copy.unavailable}</h2><p className="mt-3 leading-7 text-amber-50/90">{copy.description}</p><button type="button" onClick={() => router.push(`/vehiculo/informacion-tecnica?vehicle=${vehicleId ?? ""}`)} className="mt-6 rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950">{copy.source}</button></section> : <div className="mt-8 space-y-4">{verifiedRelays.map((relay) => <article key={`${relay.location}-${relay.number}`} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-sky-300">#{relay.number}</p><h2 className="mt-2 text-xl font-bold">{relay.name}</h2><p className="mt-3 leading-7 text-slate-300">{relay.description}</p></article>)}</div>}</section></main>;
}

export default function RelaysPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950" />}><RelayContent /></Suspense>; }
