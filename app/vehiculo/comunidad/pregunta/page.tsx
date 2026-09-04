"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Question = { id: string; title: string; body: string };
type Answer = { id: string; body: string; created_at: string };

function QuestionContent() {
  const router = useRouter();
  const params = useSearchParams();
  const questionId = params.get("id");
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("Loading post...");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function load() {
      if (!questionId) return;
      const supabase = createClient();
      const { data: post, error: postError } = await supabase.from("community_questions").select("id, title, body").eq("id", questionId).maybeSingle();
      if (postError || !post) { setMessage("This community post is unavailable."); return; }
      setQuestion(post as Question);
      const { data, error } = await supabase.from("community_answers").select("id, body, created_at").eq("question_id", questionId).eq("status", "published").order("created_at");
      if (error) { setMessage("We could not load solutions yet."); return; }
      setAnswers((data ?? []) as Answer[]); setMessage("");
    }
    void load();
  }, [questionId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!questionId || body.trim().length < 10) return;
    setSending(true); setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage("Sign in to share a solution."); setSending(false); return; }
    const { error } = await supabase.from("community_answers").insert({ question_id: questionId, author_id: user.id, body: body.trim() });
    setSending(false);
    if (error) { setMessage("We could not submit your solution. Please try again."); return; }
    setBody(""); setMessage("Your solution was sent for review. Thank you for helping the community.");
  }

  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
    <button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← Back</button>
    {question && <article className="mt-8 rounded-3xl border border-sky-400/20 bg-slate-900 p-6"><p className="text-sm font-bold text-sky-300">Community question</p><h1 className="mt-2 text-3xl font-black">{question.title}</h1><p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">{question.body}</p></article>}
    <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold">Share a safe solution</h2><textarea required minLength={10} maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Describe what worked, including safety precautions." className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"/><button disabled={sending} className="w-full rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{sending ? "Sending..." : "Submit solution for review"}</button></form>
    {message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-sm text-slate-300">{message}</p>}
    <div className="mt-8 space-y-4"><h2 className="text-2xl font-black">Verified solutions</h2>{answers.map((answer) => <article key={answer.id} className="rounded-2xl border border-emerald-400/20 bg-slate-900 p-5"><p className="whitespace-pre-wrap leading-7 text-slate-200">{answer.body}</p></article>)}</div>
  </section></main>;
}

export default function CommunityQuestionPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950 p-8 text-white">Loading...</main>}><QuestionContent /></Suspense>; }
