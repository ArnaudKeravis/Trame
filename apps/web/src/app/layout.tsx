import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: "Trame — Révéler la trame du travail",
  description:
    "On récupère les heures que vos tâches répétitives vous volent. Diagnostic en demi-journée, preuve en 10 jours.",
  icons: {
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Trame",
    description: "Révéler la trame du travail. La reconcevoir avec l'IA.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/og-trame.svg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-trame-paper text-trame-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
