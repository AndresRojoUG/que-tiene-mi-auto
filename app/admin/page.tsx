import Link from "next/link";

export default function AdminPage() {
  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16"><p className="text-sm font-medium text-sky-300">Administración</p><h1 className="mt-2 text-4xl font-black">Panel de administración</h1><p className="mt-4 text-slate-400">Revisa sugerencias y modera el contenido de la comunidad.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><Link href="/admin/sugerencias" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 font-bold transition hover:border-sky-400/50">Sugerencias recibidas →</Link><Link href="/admin/comunidad" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 font-bold transition hover:border-sky-400/50">Moderación de comunidad →</Link></div></section></main>;
}
