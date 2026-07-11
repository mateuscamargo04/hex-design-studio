import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  {
    q: "Quanto tempo demora um projeto?",
    a: "Varia com a complexidade — no primeiro contato já alinhamos um prazo antes de começar.",
  },
  {
    q: "Atendem só GTA RP e Roblox ou outros nichos também?",
    a: "Esse é o nosso foco principal, mas também topamos outros projetos de design e desenvolvimento fora desse nicho.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Combinamos antes de começar o projeto, geralmente com uma entrada e o restante na entrega.",
  },
  {
    q: "Depois da entrega dá pra pedir ajuste?",
    a: "Sim, o escopo de ajustes é definido junto com você antes de começar.",
  },
  {
    q: "Atendem clientes fora de São Paulo?",
    a: "Sim, todo o trabalho é feito remotamente, então dá pra atender de qualquer lugar.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="hairline-b py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <div className="text-eyebrow text-muted-foreground">Dúvidas</div>
          <h2 className="text-display mt-3 text-4xl sm:text-6xl">
            Antes que você pergunte.
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left text-lg sm:text-xl hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm text-muted-foreground sm:text-base">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
