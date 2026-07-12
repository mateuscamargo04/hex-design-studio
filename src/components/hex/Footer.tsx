import { Instagram } from "lucide-react";
import { HexLogo } from "./HexLogo";

export function Footer() {
  return (
    <footer className="py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-[auto_1fr_auto] sm:items-end">
        <HexLogo />
        <div className="text-sm text-muted-foreground">
          São Paulo, SP — Brasil
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/mateusdevlp"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-ink"
          >
            <Instagram size={18} />
          </a>
          <span className="text-eyebrow text-muted-foreground">
            Hex Store — feito para você.
          </span>
        </div>
      </div>
    </footer>
  );
}
