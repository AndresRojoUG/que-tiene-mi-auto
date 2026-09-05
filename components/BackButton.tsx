"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

type BackButtonProps = {
  fallbackHref?: string;
};

export default function BackButton({ fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const label = locale === "en" ? "Back" : "Volver";

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex min-h-10 items-center rounded-lg px-2 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
    >
      ← {label}
    </button>
  );
}
