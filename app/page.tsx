"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  const benefits = [
    { title: t("home.guided.title"), description: t("home.guided.description"), icon: "⌁" },
    { title: t("home.vehicleInfo.title"), description: t("home.vehicleInfo.description"), icon: "▣" },
    { title: t("home.simple.title"), description: t("home.simple.description"), icon: "✓" },
  ];
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative isolate">
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center px-5 py-10 sm:px-8 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-sky-300 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
              {t("home.badge")}
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("home.title")}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-xl sm:leading-8">
              {t("home.description")}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row">
              <Link
                href="/seleccionar-vehiculo"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-sky-400 px-7 text-base font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition hover:bg-sky-300 active:scale-[0.99] sm:w-auto"
              >
                {t("home.startDiagnostic")}
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/seleccionar-vehiculo"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 text-base font-semibold text-white transition hover:bg-white/[0.08] sm:w-auto"
              >
                {t("home.findVehicle")}
              </Link>
            </div>
          </div>

          <div className="mt-10 grid max-w-4xl gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur sm:p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10 text-lg text-sky-300" aria-hidden="true">
                  {benefit.icon}
                </div>
                <h2 className="text-sm font-bold text-white sm:text-base">{benefit.title}</h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
