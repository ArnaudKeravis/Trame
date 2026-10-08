"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import type { Bottle } from "./types";
import { useMotionOk } from "./useMotionOk";

const slots = [
  { left: 4, height: 62, depth: 0.35 },
  { left: 17, height: 74, depth: 0.7 },
  { left: 31, height: 86, depth: 1 },
  { left: 45, height: 92, depth: 0.85 },
  { left: 59, height: 84, depth: 1 },
  { left: 72, height: 72, depth: 0.6 },
  { left: 84, height: 60, depth: 0.3 },
];

function VaultBottle({
  bottle,
  slot,
  index,
  progress,
  pointerX,
  pointerY,
  active,
}: {
  bottle: Bottle;
  slot: (typeof slots)[number];
  index: number;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  active: boolean;
}) {
  const scrollY = useTransform(progress, [0, 1], [0, -260 * slot.depth]);
  const shiftX = useTransform(pointerX, (value) => value * 28 * slot.depth);
  const shiftY = useTransform(pointerY, (value) => value * 14 * slot.depth);
  const y = useTransform([scrollY, shiftY], ([a, b]) => (a as number) + (b as number));

  return (
    <div
      className="ddc-vault-slot ddc-rise"
      style={{
        left: `${slot.left}%`,
        height: `${slot.height}%`,
        zIndex: Math.round(slot.depth * 10),
        animationDelay: `${180 + index * 90}ms`,
      }}
    >
      <motion.a
        href={bottle.href}
        className="ddc-vault-bottle block h-full"
        style={active ? { x: shiftX, y } : undefined}
        aria-label={`${bottle.title}, fiche sur la boutique`}
      >
        <Image
          src={bottle.image}
          alt=""
          fill
          priority={index < 4}
          sizes="(min-width: 900px) 160px, 22vw"
          className="object-cover"
        />
      </motion.a>
    </div>
  );
}

export function HeroVault({ bottles }: { bottles: Bottle[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useMotionOk();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const archY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!active || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    rawY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div ref={ref} className="ddc-vault" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.div className="ddc-vault-arch ddc-rise" style={active ? { y: archY } : undefined} aria-hidden="true" />
      <div className="ddc-vault-shelf">
        {bottles.slice(0, slots.length).map((bottle, index) => (
          <VaultBottle
            key={bottle.handle}
            bottle={bottle}
            slot={slots[index]}
            index={index}
            progress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}
