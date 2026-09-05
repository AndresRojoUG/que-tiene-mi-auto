"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminAccessGate from "@/components/AdminAccessGate";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/components/LanguageProvider";

type Item = { id: string; title?: string; body: string; status: "pending" | "published" | "hidden" | "removed"; created_at: string };

export default function AdminCommunityPage() {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { eyebrow: "Administration", title: "Community moderation", denied: "You do not have permission to moderate the community.", load: "We could not load moderation.", update: "We could not update this content.", questions: "Questions", answers: "Solutions", pending: "Pending", published: "Publish", hidden: "Hide", removed: "Remove" }
    : { eyebrow: "Administración", title: "Moderación de comunidad", denied: "No tienes permisos para moderar la comunidad.", load: "No pudimos cargar la moderación.", update: "No pudimos actualizar el contenido.", questions: "Preguntas", answers: "Soluciones", pending: "Pendiente", published: "Publicar", hidden: "Ocultar", removed: "Retirar" };
  const [questions, setQuestions] = useState<Item[]>([]);
  const [answers, setAnswers] = useState<Item[]>([]);
  const [message, setMessage] = useState("Cargando moderación...");

  useEffect(() => { void (async () => {
    const supabase = createClient();
    const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
    if (roleError || !isAdmin) { setMessage(copy.denied); return; }
    const [questionResult, answerResult] = await Promise.all([
      supabase.from("community_questions").select("id, title, body, status, created_at").order("created_at", { ascending: false }),
      supabase.from("community_answers").select("id, body, status, created_at").order("created_at", { ascending: false }),
    ]);
    if (questionResult.error || answerResult.error) { setMessage(copy.load); return; }
    setQuestions((questionResult.data ?? []) as Item[]); setAnswers((answerResult.data ?? []) as Item[]); setMessage("");
  })();
  // Moderation records do not depend on the selected display language.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function update(table: "community_questions" | "community_answers", id: string, status: Item["status"]) {
    const { error } = await createClient().from(table).update({ status }).eq("id", id);
    if (error) { setMessage(copy.update); return; }
    const updateList = (items: Item[]) => items.map((item) => item.id === id ? { ...item, status } : item);
    if (table === "community_questions") {
      setQuestions(updateList);
    } else {
      setAnswers(updateList);
    }
  }

  const renderItems = (items: Item[], table: "community_questions" | "community_answers") => items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-sky-300">{item.status}</p><select value={item.status} onChange={(event) => void update(table, item.id, event.target.value as Item["status"])} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"><option value="pending">{copy.pending}</option><option value="published">{copy.published}</option><option value="hidden">{copy.hidden}</option><option value="removed">{copy.removed}</option></select></div>{item.title && <h2 className="mt-4 text-xl font-bold">{item.title}</h2>}<p className="mt-3 whitespace-pre-wrap leading-7 text-slate-200">{item.body}</p></article>);

  return <AdminAccessGate><main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16"><BackButton fallbackHref="/admin" /><p className="text-sm font-medium text-sky-300">{copy.eyebrow}</p><h1 className="mt-2 text-4xl font-black">{copy.title}</h1>{message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-slate-300">{message}</p>}<h2 className="mt-8 text-2xl font-bold">{copy.questions}</h2><div className="mt-4 space-y-4">{renderItems(questions, "community_questions")}</div><h2 className="mt-10 text-2xl font-bold">{copy.answers}</h2><div className="mt-4 space-y-4">{renderItems(answers, "community_answers")}</div></section></main></AdminAccessGate>;
}
