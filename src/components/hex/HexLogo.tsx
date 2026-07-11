// Wordmark for Hex Store. HEX with a diagonal cut, then STORE with em-dashes.
export function HexLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span
        className="text-display text-2xl leading-none tracking-tight"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 88% 100%, 0 100%)", display: "inline-block", paddingRight: "0.15em" }}
      >
        HEX
      </span>
      <span className="text-eyebrow text-muted-foreground">— STORE —</span>
    </span>
  );
}
