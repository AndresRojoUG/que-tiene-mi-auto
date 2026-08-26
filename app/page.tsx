export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          Diagnóstico automotriz inteligente
        </div>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          ¿Qué tiene mi auto?
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Descubre las posibles causas de una falla en tu vehículo
          mediante un diagnóstico guiado paso a paso.
        </p>

        <button
          className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Comenzar diagnóstico
        </button>

        <p className="mt-8 text-sm text-slate-500">
          Información orientativa. No sustituye un diagnóstico profesional.
        </p>
      </section>
    </main>
  );
}