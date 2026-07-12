import logoImage from "@/assets/hex-logo.png";

// Wordmark for Hex Store — renderiza a arte final do logo diretamente.
// Troque `src/assets/hex-logo.png` para atualizar a arte em todo o site.
export function HexLogo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const heightClass = size === "lg" ? "h-20 sm:h-28 lg:h-36" : "h-7 sm:h-8";
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img src={logoImage} alt="Hex Store" className={`${heightClass} w-auto object-contain`} />
    </span>
  );
}

