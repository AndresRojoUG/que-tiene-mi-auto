"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { createClient } from "@/lib/supabase/client";

type CommunityQuestion = { id: string; title: string; body: string; created_at: string };

function CommunityContent() {
  const router = useRouter();
  const params = useSearchParams();
  const vehicleKey = params.get("vehicle");
  const vehicle = getVehicleById(vehicleKey);
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [databaseVehicleId, setDatabaseVehicleId] = useState<string>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("Loading community...");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function load() {
      if (!vehicleKey) return;
      const supabase = createClient();
      const { data: catalogVehicle, error: vehicleError } = await supabase
        .from("vehicles").select("id").eq("slug", vehicleKey).maybeSingle();
      if (vehicleError || !catalogVehicle) {
        setMessage("Community is being prepared for this vehicle.");
        return;
      }
      setDatabaseVehicleId(catalogVehicle.id);
      const { data, error } = await supabase
        .from("community_questions").select("id, title, body, created_at")
        .eq("vehicle_id", catalogVehicle.id).eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) { setMessage("We could not load community posts yet."); return; }
      setQuestions((data ?? []) as CommunityQuestion[]);
      setMessage("");
    }
    void load();
  }, [vehicleKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!databaseVehicleId || title.trim().length < 8 || body.trim().length < 20) return;
    setIsSending(true); setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage("Sign in to share a problem with the community."); setIsSending(false); return; }
    const { error } = await supabase.from("community_questions").insert({ author_id: user.id, vehicle_id: databaseVehicleId, title: title.trim(), body: body.trim() });
    setIsSending(false);
    if (error) { setMessage("We could not submit your post. Please try again."); return; }
    setTitle(""); setBody(""); setMessage("Your post was sent for review. It will be visible once approved.");
  }

  if (!vehicle) return <main className="min-h-screen bg-slate-950 p-8 text-white">Vehicle not found.</main>;
  return <main className="min-h-screen bg-slate-950 text-white"><section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
    <button type="button" onClick={() => router.back()} className="text-sm text-slate-400 hover:text-white">← Back</button>
    <p className="mt-8 text-sm font-medium text-sky-300">Community</p><h1 className="mt-2 text-4xl font-black">{getVehicleDisplayName(vehicle)}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-slate-400">Share your experience with this exact vehicle and read verified community posts. Never publish personal data, and do not follow unsafe repair advice.</p>
    <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6"><h2 className="text-xl font-bold">Share a problem</h2>
      <input required minLength={8} maxLength={160} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short title" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" />
      <textarea required minLength={20} maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Describe symptoms, conditions, and what you have already checked." className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" />
      <button disabled={isSending || !databaseVehicleId} className="w-full rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{isSending ? "Sending..." : "Submit for review"}</button>
    </form>
    {message && <p className="mt-5 rounded-xl bg-slate-900 p-4 text-sm text-slate-300">{message}</p>}
    <div className="mt-8 space-y-4">{questions.map((question) => <article key={question.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-xl font-bold">{question.title}</h2><p className="mt-3 whitespace-pre-wrap leading-7 text-slate-300">{question.body}</p></article>)}</div>
  </section></main>;
}

export default function CommunityPage() { return <Suspense fallback={<main className="min-h-screen bg-slate-950 p-8 text-white">Loading community...</main>}><CommunityContent /></Suspense>; }
