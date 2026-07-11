import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Plus, Minus } from "lucide-react";

type Service = {
  id: string;
  image: string;
  title: string;
  blurb: string;
  bullets: string[];
};

const services: Service[] = [
  {
    id: "sites",
    image: "/images/servicos/sites.jpg",
    title: "Sites",
    blurb: "Institucionais e lojas de servidor FiveM, com identidade própria.",
    bullets: [
      "Loja de servidor com catálogo e integração com pagamento",
      "Estrutura leve, responsiva e otimizada para SEO",
      "Layout desenhado sob a identidade da sua cidade",
    ],
  },
  {
    id: "banners",
    image: "/images/servicos/banners.jpg",
    title: "Banners & artes",
    blurb: "Pra Discord, redes sociais e loja da cidade, no mesmo padrão visual.",
    bullets: [
      "Kit de artes coerente entre Discord, site e redes",
      "Formatos prontos para post, capa e destaque",
      "Fontes e paleta padronizadas por identidade",
    ],
  },
  {
    id: "logo-intro",
    image: "/images/servicos/logo-intro.jpg",
    title: "Logo & intro",
    blurb: "Identidade completa: logo, banner e intro animada pra abrir com cara profissional.",
    bullets: [
      "Logo em versões clara, escura e monocromática",
      "Banner e cover no mesmo sistema visual",
      "Intro animada curta para vídeos e streams",
    ],
  },
  {
    id: "discord",
    image: "/images/servicos/discord.jpg",
    title: "Discord",
    blurb: "Estrutura, canais, cargos e visual do servidor, do zero ou reformado.",
    bullets: [
      "Árvore de canais e categorias organizada",
      "Cargos, permissões e cores alinhados com a marca",
      "Emojis, banners e regras já configurados",
    ],
  },
  {
    id: "scripts-fivem",
    image: "/images/servicos/scripts-fivem.jpg",
    title: "Scripts FiveM",
    blurb: "Sistemas, jobs e interfaces sob medida pra sua cidade de GTA RP.",
    bullets: [
      "Jobs e sistemas exclusivos com UI própria",
      "Integração com frameworks (ESX, QBCore e similares)",
      "Interfaces em HTML/CSS/JS otimizadas para NUI",
    ],
  },
  {
    id: "scripts-roblox",
    image: "/images/servicos/scripts-roblox.jpg",
    title: "Scripts Roblox",
    blurb: "Sistemas pra tirar sua experiência do papel e deixar ela jogável.",
    bullets: [
      "Sistemas de gameplay em Luau",
      "UI e HUD sob medida",
      "Estrutura de dados persistente e segura",
    ],
  },
  {
    id: "slides",
    image: "/images/servicos/slides.jpg",
    title: "Slides",
    blurb: "Apresentações profissionais pra reunião, faculdade ou pitch.",
    bullets: [
      "Diagramação limpa e hierarquia clara",
      "Gráficos, tabelas e ícones consistentes",
      "Templates editáveis para uso futuro",
    ],
  },
];

function ServiceCard({ s, expanded, onToggle }: { s: Service; expanded: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  const [errored, setErrored] = useState(false);

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden border border-line bg-paper"
      layout
    >
      <button
        onClick={onToggle}
        className="block w-full text-left"
        aria-expanded={expanded}
        aria-controls={`svc-${s.id}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-alt">
          {!errored ? (
            <img
              src={s.image}
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              onError={() => setErrored(true)}
              className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden
              className="h-full w-full"
              style={{ background: "linear-gradient(135deg, #f5f5f7 0%, #d2d2d7 100%)" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent opacity-60" />
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <h3 className="text-display text-2xl sm:text-3xl">{s.title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.blurb}</p>
          </div>
          <span
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink"
            aria-hidden
          >
            {expanded ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`svc-${s.id}`}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden border-t border-line"
          >
            <ul className="grid gap-3 p-6">
              {s.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  className="flex gap-3 text-sm"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-ink" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function ServicesGallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section id="servicos" className="hairline-b py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-14 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
          <div>
            <div className="text-eyebrow text-muted-foreground">Serviços</div>
            <h2 className="text-display mt-3 text-4xl sm:text-6xl">
              O que a gente entrega.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:justify-self-end sm:text-right">
            Sete disciplinas, uma linguagem visual. Clique num card para abrir o que está incluso.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              s={s}
              expanded={openId === s.id}
              onToggle={() => setOpenId((v) => (v === s.id ? null : s.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
