import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "default" | "light";
  className?: string;
};

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const markSrc = variant === "light" ? "/logo-mark-light.svg" : "/logo-mark.svg";

  return (
    <Link href="#" className={`inline-flex items-center gap-3 ${className}`} aria-label="Trame — accueil">
      <Image
        src={markSrc}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
        priority
      />
      <span
        className={`font-display text-lg tracking-tight ${
          variant === "light" ? "text-trame-paper" : "text-trame-black"
        }`}
      >
        TRAME
      </span>
    </Link>
  );
}
