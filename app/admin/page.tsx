"use client";

import Link from "next/link";
import AdminAccessGate from "@/components/AdminAccessGate";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminPage() {
  const { locale } = useLanguage();
  const es = locale === "es";
  const copy = es
    ? { eyebrow: "Administración", title: "Panel de administración", intro: "Revisa sugerencias y modera el contenido de la comunidad.", feedback: "Sugerencias recibidas", community: "Moderación de comunidad", reports: "Reportes de comunidad" }
    : { eyebrow: "Administration", title: "Administration panel", intro: "Review feedback and moderate community content.", feedback: "Received feedback", community: "Community moderation", reports: "Community reports" };

  return (
    <AdminAccessGate>
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
          <BackButton />
          <p className="text-sm font-medium text-sky-300">{copy.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black">{copy.title}</h1>
          <p className="mt-4 text-slate-400">{copy.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link href="/admin/sugerencias" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 font-bold transition hover:border-sky-400/50">{copy.feedback} →</Link>
            <Link href="/admin/comunidad" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 font-bold transition hover:border-sky-400/50">{copy.community} →</Link>
            <Link href="/admin/reportes" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 font-bold transition hover:border-sky-400/50">{copy.reports} →</Link>
          </div>
        </section>
      </main>
    </AdminAccessGate>
  );
}
