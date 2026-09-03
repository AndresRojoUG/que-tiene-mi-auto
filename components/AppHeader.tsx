import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl font-black tracking-tight text-white"
          aria-label="¿Qué tiene mi auto? — Inicio"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400 text-sm text-slate-950">
            ⌁
          </span>
          <span className="text-sm sm:text-base">¿Qué tiene mi auto?</span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-1">
          <Link
            href="/seleccionar-vehiculo"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Mi auto
          </Link>
          <Link
            href="/seleccionar-vehiculo"
            className="hidden rounded-lg bg-sky-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-300 sm:inline-flex"
          >
            Diagnosticar
          </Link>
        </nav>
      </div>
    </header>
  );
}
