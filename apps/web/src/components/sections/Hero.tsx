"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { TrameWeave } from "@/components/brand/TrameWeave";
import { Reveal } from "@/components/ui/Reveal";

function AccentSubheadline({ text, accentWord }: { text: string; accentWord: string }) {
  const idx = text.indexOf(accentWord);
  if (idx === -1) {
    return <span className="text-trame-paper">{text}</span>;
  }
  return (
    <>
      <span className="text-trame-paper">{text.slice(0, idx)}</span>
      <span className="text-trame-blue">{accentWord}</span>
      <span className="text-trame-paper">{text.slice(idx + accentWord.length)}</span>
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const { hero } = siteContent;

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-trame-black pb-16 pt-28 text-trame-paper">
      <TrameWeave variant="black" opacity={0.55} />

      <div className="section-pad relative mx-auto w-full max-w-[90rem] pb-12 pt-16">
        <Reveal>
          <h1 className="display-title-xl max-w-[14ch] text-trame-paper">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display mt-4 max-w-[20ch] text-2xl md:text-4xl">
            <AccentSubheadline
              text={hero.subheadline}
              accentWord={hero.subheadlineAccentWord}
            />
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-trame-paper/65">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <a href={hero.ctaHref} className="btn-primary">
              {hero.cta}
            </a>
          </Reveal>
        </div>

        {!reduced && (
          <motion.div
            className="absolute bottom-6 right-6 hidden md:block"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-trame-paper/40">
              Scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
