import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trame — Révéler la trame du travail",
  description:
    "Cabinet de transformation des workflows cognitifs. Codesign, preuve rapide, transfert aux équipes.",
  openGraph: {
    title: "Trame",
    description: "Révéler la trame du travail. La reconcevoir avec l'IA.",
    type: "website",
    locale: "fr_FR",
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
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-trame-paper text-trame-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
