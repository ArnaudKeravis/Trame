"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const reduced = useReducedMotion();
  const { hero } = siteContent;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none absolute inset-0 grid-trame opacity-60" />
      <ParallaxLayer
        className="pointer-events-none absolute -right-20 top-32 h-96 w-96 rounded-full bg-trame-thread/10 blur-3xl"
        speed={0.5}
      >
        <div />
      </ParallaxLayer>
      <ParallaxLayer
        className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-trame-weave/10 blur-3xl"
        speed={0.35}
      >
        <div />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-6xl py-24">
        <Reveal>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-trame-thread">
            Cabinet de transformation des workflows cognitifs
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl font-serif text-2xl text-trame-weave md:text-3xl">
            {hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-trame-muted">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#offre"
              className="rounded-full bg-trame-weave px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Découvrir l&apos;offre
            </a>
            <a
              href="#methode"
              className="rounded-full border border-trame-ink/15 px-8 py-4 text-sm font-medium transition-colors hover:border-trame-ink/30"
            >
              Notre méthode
            </a>
          </div>
        </Reveal>

        {!reduced && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-2 text-trame-muted">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="h-10 w-px bg-trame-thread/50" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
