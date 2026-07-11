import { motion } from "framer-motion";

const packages = [
  {
    id: "avulso",
    name: "Avulso",
    tag: "Ponto certeiro",
    desc: "Uma entrega pontual: um site, um banner, um script — o que você precisar agora.",
    features: ["1 peça por pedido", "Prazo curto", "Ideal pra testar o processo"],
    highlight: false,
  },
  {
    id: "combo",
    name: "Combo",
    tag: "Mais pedido",
    desc: "Site + identidade visual completa (logo, banner, intro) num pacote só, com visual coerente.",
    features: ["Peças combinando entre si", "Prioridade no prazo", "Sistema visual unificado"],
    highlight: true,
  },
  {
    id: "sob-medida",
    name: "Sob medida",
    tag: "Parceria contínua",
    desc: "Projeto contínuo pra cidade RP ou negócio: scripts, suporte e ajustes ao longo do tempo.",
    features: ["Escopo definido junto", "Suporte contínuo", "Roadmap combinado"],
    highlight: false,
  },
];

export function Packages() {
  return (
    <section id="pacotes" className="bg-paper-alt hairline-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow text-muted-foreground">Pacotes</div>
            <h2 className="text-display mt-3 text-4xl sm:text-6xl">Do avulso ao contínuo.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Valor sempre combinado — o que aparece aqui é a forma, não o preço.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className={
                "relative flex flex-col justify-between border p-8 sm:p-10 " +
                (p.highlight
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink")
              }
              style={p.highlight ? { clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)" } : undefined}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={"text-eyebrow " + (p.highlight ? "text-paper/70" : "text-muted-foreground")}>
                    0{i + 1} / {p.tag}
                  </span>
                  {p.highlight && (
                    <span className="rounded-full border border-paper/50 px-3 py-1 text-[10px] uppercase tracking-widest">
                      destaque
                    </span>
                  )}
                </div>
                <h3 className="text-display mt-6 text-4xl sm:text-5xl">{p.name}</h3>
                <p className={"mt-4 max-w-sm text-sm " + (p.highlight ? "text-paper/80" : "text-muted-foreground")}>
                  {p.desc}
                </p>
              </div>
              <ul className="mt-10 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={"mt-2 h-px w-6 shrink-0 " + (p.highlight ? "bg-paper" : "bg-ink")}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#orcamento"
                className={
                  "btn-pill mt-10 self-start " +
                  (p.highlight
                    ? "bg-paper text-ink hover:bg-paper-alt"
                    : "border border-ink hover:bg-ink hover:text-paper")
                }
              >
                Combinar valor
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
