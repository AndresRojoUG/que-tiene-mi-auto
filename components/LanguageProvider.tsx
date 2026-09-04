"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import {
  defaultLocale,
  supportedLocales,
  translations,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/translations";

const LOCALE_STORAGE_KEY = "qtm-locale";
const LOCALE_CHANGED_EVENT = "qtm-locale-changed";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return Boolean(value && supportedLocales.includes(value as Locale));
}

function readLocale() {
  if (typeof window === "undefined") return defaultLocale;

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(savedLocale) ? savedLocale : defaultLocale;
}

function subscribeToLocaleChange(onStoreChange: () => void) {
  window.addEventListener(LOCALE_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(LOCALE_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocaleChange,
    readLocale,
    () => defaultLocale,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(LOCALE_CHANGED_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "es" ? "es-MX" : "en";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
