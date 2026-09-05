"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Report = { id: string; reason: string; status: "open" | "reviewed" | "resolved" | "dismissed"; created_at: string };

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [message, setMessage] = useState("Cargando reportes...");
  useEffect(() => { void (async () => {
    const supabase = createClient();
    const { data: admin } = await supabase.rpc("is_admin");
    if (!admin) { setMessage("No tienes permisos para revisar reportes."); return; }
    const { data, error } = await supabase.from("community_reports").select("id, reason, status, created_at").order("created_at", { ascending: false });
    if (error) { setMessage("No pudimos cargar los reportes."); return; }
    setReports((data ?? []) as Report[]); setMessage("");
  })(); }, []);
  async function update(id: string, status: Report["status"]) {
    const { error } = await createClient().from("community_reports").update({ status }).eq("id", id);
    if (error) { setMessage("No pudimos actualizar el reporte."); return; }
    setReports((current) => current.map((report) => report.id === id ? { ...report, status } : report));
  }
  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16"><p className="text-sm font-medium text-sky-300">Administración</p><h1 className="mt-2 text-4xl font-black">Reportes de comunidad</h1>{message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-slate-300">{message}</p>}<div className="mt-8 space-y-4">{reports.map((report) => <article key={report.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-rose-300">{report.status}</p><select value={report.status} onChange={(e) => void update(report.id, e.target.value as Report["status"])} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"><option value="open">Abierto</option><option value="reviewed">Revisado</option><option value="resolved">Resuelto</option><option value="dismissed">Descartado</option></select></div><p className="mt-4 whitespace-pre-wrap leading-7">{report.reason}</p></article>)}</div></section></main>;
}
