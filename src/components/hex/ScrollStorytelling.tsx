import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const chapters = [
  {
    id: "fivem",
    image: "/images/servicos/pra-quem-fivem.jpg",
    title: "Donos de cidade GTA RP",
    body: "Loja, banners, scripts e site com uma identidade que se destaca dos servidores concorrentes.",
    tag: "FiveM · GTA RP",
  },
  {
    id: "roblox",
    image: "/images/servicos/pra-quem-roblox.jpg",
    title: "Criadores no Roblox",
    body: "Scripts e sistemas pra tirar sua experiência do papel e deixar ela jogável de verdade.",
    tag: "Roblox · Luau",
  },
];

export function ScrollStorytelling() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <section id="pra-quem" ref={ref} className="relative hairline-b" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
        {chapters.map((c, i) => (
          <motion.div
            key={c.id}
            className="absolute inset-0"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [
                  (i - 0.5) / chapters.length,
                  i / chapters.length + 0.02,
                  (i + 1) / chapters.length - 0.02,
                  (i + 1.5) / chapters.length,
                ],
                [0, 1, 1, 0],
              ),
            }}
            onViewportEnter={() => setActive(i)}
            aria-hidden={active !== i}
          >
            <img
              src={c.image}
              alt=""
              width={1600}
              height={1200}
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
              style={{ opacity: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
          </motion.div>
        ))}
        <motion.div style={{ opacity: bgOpacity }} className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl">
            <div className="text-eyebrow text-paper/60">Pra quem — {chapters[active].tag}</div>
            <div className="relative mt-6 h-[220px] sm:h-[260px]">
              {chapters.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={false}
                  animate={{
                    y: active === i ? 0 : 30,
                    opacity: active === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <h2 className="text-display text-5xl sm:text-7xl">{c.title}</h2>
                  <p className="mt-6 max-w-lg text-base sm:text-lg text-paper/80">{c.body}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex gap-2">
              {chapters.map((_, i) => (
                <span
                  key={i}
                  className={"h-px transition-all " + (active === i ? "w-16 bg-paper" : "w-6 bg-paper/30")}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
