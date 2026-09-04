import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import SessionActivityGuard from "@/components/SessionActivityGuard";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://que-tiene-mi-auto.vercel.app"),
  title: {
    default: "¿Qué tiene mi auto? | Diagnóstico automotriz",
    template: "%s | ¿Qué tiene mi auto?",
  },
  description:
    "Diagnóstico automotriz guiado para identificar posibles causas de fallas en tu vehículo.",
  applicationName: "¿Qué tiene mi auto?",
  authors: [{ name: "¿Qué tiene mi auto?" }],
  keywords: [
    "diagnóstico automotriz",
    "fallas de autos",
    "mecánica",
    "OBD",
    "fusibles",
    "mantenimiento automotriz",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "¿Qué tiene mi auto?",
    title: "¿Qué tiene mi auto? | Diagnóstico automotriz",
    description:
      "Identifica posibles causas de una falla de tu auto mediante un diagnóstico guiado.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#08111f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <SessionActivityGuard>
          <AppHeader />
          {children}
          <footer className="border-t border-white/10 bg-slate-950/60">
            <div className="mx-auto max-w-6xl px-5 py-6 text-center text-xs leading-5 text-slate-500 sm:px-8 sm:text-left lg:px-10">
            Diagnóstico orientativo. Ante una falla que comprometa la seguridad,
            detén el vehículo en un lugar seguro y busca apoyo profesional. {" "}
            <Link href="/sugerencias" className="font-semibold text-sky-300 hover:text-sky-200">
              Enviar sugerencia
            </Link>
            </div>
          </footer>
        </SessionActivityGuard>
      </body>
    </html>
  );
}
