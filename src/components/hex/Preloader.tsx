import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1750);
    return () => clearTimeout(t);
  }, []);
  const letters = ["H", "E", "X"];
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex items-baseline gap-1 text-display text-[22vw] sm:text-[16vw] leading-none">
            {letters.map((l, i) => (
              <motion.span
                key={l}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block"
                style={{ clipPath: i === 1 ? "polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)" : undefined }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="absolute bottom-8 left-8 right-8 h-px bg-line origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          />
          <div className="absolute bottom-10 right-8 text-eyebrow text-muted-foreground">HEX STORE — LOADING</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
