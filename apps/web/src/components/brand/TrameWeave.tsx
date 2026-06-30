type TrameWeaveProps = {
  className?: string;
  variant?: "paper" | "black" | "blue";
  opacity?: number;
};

export function TrameWeave({
  className = "",
  variant = "paper",
  opacity = 1,
}: TrameWeaveProps) {
  const lineColor =
    variant === "black"
      ? "rgba(236,231,221,0.12)"
      : variant === "blue"
        ? "rgba(236,231,221,0.15)"
        : "rgba(19,16,18,0.07)";
  const nodeColor = variant === "paper" ? "#2C2BE8" : "#2C2BE8";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="trame-weave-pattern"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 16H64M0 32H64M0 48H64" stroke={lineColor} strokeWidth="0.75" />
          <path d="M16 0V64M32 0V64M48 0V64" stroke={lineColor} strokeWidth="0.75" />
          <circle cx="16" cy="16" r="2" fill={nodeColor} fillOpacity="0.9" />
          <circle cx="32" cy="32" r="2" fill={nodeColor} fillOpacity="0.9" />
          <circle cx="48" cy="48" r="2" fill={nodeColor} fillOpacity="0.9" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#trame-weave-pattern)" />
    </svg>
  );
}
