"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useMotionOk } from "./useMotionOk";

const TOTAL = 36;

export function CaseThreshold() {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useMotionOk("(min-width: 0px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const filledMotion = useTransform(scrollYProgress, [0, 1], [0, TOTAL]);
  const [filled, setFilled] = useState(TOTAL);

  useMotionValueEvent(filledMotion, "change", (value) => {
    if (animated) setFilled(Math.round(value));
  });

  const shown = animated ? filled : TOTAL;

  return (
    <div ref={ref} className="ddc-case">
      <div className="ddc-case-count" aria-hidden="true">
        <span className="ddc-case-number">{shown}</span>
        <span className="ddc-case-total">/{TOTAL}</span>
      </div>
      <div className="ddc-case-grid" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, index) => (
          <motion.span
            key={index}
            className={index < shown ? "ddc-case-slot is-full" : "ddc-case-slot"}
            animate={index < shown ? { scale: 1 } : { scale: 0.82 }}
            transition={{ duration: 0.18 }}
          />
        ))}
      </div>
      <p className="ddc-case-caption">
        Livraison offerte en France métropolitaine à partir de 36&nbsp;bouteilles ou équivalents.
      </p>
    </div>
  );
}
