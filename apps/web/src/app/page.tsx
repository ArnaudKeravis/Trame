import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Truth } from "@/components/sections/Truth";
import { Proposition } from "@/components/sections/Proposition";
import { Workflows } from "@/components/sections/Workflows";
import { Pains } from "@/components/sections/Pains";
import { Method } from "@/components/sections/Method";
import { Offering } from "@/components/sections/Offering";
import { Positioning } from "@/components/sections/Positioning";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="thread-line mx-auto max-w-6xl" />
        <Problem />
        <Truth />
        <Proposition />
        <Workflows />
        <Pains />
        <Method />
        <Offering />
        <Positioning />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
