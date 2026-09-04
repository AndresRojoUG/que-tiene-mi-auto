"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";

type CommunityQuestion = { id: string; title: string; body: string; created_at: string };

function CommunityContent() {
  const router = useRouter();
  const params = useSearchParams();
  const vehicleKey = params.get("vehicle");
  const vehicle = getVehicleById(vehicleKey);
  const { locale } = useLanguage();
  const es = locale === "es";
  const copy = es ? { loading: "Cargando comunidad...", preparing: "La comunidad se está preparando para este vehículo.", loadError: "No pudimos cargar las publicaciones todavía.", signIn: "Inicia sesión para compartir un problema con la comunidad.", sendError: "No pudimos enviar tu publicación. Inténtalo de nuevo.", sent: "Tu publicación fue enviada a revisión. Será visible al aprobarse.", back: "Volver", title: "Comunidad", intro: "Comparte tu experiencia con este vehículo exacto y lee publicaciones verificadas de la comunidad. No publiques datos personales ni sigas consejos de reparación inseguros.", share: "Comparte un problema", short: "Título breve", describe: "Describe síntomas, condiciones y lo que ya comprobaste.", sending: "Enviando...", submit: "Enviar a revisión", close: "Entendido" } : { loading: "Loading community...", preparing: "Community is being prepared for this vehicle.", loadError: "We could not load community posts yet.", signIn: "Sign in to share a problem with the community.", sendError: "We could not submit your post. Please try again.", sent: "Your post was sent for review. It will be visible once approved.", back: "Back", title: "Community", intro: "Share your experience with this exact vehicle and read verified community posts. Never publish personal data, and do not follow unsafe repair advice.", share: "Share a problem", short: "Short title", describe: "Describe symptoms, conditions, and what you have already checked.", sending: "Sending...", submit: "Submit for review", close: "Understood" };
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [databaseVehicleId, setDatabaseVehicleId] = useState<string>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function load() {
      if (!vehicleKey) return;
      const supabase = createClient();
      const { data: catalogVehicle, error: vehicleError } = await supabase
        .from("vehicles").select("id").eq("slug", vehicleKey).maybeSingle();
      if (vehicleError || !catalogVehicle) {
        setMessage(copy.preparing);
        return;
      }
      setDatabaseVehicleId(catalogVehicle.id);
      const { data, error } = await supabase
        .from("community_questions").select("id, title, body, created_at")
        .eq("vehicle_id", catalogVehicle.id).eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) { setMessage(copy.loadError); return; }
      setQuestions((data ?? []) as CommunityQuestion[]);
      setMessage("");
    }
    void load();
  }, [vehicleKey, copy.loadError, copy.preparing]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!databaseVehicleId || title.trim().length < 8 || body.trim().length < 20) return;
    setIsSending(true); setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage(copy.signIn); setIsSending(false); return; }
    const { error } = await supabase.from("community_questions").insert({ author_id: user.id, vehicle_id: databaseVehicleId, title: title.trim(), body: body.trim() });
    setIsSending(false);
    if (error) { setMessage(copy.sendError); return; }
    setTitle(""); setBody(""); setShowSuccess(true);
  }

  if (!vehicle) return <main className="min-h-screen bg-slate-950 p-8 text-white">{es ? "Vehículo no encontrado." : "Vehicle not found."}</main>;
  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
    <button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← {copy.back}</button>
    <p className="mt-8 text-sm font-medium text-sky-300">{copy.title}</p><h1 className="mt-2 text-4xl font-black">{getVehicleDisplayName(vehicle)}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-slate-400">{copy.intro}</p>
    <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-sky-400/20 bg-slate-900 p-5 shadow-xl shadow-sky-950/20 sm:p-6"><h2 className="text-xl font-bold">{copy.share}</h2>
      <input required minLength={8} maxLength={160} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={copy.short} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" />
      <textarea required minLength={20} maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} placeholder={copy.describe} className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" />
      <button disabled={isSending || !databaseVehicleId} className="w-full rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{isSending ? copy.sending : copy.submit}</button>
    </form>
    {message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-sm text-slate-300">{message}</p>}
    <div className="mt-8 space-y-4">{questions.map((question) => <article key={question.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-xl font-bold">{question.title}</h2><p className="mt-3 whitespace-pre-wrap leading-7 text-slate-300">{question.body}</p></article>)}</div>
    {showSuccess && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-5"><div className="w-full max-w-md rounded-3xl border border-emerald-400/30 bg-slate-900 p-6 shadow-2xl"><p className="text-3xl">✓</p><h2 className="mt-3 text-2xl font-black text-emerald-300">{copy.sent}</h2><button type="button" onClick={() => setShowSuccess(false)} className="mt-6 w-full rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950">{copy.close}</button></div></div>}
  </section></main>;
}

export default function CommunityPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950 p-8 text-white">Loading community...</main>}><CommunityContent /></Suspense>; }
