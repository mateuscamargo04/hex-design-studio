import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HexLogo } from "./HexLogo";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#pra-quem", label: "Pra quem" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // magnetic effect for CTA
  useEffect(() => {
    const b = btnRef.current; if (!b) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = b.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx; const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 130) {
        b.style.transform = `translate(${dx * 0.18}px, ${dy * 0.25}px)`;
      } else {
        b.style.transform = "";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.7 }}
      className={
        "fixed left-0 right-0 top-0 z-40 transition-all " +
        (shrink ? "backdrop-blur-md bg-paper/85 border-b border-line" : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center"><HexLogo /></a>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a ref={btnRef} data-magnet href="#orcamento" className="btn-pill btn-primary hidden md:inline-flex" style={{ transition: "transform 260ms cubic-bezier(0.2,0.8,0.2,1), background 200ms, color 200ms" }}>
          Fazer orçamento
        </a>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-line"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span className={"absolute left-0 h-px w-5 bg-ink transition-transform " + (open ? "top-1/2 rotate-45" : "top-1")} />
            <span className={"absolute left-0 h-px w-5 bg-ink transition-transform " + (open ? "top-1/2 -rotate-45" : "top-3")} />
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-paper px-6 py-6 md:hidden">
          <ul className="grid gap-4">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="text-2xl text-display">{l.label}</a></li>
            ))}
            <li><a href="#orcamento" onClick={() => setOpen(false)} className="btn-pill btn-primary mt-2 inline-flex">Fazer orçamento</a></li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
