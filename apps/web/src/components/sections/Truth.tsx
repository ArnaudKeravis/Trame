"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Hairline } from "@/components/ui/Editorial";

export function Truth() {
  const { truth } = siteContent;
  const reduced = useReducedMotion();

  return (
    <section className="section-pad section-y bg-trame-black text-trame-paper">
      <div className="mx-auto max-w-[90rem]">
        <Reveal>
          <SectionLabel light>La vérité</SectionLabel>
          <h2 className="display-title max-w-[18ch] text-trame-paper">
            {truth.headline}
          </h2>
        </Reveal>

        <div className="mt-20 space-y-0">
          {truth.breakdown.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="grid grid-cols-[4rem_1fr_auto] items-end gap-4 border-b border-trame-paper/12 py-6 md:grid-cols-[6rem_1fr_auto] md:py-8">
                <span className="font-display text-2xl text-trame-blue md:text-3xl">
                  {item.value}%
                </span>
                <div>
                  <p className="font-label text-xs uppercase tracking-[0.14em] text-trame-paper/45">
                    {item.label}
                  </p>
                  <div className="mt-3 h-1.5 w-full bg-trame-paper/10">
                    <motion.div
                      className="h-full bg-trame-blue"
                      initial={{ width: reduced ? `${item.value}%` : "0%" }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
                <span className="hidden font-display text-4xl text-trame-paper/20 md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <blockquote className="mt-20 max-w-2xl">
            <Hairline light />
            <p className="mt-8 text-lg leading-relaxed text-trame-paper/75">
              « {truth.quote} »
            </p>
            <cite className="font-label mt-4 block text-xs uppercase tracking-[0.14em] not-italic text-trame-paper/40">
              — {truth.source}
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
