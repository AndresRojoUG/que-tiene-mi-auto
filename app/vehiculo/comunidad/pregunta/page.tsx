"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";

type Question = { id: string; title: string; body: string };
type Answer = { id: string; body: string; created_at: string };

function QuestionContent() {
  const router = useRouter();
  const params = useSearchParams();
  const questionId = params.get("id");
  const { locale } = useLanguage();
  const es = locale === "es";
  const c = es ? { unavailable: "Esta publicación no está disponible.", load: "No pudimos cargar las soluciones todavía.", signIn: "Inicia sesión para compartir una solución.", sent: "Tu solución fue enviada a revisión. Gracias por ayudar a la comunidad.", submitError: "No pudimos enviar tu solución. Inténtalo de nuevo.", reportSignIn: "Inicia sesión para reportar contenido.", reportError: "No pudimos enviar el reporte. Inténtalo de nuevo.", reported: "Reporte enviado para revisión de moderación.", back: "Volver", question: "Pregunta de la comunidad", safe: "Comparte una solución segura", placeholder: "Describe qué funcionó, incluyendo precauciones de seguridad.", sending: "Enviando...", submit: "Enviar solución a revisión", verified: "Soluciones verificadas", report: "Reportar contenido", reason: "Explica el problema de seguridad o contenido.", cancel: "Cancelar", sendReport: "Enviar reporte", loading: "Cargando..." } : { unavailable: "This community post is unavailable.", load: "We could not load solutions yet.", signIn: "Sign in to share a solution.", sent: "Your solution was sent for review. Thank you for helping the community.", submitError: "We could not submit your solution. Please try again.", reportSignIn: "Sign in to report content.", reportError: "We could not send the report. Please try again.", reported: "Report sent for moderation review.", back: "Back", question: "Community question", safe: "Share a safe solution", placeholder: "Describe what worked, including safety precautions.", sending: "Sending...", submit: "Submit solution for review", verified: "Verified solutions", report: "Report content", reason: "Explain the safety or content concern.", cancel: "Cancel", sendReport: "Send report", loading: "Loading..." };
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ questionId?: string; answerId?: string }>();
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    async function load() {
      if (!questionId) return;
      const supabase = createClient();
      const { data: post, error: postError } = await supabase.from("community_questions").select("id, title, body").eq("id", questionId).maybeSingle();
      if (postError || !post) { setMessage(c.unavailable); return; }
      setQuestion(post as Question);
      const { data, error } = await supabase.from("community_answers").select("id, body, created_at").eq("question_id", questionId).eq("status", "published").order("created_at");
      if (error) { setMessage(c.load); return; }
      setAnswers((data ?? []) as Answer[]); setMessage("");
    }
    void load();
  }, [questionId, c.load, c.unavailable]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!questionId || body.trim().length < 10) return;
    setSending(true); setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage(c.signIn); setSending(false); return; }
    const { error } = await supabase.from("community_answers").insert({ question_id: questionId, author_id: user.id, body: body.trim() });
    setSending(false);
    if (error) { setMessage(c.submitError); return; }
    setBody(""); setMessage(c.sent);
  }

  async function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportTarget || reportReason.trim().length < 10) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage(c.reportSignIn); return; }
    const { error } = await supabase.from("community_reports").insert({ reporter_id: user.id, question_id: reportTarget.questionId ?? null, answer_id: reportTarget.answerId ?? null, reason: reportReason.trim() });
    if (error) { setMessage(c.reportError); return; }
    setReportTarget(undefined); setReportReason(""); setMessage(c.reported);
  }

  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
    <button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← {c.back}</button>
    {question && <article className="mt-8 rounded-3xl border border-sky-400/20 bg-slate-900 p-6"><p className="text-sm font-bold text-sky-300">{c.question}</p><h1 className="mt-2 text-3xl font-black">{question.title}</h1><p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">{question.body}</p><button type="button" onClick={() => setReportTarget({ questionId: question.id })} className="mt-4 text-sm font-semibold text-rose-300">{c.report}</button></article>}
    <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold">{c.safe}</h2><textarea required minLength={10} maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} placeholder={c.placeholder} className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"/><button disabled={sending} className="w-full rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{sending ? c.sending : c.submit}</button></form>
    {message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-sm text-slate-300">{message}</p>}
    <div className="mt-8 space-y-4"><h2 className="text-2xl font-black">{c.verified}</h2>{answers.map((answer) => <article key={answer.id} className="rounded-2xl border border-emerald-400/20 bg-slate-900 p-5"><p className="whitespace-pre-wrap leading-7 text-slate-200">{answer.body}</p><button type="button" onClick={() => setReportTarget({ answerId: answer.id })} className="mt-4 text-sm font-semibold text-rose-300">{c.report}</button></article>)}</div>
    {reportTarget && <div role="dialog" aria-modal="true" aria-labelledby="report-content-title" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-5"><form onSubmit={submitReport} className="w-full max-w-md rounded-3xl bg-slate-900 p-6"><h2 id="report-content-title" className="text-xl font-black">{c.report}</h2><textarea required minLength={10} maxLength={1000} value={reportReason} onChange={(e) => setReportReason(e.target.value)} placeholder={c.reason} className="mt-4 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"/><div className="mt-5 flex gap-3"><button type="button" onClick={() => setReportTarget(undefined)} className="flex-1 rounded-xl border border-slate-700 py-3">{c.cancel}</button><button className="flex-1 rounded-xl bg-rose-400 py-3 font-bold text-slate-950">{c.sendReport}</button></div></form></div>}
  </section></main>;
}

export default function CommunityQuestionPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950 p-8 text-white">Cargando...</main>}><QuestionContent /></Suspense>; }
