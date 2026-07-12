import logoImage from "@/assets/hex-logo.jpg";

// Wordmark for Hex Store. HEX é renderizado com a imagem preenchendo as letras
// (background-clip: text). Troque `src/assets/hex-logo.jpg` para mudar a arte.
export function HexLogo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const fontSize = size === "lg" ? "clamp(4rem, 16vw, 12rem)" : "1.5rem";
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span
        aria-label="HEX"
        className="text-display leading-none tracking-tight"
        style={{
          fontSize,
          display: "inline-block",
          paddingRight: "0.15em",
          clipPath: "polygon(0 0, 100% 0, 100% 78%, 88% 100%, 0 100%)",
          backgroundImage: `url(${logoImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        HEX
      </span>
      {size === "sm" && <span className="text-eyebrow text-muted-foreground">— STORE —</span>}
    </span>
  );
}
