import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Truth } from "@/components/sections/Truth";
import { Proposition } from "@/components/sections/Proposition";
import { Method } from "@/components/sections/Method";
import { Proof } from "@/components/sections/Proof";
import { Offering } from "@/components/sections/Offering";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <Truth />
        <Proposition />
        <Method />
        <Proof />
        <Offering />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
