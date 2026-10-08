"use client";

import type { ReactNode } from "react";
import { HeroVault } from "./HeroVault";
import type { Bottle } from "./types";

export function PageHero({
  title,
  lede,
  bottles,
  kicker,
  children,
}: {
  title: string;
  lede?: ReactNode;
  bottles: Bottle[];
  kicker?: string;
  children?: ReactNode;
}) {
  return (
    <section className="ddc-hero-x ddc-page-hero">
      <div className="ddc-wrap ddc-hero-grid">
        <div className="ddc-hero-copy">
          {kicker ? (
            <p className="ddc-kicker" translate="no">
              {kicker}
            </p>
          ) : null}
          <h1 className="ddc-hero-title ddc-page-title ddc-rise">{title}</h1>
          {lede ? (
            <div className="ddc-hero-lede ddc-rise" style={{ animationDelay: "120ms" }}>
              {lede}
            </div>
          ) : null}
          {children ? (
            <div className="ddc-actions ddc-rise" style={{ animationDelay: "220ms" }}>
              {children}
            </div>
          ) : null}
        </div>
        <HeroVault bottles={bottles} />
      </div>
    </section>
  );
}
