"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FeedbackStatus = "new" | "reviewed" | "planned" | "closed";
type Feedback = {
  id: string;
  category: string;
  message: string;
  status: FeedbackStatus;
  created_at: string;
};

const statusLabels: Record<FeedbackStatus, string> = {
  new: "Nueva",
  reviewed: "Revisada",
  planned: "Planeada",
  closed: "Cerrada",
};

export default function AdminSuggestionsPage() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("Cargando sugerencias...");

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
        if (roleError || !isAdmin) {
          setMessage("No tienes permisos para ver el panel de administración.");
          return;
        }

        const { data, error } = await supabase
          .from("product_feedback")
          .select("id, category, message, status, created_at")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setItems((data ?? []) as Feedback[]);
        setMessage("");
      } catch {
        setMessage("No pudimos cargar el panel de administración.");
      }
    }
    void load();
  }, []);

  async function updateStatus(id: string, status: FeedbackStatus) {
    const { error } = await createClient()
      .from("product_feedback")
      .update({ status })
      .eq("id", id);
    if (error) {
      setMessage("No pudimos actualizar la sugerencia.");
      return;
    }
    setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-sm font-medium text-sky-300">Administración</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Sugerencias recibidas</h1>
        {message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-slate-300">{message}</p>}
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-sky-300">{item.category}</p>
                <select
                  value={item.status}
                  onChange={(event) => void updateStatus(item.id, event.target.value as FeedbackStatus)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                >
                  {(Object.keys(statusLabels) as FeedbackStatus[]).map((status) => (
                    <option key={status} value={status}>{statusLabels[status]}</option>
                  ))}
                </select>
              </div>
              <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-200">{item.message}</p>
              <p className="mt-4 text-xs text-slate-500">{new Date(item.created_at).toLocaleString("es-MX")}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
