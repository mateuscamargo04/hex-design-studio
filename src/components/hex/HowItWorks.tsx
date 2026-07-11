import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Você conta o que precisa",
    body: "Chama no WhatsApp ou Discord e explica o projeto — site, script, banner, o que for.",
  },
  {
    n: "02",
    title: "Montamos uma proposta",
    body: "Prazo e escopo claros antes de começar, sem letra miúda.",
  },
  {
    n: "03",
    title: "Entrega e ajustes",
    body: "Você recebe o material pronto pra usar, com espaço pra ajuste fino no que precisar.",
  },
];

function BrowserMock({ progress }: { progress: any }) {
  // progress: MotionValue 0..1 mapping over the section
  const barsOpacity = useTransform(progress, [0, 0.33], [0.15, 1]);
  const structureOpacity = useTransform(progress, [0.28, 0.66], [0, 1]);
  const finalOpacity = useTransform(progress, [0.6, 0.95], [0, 1]);
  const skew = useTransform(progress, [0, 0.4], [-2, 0]);

  return (
    <motion.div
      style={{ rotate: skew }}
      className="relative aspect-[16/11] w-full overflow-hidden border border-line bg-paper shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-alt px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="ml-3 text-[10px] tracking-widest text-muted-foreground">HEX-STORE.DEV</span>
      </div>
      <div className="relative h-[calc(100%-32px)] p-4 sm:p-6">
        {/* Stage 1: rough sketch */}
        <motion.div style={{ opacity: barsOpacity }} className="absolute inset-4 sm:inset-6">
          <div className="h-6 w-3/5 -rotate-1 bg-line" />
          <div className="mt-3 h-3 w-1/2 rotate-[0.5deg] bg-line/70" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-16 -rotate-1 bg-line/70" />
            <div className="h-16 rotate-[1deg] bg-line/70" />
            <div className="h-16 -rotate-[0.5deg] bg-line/70" />
          </div>
        </motion.div>
        {/* Stage 2: structure */}
        <motion.div style={{ opacity: structureOpacity }} className="absolute inset-4 sm:inset-6">
          <div className="h-8 w-2/3 bg-ink/80" />
          <div className="mt-3 h-3 w-1/3 bg-line" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-20 border border-ink/40" />
            <div className="h-20 border border-ink/40" />
            <div className="h-20 border border-ink/40" />
          </div>
          <div className="mt-4 h-8 w-32 rounded-full border border-ink" />
        </motion.div>
        {/* Stage 3: finished */}
        <motion.div style={{ opacity: finalOpacity }} className="absolute inset-4 sm:inset-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-8 w-40 bg-ink" />
              <div className="mt-3 h-3 w-52 bg-ink/40" />
            </div>
            <div className="h-8 w-24 rounded-full bg-ink" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-20 bg-ink/90" />
            <div className="h-20 bg-ink/70" />
            <div className="h-20 bg-ink/50" />
          </div>
          <div className="mt-4 h-3 w-2/3 bg-ink/30" />
          <div className="mt-2 h-3 w-1/2 bg-ink/30" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });

  return (
    <section id="processo" ref={ref} className="hairline-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16">
          <div className="text-eyebrow text-muted-foreground">Como funciona</div>
          <h2 className="text-display mt-3 max-w-3xl text-4xl sm:text-6xl">
            Três passos. Sem enrolação.
          </h2>
        </header>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <BrowserMock progress={scrollYProgress} />
          </div>
          <ol className="order-1 space-y-16 lg:order-2 lg:space-y-24">
            {steps.map((s) => (
              <motion.li
                key={s.n}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid grid-cols-[auto_1fr] gap-6"
              >
                <span className="text-display text-2xl text-muted-foreground">{s.n}</span>
                <div>
                  <h3 className="text-display text-3xl sm:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
