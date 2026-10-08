import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./direct-du-chateau.css";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ddc-display",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ddc-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vins et vignerons pour professionnels | Direct Du Château",
    template: "%s",
  },
  description:
    "Découvrez les vins de propriétés et les familles de vignerons suivies par Direct Du Château depuis 1992. Une sélection pensée pour les professionnels.",
  robots: { index: false, follow: false },
};

export default function DirectDuChateauLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`ddc-root ${display.variable} ${sans.variable} min-h-full`}>
      {children}
    </div>
  );
}
