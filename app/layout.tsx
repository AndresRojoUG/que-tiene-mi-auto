import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
