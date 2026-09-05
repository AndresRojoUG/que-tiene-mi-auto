"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";
import BackButton from "@/components/BackButton";

type FeedbackCategory = "suggestion" | "issue" | "content_request";

export default function SugerenciasPage() {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { eyebrow: "Let’s improve it together", title: "Feedback", intro: "Tell us which feature, vehicle, diagnosis, or improvement you would like to see. We read this feedback to decide what to build next.", type: "Message type", suggestion: "Improvement suggestion", request: "Request vehicle information", issue: "Report something that does not work", message: "Your message", placeholder: "For example: I would like to view the fuse diagram for…", sending: "Sending...", send: "Send feedback", short: "Tell us a little more; write at least 10 characters.", signIn: "Sign in to send feedback.", failed: "We could not send your message yet. Try again later.", thanks: "Thank you. Your feedback was received for review.", unavailable: "We could not connect to the feedback service.", account: "signed-in account" }
    : { eyebrow: "Mejoremos juntos", title: "Sugerencias", intro: "Cuéntanos qué función, vehículo, diagnóstico o mejora te gustaría ver. Leemos estas sugerencias para decidir qué construir después.", type: "Tipo de mensaje", suggestion: "Sugerencia de mejora", request: "Pedir información de un vehículo", issue: "Reportar algo que no funciona", message: "Tu mensaje", placeholder: "Por ejemplo: Me gustaría poder consultar el diagrama de fusibles del…", sending: "Enviando...", send: "Enviar sugerencia", short: "Cuéntanos un poco más; escribe al menos 10 caracteres.", signIn: "Inicia sesión para enviar una sugerencia.", failed: "No pudimos enviar tu mensaje todavía. Inténtalo más tarde.", thanks: "Gracias. Tu sugerencia fue recibida para revisión.", unavailable: "No pudimos conectar con el servicio de sugerencias.", account: "cuenta iniciada" };
  const [category, setCategory] = useState<FeedbackCategory>("suggestion");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string>();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(undefined);
    setError(undefined);

    if (message.trim().length < 10) {
      setError(copy.short);
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError(copy.signIn);
        return;
      }

      const { error: insertError } = await supabase.from("product_feedback").insert({
        user_id: user.id,
        category,
        message: message.trim(),
      });

      if (insertError) {
        setError(copy.failed);
        return;
      }

      setMessage("");
      setNotice(copy.thanks);
    } catch {
      setError(copy.unavailable);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        <BackButton />
        <p className="text-sm font-medium text-sky-300">{copy.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">{copy.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-slate-400">
          {copy.intro}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-semibold">{copy.type}</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as FeedbackCategory)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            >
              <option value="suggestion">{copy.suggestion}</option>
              <option value="content_request">{copy.request}</option>
              <option value="issue">{copy.issue}</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">{copy.message}</span>
            <textarea
              required
              minLength={10}
              maxLength={2000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={copy.placeholder}
              className="mt-2 min-h-40 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 leading-6 outline-none focus:border-sky-400"
            />
            <span className="mt-2 block text-right text-xs text-slate-500">{message.length}/2000</span>
          </label>

          {notice && <p className="rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-200">{notice}</p>}
          {error && <p role="alert" className="rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-sky-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? copy.sending : copy.send}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          {isEnglish ? "To protect feedback, you need a " : "Para proteger las sugerencias, necesitas una "}<Link href="/cuenta" className="font-semibold text-sky-300 hover:text-sky-200">{copy.account}</Link>{isEnglish ? " to send it." : " para enviarlas."}
        </p>
      </section>
    </main>
  );
}
