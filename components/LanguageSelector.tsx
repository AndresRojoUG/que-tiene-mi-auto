"use client";

import { useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n/translations";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details ref={detailsRef} className="relative">
      <summary
        aria-label={t("language.label")}
        className="flex min-h-10 cursor-pointer list-none items-center rounded-lg border border-white/10 bg-slate-900 px-2 text-xs font-bold text-slate-200 outline-none transition hover:bg-white/5 focus:ring-2 focus:ring-sky-300"
      >
        {locale.toUpperCase()} <span aria-hidden="true" className="ml-1 text-slate-400">⌄</span>
      </summary>
      <div role="menu" className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-32 rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl shadow-black/40">
        <button type="button" role="menuitemradio" aria-checked={locale === "es"} onClick={() => selectLocale("es")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-100 transition hover:bg-white/10">
          Español
        </button>
        <button type="button" role="menuitemradio" aria-checked={locale === "en"} onClick={() => selectLocale("en")} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-100 transition hover:bg-white/10">
          English
        </button>
      </div>
    </details>
  );
}
