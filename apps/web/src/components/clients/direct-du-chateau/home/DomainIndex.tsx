"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, type FocusEvent, type PointerEvent } from "react";
import { useMotionOk } from "./useMotionOk";

export type Domain = {
  name: string;
  count: number;
  href: string;
  image: string | null;
};

export function DomainIndex({ domains }: { domains: Domain[] }) {
  const active = useMotionOk("(hover: hover) and (min-width: 900px)");
  const [current, setCurrent] = useState<Domain | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 28 });
  const y = useSpring(rawY, { stiffness: 260, damping: 28 });

  useEffect(() => {
    if (!active) return;
    function onScroll() {
      if (!(document.activeElement as HTMLElement | null)?.classList.contains("ddc-index-row")) setCurrent(null);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  function onMove(event: PointerEvent<HTMLUListElement>) {
    if (!active) return;
    rawX.set(event.clientX);
    rawY.set(event.clientY);
    const row = (event.target as HTMLElement).closest<HTMLElement>("[data-domain]");
    const domain = row ? domains[Number(row.dataset.domain)] : null;
    if (domain && domain !== current) setCurrent(domain);
  }

  function onFocusRow(domain: Domain, event: FocusEvent<HTMLAnchorElement>) {
    if (!active) return;
    const box = event.currentTarget.getBoundingClientRect();
    rawX.set(box.right - 160);
    rawY.set(box.top + box.height / 2);
    setCurrent(domain);
  }

  return (
    <>
      <ul className="ddc-index" onPointerMove={onMove} onPointerLeave={() => setCurrent(null)}>
        {domains.map((domain, index) => (
          <li key={domain.name}>
            <a
              href={domain.href}
              className="ddc-index-row"
              data-domain={index}
              onFocus={(event) => onFocusRow(domain, event)}
              onBlur={() => setCurrent(null)}
            >
              <span className="ddc-index-name" translate="no">
                {domain.name}
              </span>
              <span className="ddc-index-count">
                {domain.count} vin{domain.count > 1 ? "s" : ""}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {active ? (
        <motion.div className="ddc-index-preview" style={{ x, y }} aria-hidden="true">
          <AnimatePresence mode="popLayout">
            {current?.image ? (
              <motion.div
                key={current.name}
                className="ddc-index-preview-img"
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
              >
                <Image src={current.image} alt="" fill sizes="180px" className="object-cover" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </>
  );
}
