import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const brands = ["FiveM", "GTA RP", "Roblox", "Discord", "Sites", "Banners", "Slides", "Scripts"];

// Physics-driven marquee: drag to fling, and scroll velocity nudges direction/speed.
export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);
  const auto = useRef(-0.35); // px per ms baseline
  const last = useRef(0);
  const lastScroll = useRef(0);
  const scrollBoost = useMotionValue(0);
  const boostSpring = useSpring(scrollBoost, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!trackRef.current) return;
    // one full copy width
    setContentWidth(trackRef.current.scrollWidth / 2);
  }, []);

  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      const dt = last.current ? t - last.current : 16;
      last.current = t;
      const boost = boostSpring.get();
      let next = x.get() + (auto.current + boost) * dt;
      if (contentWidth > 0) {
        if (next <= -contentWidth) next += contentWidth;
        if (next > 0) next -= contentWidth;
      }
      x.set(next);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [contentWidth, x, boostSpring]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScroll.current;
      lastScroll.current = y;
      const target = Math.max(-2.2, Math.min(2.2, -dy * 0.08));
      animate(scrollBoost, target, { duration: 0.4 });
      window.setTimeout(() => animate(scrollBoost, 0, { duration: 0.8 }), 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollBoost]);

  const opacity = useTransform(x, [0, -1], [1, 1]);

  return (
    <section aria-label="Áreas de atuação" className="hairline-t hairline-b overflow-hidden bg-paper-alt">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        dragElastic={0.02}
        dragMomentum
        style={{ x, opacity }}
        className="flex cursor-grab select-none py-6 sm:py-8 active:cursor-grabbing"
      >
        {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
            <span className="text-display text-3xl sm:text-5xl leading-none">{b}</span>
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="opacity-40">
              <polygon points="14,3 25,9 25,19 14,25 3,19 3,9" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
