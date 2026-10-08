"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Bottle } from "./types";
import { useMotionOk } from "./useMotionOk";

const CARD_VW = 19;
const INTRO_VW = 40;
const END_PAD_VW = 6;

export function RackScroll({ bottles, children }: { bottles: Bottle[]; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pinned = useMotionOk();
  const travel = Math.max(0, INTRO_VW + bottles.length * CARD_VW + END_PAD_VW - 100);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travel}vw`]);

  function revealCard(index: number) {
    const section = ref.current;
    if (!pinned || !section) return;
    const distance = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const cardStart = INTRO_VW + index * CARD_VW;
    const ratio = Math.min(1, Math.max(0, (cardStart - 50 + CARD_VW / 2) / travel));
    window.scrollTo({ top: top + distance * ratio, behavior: "instant" });
  }

  return (
    <section
      ref={ref}
      className="ddc-rack"
      aria-labelledby="selection"
      style={pinned ? { height: `${100 + travel * 0.9}vh` } : undefined}
    >
      <div className={pinned ? "ddc-rack-sticky" : undefined}>
        <motion.div className={pinned ? "ddc-rack-track is-pinned" : "ddc-rack-track"} style={pinned ? { x } : undefined}>
          <div className="ddc-rack-intro">{children}</div>
          <ul className="ddc-rack-list">
            {bottles.map((bottle, index) => (
              <li key={bottle.handle} className="ddc-rack-cell">
                <a href={bottle.href} className="ddc-rack-link" onFocus={() => revealCard(index)}>
                  <span className="ddc-rack-niche">
                    <Image
                      src={bottle.image}
                      alt={`Bouteille détourée : ${bottle.title}.`}
                      fill
                      sizes="(min-width: 900px) 19vw, 60vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="ddc-rack-name">{bottle.title}</span>
                  <span className="ddc-rack-vendor">{bottle.vendor}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        {pinned ? (
          <div className="ddc-rack-progress" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
