import { useState } from "react";
import { motion } from "framer-motion";

// TODO: substitute NUMERO and DISCORD_LINK placeholders below.
const WA_NUMBER = "SEUNUMEROAQUI";
const DISCORD_URL = "SEULINKDODISCORDAQUI";

const tipos = [
  "Site",
  "Banner",
  "Logo e identidade",
  "Discord",
  "Script FiveM",
  "Script Roblox",
  "Slides",
];
const pacotes = ["A combinar", "Avulso", "Combo", "Sob medida"];

export function ContactForm() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(tipos[0]);
  const [pacote, setPacote] = useState(pacotes[0]);
  const [detalhes, setDetalhes] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, Hex Store! Meu nome é ${nome || "___"}.%0A` +
      `Tipo de projeto: ${tipo}%0A` +
      `Pacote: ${pacote}%0A%0A` +
      `Detalhes:%0A${encodeURIComponent(detalhes || "-")}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener");
  };

  return (
    <section id="orcamento" className="bg-ink hairline-b py-24 text-paper sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="text-eyebrow text-paper/60">Orçamento</div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display mt-3 text-4xl sm:text-6xl"
          >
            Manda o que você imagina. A gente responde.
          </motion.h2>
          <p className="mt-6 max-w-sm text-sm text-paper/70">
            Formulário monta a mensagem no WhatsApp já preenchida. Prefere Discord? Botão logo abaixo.
          </p>
          <a
            href={DISCORD_URL === "SEULINKDODISCORDAQUI" ? "#" : DISCORD_URL}
            target="_blank"
            rel="noopener"
            className="btn-pill btn-ghost mt-8 border-paper/40 text-paper hover:bg-paper hover:text-ink"
          >
            Entrar no Discord →
          </a>
        </div>

        <form onSubmit={submit} className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-eyebrow text-paper/60">Nome</span>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Como te chamamos"
              className="border-b border-paper/30 bg-transparent py-3 text-lg placeholder:text-paper/30 focus:border-paper focus:outline-none"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-eyebrow text-paper/60">Tipo de projeto</span>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="border-b border-paper/30 bg-transparent py-3 text-lg focus:border-paper focus:outline-none"
              >
                {tipos.map((t) => <option key={t} className="text-ink" value={t}>{t}</option>)}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-eyebrow text-paper/60">Pacote</span>
              <select
                value={pacote}
                onChange={(e) => setPacote(e.target.value)}
                className="border-b border-paper/30 bg-transparent py-3 text-lg focus:border-paper focus:outline-none"
              >
                {pacotes.map((p) => <option key={p} className="text-ink" value={p}>{p}</option>)}
              </select>
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-eyebrow text-paper/60">Detalhes</span>
            <textarea
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              rows={5}
              placeholder="Referências, prazo em mente, escopo, o que já existe…"
              className="border border-paper/30 bg-transparent p-4 text-base placeholder:text-paper/30 focus:border-paper focus:outline-none"
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-pill bg-paper text-ink hover:bg-paper-alt">
              Enviar pelo WhatsApp
            </button>
            <span className="text-xs text-paper/50">
              Substitua {`{{NUMERO}}`} e {`{{DISCORD}}`} nos placeholders do código.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
