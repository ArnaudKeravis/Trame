"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Editorial";

export function Hero() {
  const reduced = useReducedMotion();
  const { hero } = siteContent;

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-28">
      <TrameWeave opacity={0.55} />

      <div className="section-pad relative mx-auto w-full max-w-[90rem] pb-12 pt-16">
        <Reveal>
          <SectionLabel>Cabinet · workflows cognitifs</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display-title-xl max-w-[14ch] text-trame-black">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="font-display mt-4 max-w-[18ch] text-2xl text-trame-blue md:text-4xl">
            {hero.subheadline}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.24}>
            <p className="max-w-md text-base leading-relaxed text-trame-muted">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex flex-wrap gap-3">
              <a href="#offre" className="btn-primary">
                Découvrir l&apos;offre
              </a>
              <a href="#methode" className="btn-ghost">
                Notre méthode
              </a>
            </div>
          </Reveal>
        </div>

        {!reduced && (
          <motion.div
            className="absolute bottom-6 right-6 hidden md:block"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-trame-muted">
              Scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
