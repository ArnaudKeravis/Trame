"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Truth() {
  const { truth } = siteContent;
  const reduced = useReducedMotion();

  return (
    <section className="bg-trame-ink px-6 py-32 text-trame-paper">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {truth.headline}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {truth.breakdown.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="group">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-wider text-trame-paper/50">
                    {item.label}
                  </span>
                  <span className="font-serif text-2xl font-semibold text-trame-thread">
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-trame-paper/10">
                  <motion.div
                    className="h-full rounded-full bg-trame-thread"
                    initial={{ width: reduced ? `${item.value}%` : "0%" }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <blockquote className="mt-16 border-l-2 border-trame-thread pl-6">
            <p className="font-serif text-xl italic text-trame-paper/80">
              « {truth.quote} »
            </p>
            <cite className="mt-2 block text-sm not-italic text-trame-paper/40">
              — {truth.source}
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
