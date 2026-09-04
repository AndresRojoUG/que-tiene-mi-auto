"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function AppFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto max-w-6xl px-5 py-6 text-center text-xs leading-5 text-slate-500 sm:px-8 sm:text-left lg:px-10">
        {t("footer.safety")} {" "}
        <Link href="/sugerencias" className="font-semibold text-sky-300 hover:text-sky-200">
          {t("footer.feedback")}
        </Link>
      </div>
    </footer>
  );
}
