"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FeedbackCategory = "suggestion" | "issue" | "content_request";

export default function SugerenciasPage() {
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
      setError("Cuéntanos un poco más; escribe al menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Inicia sesión para enviar una sugerencia.");
        return;
      }

      const { error: insertError } = await supabase.from("product_feedback").insert({
        user_id: user.id,
        category,
        message: message.trim(),
      });

      if (insertError) {
        setError("No pudimos enviar tu mensaje todavía. Inténtalo más tarde.");
        return;
      }

      setMessage("");
      setNotice("Gracias. Tu sugerencia fue recibida para revisión.");
    } catch {
      setError("No pudimos conectar con el servicio de sugerencias.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-sm font-medium text-sky-300">Mejoremos juntos</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Sugerencias</h1>
        <p className="mt-4 max-w-xl leading-7 text-slate-400">
          Cuéntanos qué función, vehículo, diagnóstico o mejora te gustaría ver. Leemos estas sugerencias para decidir qué construir después.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-semibold">Tipo de mensaje</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as FeedbackCategory)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            >
              <option value="suggestion">Sugerencia de mejora</option>
              <option value="content_request">Pedir información de un vehículo</option>
              <option value="issue">Reportar algo que no funciona</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Tu mensaje</span>
            <textarea
              required
              minLength={10}
              maxLength={2000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Por ejemplo: Me gustaría poder consultar el diagrama de fusibles del…"
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
            {isSubmitting ? "Enviando..." : "Enviar sugerencia"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          Para proteger las sugerencias, necesitas una <Link href="/cuenta" className="font-semibold text-sky-300 hover:text-sky-200">cuenta iniciada</Link> para enviarlas.
        </p>
      </section>
    </main>
  );
}
