import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/hex-logo.png";

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1750);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.img
            src={logoImage}
            alt="Hex Store"
            className="w-[62vw] max-w-sm sm:w-[38vw]"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <motion.div
            className="mt-6 h-[3px] w-[min(70vw,520px)] bg-[#000] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          />
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

