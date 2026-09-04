"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n/translations";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <label className="sr-only">
      {t("language.label")}
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="rounded-lg border border-white/10 bg-slate-900 px-2 py-2 text-xs font-bold text-slate-200 outline-none transition hover:bg-white/5 focus:border-sky-300"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}
