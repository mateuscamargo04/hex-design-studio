import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useLightMode, useHydrated } from "./use-light-mode";
import { Hex2DFallback } from "./Hex2DFallback";
import { ArrowDown } from "lucide-react";

const HexScene = lazy(() => import("./HexScene"));

const words = ["Sites.", "Identidade.", "Scripts.", "Precisão."];

export function Hero() {
  const light = useLightMode();
  const hydrated = useHydrated();
  const use3D = hydrated && !light;

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-paper">
      {/* backdrop scene */}
      <div className="pointer-events-none absolute inset-0">
        {use3D ? (
          <Suspense fallback={<Hex2DFallback />}>
            <HexScene />
          </Suspense>
        ) : (
          <Hex2DFallback />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pb-16 pt-32 sm:pt-40">
        <div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.85, duration: 0.7 }}
            className="text-eyebrow text-muted-foreground"
          >
            HEX STORE — Estúdio técnico
          </motion.div>
          <h1 className="text-display mt-6 text-[15vw] sm:text-[10vw] lg:text-[9rem]">
            {words.map((w, i) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.9 + i * 0.09, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.45, duration: 0.7 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground"
          >
            Estúdio dedicado a donos de cidade GTA RP e criadores Roblox.
            Sites, banners, identidade, Discord e scripts — em uma só linguagem visual.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#orcamento" data-magnet className="btn-pill btn-primary">Começar um projeto</a>
            <a href="#servicos" className="btn-pill btn-ghost">Ver serviços</a>
          </motion.div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <ArrowDown size={14} className="animate-bounce" />
            <span className="text-eyebrow">rolar</span>
          </div>
          <div className="hidden max-w-xs text-right sm:block">
            <span className="text-eyebrow">Monocromático. Angular. Feito à mão.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
