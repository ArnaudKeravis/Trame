"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

export function Pains() {
  const { pains } = siteContent;
  const reduced = useReducedMotion();

  return (
    <section className="bg-trame-weave/5 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {pains.headline}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {pains.items.map((pain, i) => (
            <ParallaxLayer key={pain.workflow} speed={0.15 + i * 0.05}>
              <Reveal delay={i * 0.08}>
                <motion.div
                  className="rounded-2xl border border-trame-weave/10 bg-trame-surface p-8 md:p-10"
                  whileHover={reduced ? undefined : { scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-medium uppercase tracking-wider text-trame-weave">
                    {pain.workflow}
                  </p>
                  <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-trame-muted">
                        Avant
                      </p>
                      <p className="mt-1 text-xl text-trame-muted line-through decoration-trame-thread/50">
                        {pain.before}
                      </p>
                    </div>
                    <div className="hidden h-px flex-1 thread-line md:block" />
                    <div className="text-2xl text-trame-thread md:text-3xl">→</div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-trame-weave">
                        Après
                      </p>
                      <p className="mt-1 font-serif text-2xl font-semibold text-trame-ink md:text-3xl">
                        {pain.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
