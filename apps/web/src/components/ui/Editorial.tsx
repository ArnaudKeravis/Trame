type SectionLabelProps = {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
};

export function SectionLabel({
  children,
  light = false,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`font-label mb-6 text-xs font-medium uppercase tracking-[0.2em] ${
        light ? "text-trame-paper/50" : "text-trame-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function Hairline({ light = false }: { light?: boolean }) {
  return <div className={light ? "hairline-light" : "hairline"} />;
}
