import Image from "next/image";
import type { Bottle } from "./types";

export function BottleStrip({ bottles, label }: { bottles: Bottle[]; label: string }) {
  return (
    <ul className="ddc-strip" aria-label={label}>
      {bottles.map((bottle) => (
        <li key={bottle.handle}>
          <a href={bottle.href} className="ddc-rack-link">
            <span className="ddc-rack-niche">
              <Image src={bottle.image} alt="" fill sizes="16rem" className="object-cover" />
            </span>
            <span className="ddc-rack-name">{bottle.title}</span>
            <span className="ddc-rack-vendor">{bottle.vendor}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
