"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  EyeOff,
  Calculator,
  TrendingDown,
  HelpCircle,
  Store,
  BarChart3,
  Rocket,
  DollarSign,
  LayoutGrid,
  Megaphone,
  PieChart,
  Truck,
  Headphones,
  Target,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const CTA_URL = "#conhecer-metodo";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`px-6 md:px-12 lg:px-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <motion.a
      href={CTA_URL}
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-8 py-4 text-lg font-bold text-brand-dark transition-colors hover:bg-brand-yellow-hover ${className}`}
    >
      Conhecer o Método
      <ArrowRight className="h-5 w-5" />
    </motion.a>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-brand-teal/30 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-brand-white transition-colors hover:text-brand-yellow"
      >
        {question}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-yellow transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 leading-relaxed text-brand-white/70">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-brand-teal/20 bg-brand-darker/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          <Image
            src="/logo-performakon.png"
            alt="Performakon"
            width={180}
            height={48}
            className="h-8 w-auto"
          />
          <a
            href={CTA_URL}
            className="hidden rounded-lg bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-yellow-hover sm:inline-flex"
          >
            Conhecer o Método
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <SectionWrapper className="pt-32 pb-20 md:pt-44 md:pb-28" id="hero">
        <div className="max-w-3xl">
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
          >
            Venda no Mercado Livre com{" "}
            <span className="text-brand-yellow">margem real</span> — não com
            achismo.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-brand-white/70 md:text-xl"
          >
            A PERFORMAKON estrutura sua operação no Mercado Livre do zero:
            catálogo, precificação, publicidade e logística. Tudo com foco em
            lucro por produto — não em faturamento de vaidade.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton />
            <span className="text-sm text-brand-white/50">
              30 min · Sem compromisso · Sem enrolação
            </span>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* 2. BARRA DE CONTEXTO */}
      <SectionWrapper className="py-12 bg-brand-dark">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { number: "85 milhões", text: "de compradores ativos no Mercado Livre" },
            { number: "70%", text: "das vendas online no Brasil passam por marketplaces" },
            { number: "R$57 bi", text: "investidos pelo ML no Brasil em 2026" },
          ].map((item) => (
            <motion.div key={item.number} variants={fadeUp} className="text-center">
              <p className="text-3xl font-extrabold text-brand-yellow md:text-4xl">
                {item.number}
              </p>
              <p className="mt-2 text-brand-white/60">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-10 text-center text-lg font-medium text-brand-white/80"
        >
          O mercado está pronto. A pergunta é:{" "}
          <span className="text-brand-yellow">a sua operação está?</span>
        </motion.p>
      </SectionWrapper>

      {/* 3. SEÇÃO DE DOR */}
      <SectionWrapper className="py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          Você reconhece alguma dessas situações?
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              icon: EyeOff,
              title: "Você criou os anúncios, mas quase ninguém vê.",
              text: "Título copiado do fornecedor, fotos do catálogo, preço definido no feeling. O algoritmo enterra seu produto na página 8 e você não entende por quê.",
            },
            {
              icon: Calculator,
              title: "Quando vende, não sabe se deu lucro.",
              text: "Frete, comissão, taxa de anúncio, custo do produto, imposto. Você faz as contas no final do mês e o saldo não bate. Trabalhou muito, sobrou pouco.",
            },
            {
              icon: TrendingDown,
              title: "Investiu em Ads, mas o ACOS está comendo sua margem.",
              text: 'Ligou o Product Ads porque "todo mundo faz", mas não sabe se está pagando R$2 ou R$20 para vender cada unidade. Escalar assim é escalar prejuízo.',
            },
            {
              icon: HelpCircle,
              title: "Sente que está operando no escuro.",
              text: "Sem dashboard, sem rotina de análise, sem saber quais SKUs priorizar. Cada decisão é um chute — e o marketplace não perdoa chute.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group rounded-2xl border border-brand-teal/20 bg-brand-dark p-8 transition-colors hover:border-brand-yellow/40"
            >
              <item.icon className="h-8 w-8 text-brand-yellow" />
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-brand-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-12 text-center text-lg text-brand-white/70"
        >
          Se você se identificou com pelo menos uma dessas situações, o problema
          não é o marketplace.{" "}
          <span className="font-semibold text-brand-yellow">
            É a falta de estrutura na operação.
          </span>
        </motion.p>
      </SectionWrapper>

      {/* 4. PARA QUEM É */}
      <SectionWrapper className="py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          A PERFORMAKON foi criada para quem:
        </motion.h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Store,
              title: "Lojista que quer entrar no Mercado Livre",
              text: "Você tem produto, tem estoque, tem vontade — mas nunca vendeu em marketplace. Não sabe por onde começar: conta, catálogo, precificação, logística. Precisa de um plano, não de um curso genérico.",
            },
            {
              icon: BarChart3,
              title: "Seller ativo que não consegue escalar",
              text: "Você já vende, mas está estagnado. Faz tudo sozinho, não tem processo, não tem visibilidade de margem. Sabe que tem potencial, mas não sabe o que ajustar primeiro.",
            },
            {
              icon: Rocket,
              title: "Empresa que quer marketplace como canal",
              text: "Você já vende bem em loja física ou e-commerce próprio. Quer abrir o Mercado Livre como canal adicional — mas com estrutura, não com improviso.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-brand-teal/20 bg-brand-darker p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/10">
                <item.icon className="h-6 w-6 text-brand-yellow" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-brand-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-12 text-center text-lg text-brand-white/70"
        >
          Não importa o seu momento.{" "}
          <span className="font-semibold text-brand-yellow">
            O que importa é ter método para cada etapa.
          </span>
        </motion.p>
      </SectionWrapper>

      {/* 5. O MÉTODO */}
      <SectionWrapper className="py-20 md:py-28" id="metodo">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          Um método em 4 fases para transformar marketplace em{" "}
          <span className="text-brand-yellow">canal de lucro</span>.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl text-center text-brand-white/60"
        >
          Nada de receita pronta. Cada operação tem suas particularidades. Mas
          toda operação rentável passa por estas 4 etapas:
        </motion.p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              phase: "01",
              title: "Diagnóstico",
              subtitle: "Entender onde você está antes de decidir pra onde ir.",
              text: "Analisamos sua conta (ou montamos do zero): catálogo, precificação, publicidade, logística, reputação e concorrência. Você recebe um relatório claro com os gargalos e as oportunidades reais da sua operação.",
            },
            {
              phase: "02",
              title: "Estruturação",
              subtitle: "Montar a base que sustenta o crescimento.",
              text: "Corrigimos catálogo (títulos, fotos, atributos, SEO), definimos precificação por SKU com margem real, configuramos logística (Full, Flex ou própria) e estruturamos os primeiros Ads com ACOS controlado.",
            },
            {
              phase: "03",
              title: "Aceleração",
              subtitle: "Escalar o que já funciona, cortar o que não funciona.",
              text: "Com os dados dos primeiros meses, escalamos os SKUs vencedores, otimizamos campanhas de publicidade, expandimos catálogo e ajustamos pricing conforme a concorrência. Tudo visível em dashboards atualizados.",
            },
            {
              phase: "04",
              title: "Autonomia",
              subtitle: "Operar com previsibilidade e tomar decisões com dados.",
              text: "Você (ou sua equipe) assume a operação com processos documentados, dashboards prontos e a capacidade de ler os números e agir. A PERFORMAKON fica disponível para acompanhamento se você quiser continuar.",
            },
          ].map((item) => (
            <motion.div
              key={item.phase}
              variants={fadeUp}
              className="relative rounded-2xl border border-brand-teal/20 bg-brand-dark p-8"
            >
              <span className="text-5xl font-extrabold text-brand-yellow/20">
                {item.phase}
              </span>
              <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
              <p className="mt-1 font-medium text-brand-yellow">{item.subtitle}</p>
              <p className="mt-4 leading-relaxed text-brand-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-14 text-center">
          <CTAButton />
          <p className="mt-4 text-sm text-brand-white/50">
            Vamos analisar juntos qual fase faz sentido para a sua operação.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* 6. O QUE VOCÊ RECEBE */}
      <SectionWrapper className="py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          Isso não é teoria.{" "}
          <span className="text-brand-yellow">É o que acontece na prática.</span>
        </motion.h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: DollarSign,
              title: "Precificação por SKU com margem real",
              text: "Calculamos o preço ideal de cada produto considerando custo, comissão, frete, imposto e margem-alvo. Você sabe exatamente quanto lucra em cada venda.",
            },
            {
              icon: LayoutGrid,
              title: "Catálogo otimizado para o algoritmo",
              text: "Títulos, descrições, atributos e fotos estruturados para ranquear melhor e converter mais. Otimização específica para a busca do Mercado Livre.",
            },
            {
              icon: Megaphone,
              title: "Gestão de Product Ads com ACOS controlado",
              text: "Campanhas criadas e otimizadas com foco em retorno real. Você sabe quanto está investindo, quanto está voltando e quais campanhas cortar.",
            },
            {
              icon: PieChart,
              title: "Dashboards exclusivos",
              text: "Visibilidade total da operação em um lugar só. Faturamento, margem por SKU, ACOS, ROAS, ranking — atualizado e acessível.",
            },
            {
              icon: Truck,
              title: "Estratégia de logística",
              text: "Definimos qual modelo logístico faz sentido para o seu volume, seu produto e sua região. Full não é pra todo mundo — e a gente sabe quando é e quando não é.",
            },
            {
              icon: Headphones,
              title: "Calls semanais e suporte direto",
              text: "Não é aquele projeto que some depois do onboarding. Calls semanais de alinhamento e suporte por WhatsApp para resolver o que aparece no dia a dia.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-brand-teal/20 bg-brand-darker p-7 transition-colors hover:border-brand-yellow/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow/10">
                <item.icon className="h-5 w-5 text-brand-yellow" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* 7. POR QUE A PERFORMAKON */}
      <SectionWrapper className="py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          O que separa a PERFORMAKON de uma{" "}
          <span className="text-brand-yellow">consultoria genérica</span>.
        </motion.h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Operamos marketplace na prática. Desde 2020.",
              text: "A equipe da PERFORMAKON não veio do PowerPoint. Viemos do Seller Center. Operamos lojas próprias, erramos, aprendemos e construímos método em cima de resultado real — não de slide bonito.",
            },
            {
              icon: DollarSign,
              title: "Foco em lucro, não em faturamento.",
              text: "Faturar R$100k e ficar com R$3k de lucro não é resultado. É vaidade. Trabalhamos com margem por SKU, ACOS, custo real e lucro líquido. Se o número não aparece no bolso, ele não conta.",
            },
            {
              icon: Rocket,
              title: "Multi-plataforma: ML, Shopee e Amazon.",
              text: "A maioria das consultorias foca só no Mercado Livre. Nós estruturamos a operação pensando em expansão: quando fizer sentido, você escala para Shopee e Amazon com a mesma base de processos.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-brand-yellow/20 bg-brand-dark p-8"
            >
              <item.icon className="h-8 w-8 text-brand-yellow" />
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-brand-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* 8. COMPARATIVO */}
      <SectionWrapper className="py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          Três formas de operar no marketplace.{" "}
          <span className="text-brand-yellow">
            Duas custam mais do que parecem.
          </span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-14 overflow-x-auto rounded-2xl border border-brand-teal/20"
        >
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-teal/20 bg-brand-darker">
                <th className="p-5 font-semibold text-brand-white/50" />
                <th className="p-5 font-semibold text-brand-white/50">Sozinho</th>
                <th className="p-5 font-semibold text-brand-white/50">Consultoria genérica</th>
                <th className="p-5 font-semibold text-brand-yellow">PERFORMAKON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10">
              {[
                { label: "Precificação", solo: "No feeling, sem considerar todas as taxas", generic: "Planilha padrão", pk: "Por SKU, com margem real calculada" },
                { label: "Catálogo", solo: "Cópia do fornecedor", generic: "Template genérico", pk: "Otimizado para busca e conversão no ML" },
                { label: "Publicidade", solo: '"Liga o Ads e vê o que acontece"', generic: "Gestão básica", pk: "ACOS controlado com otimização semanal" },
                { label: "Visibilidade", solo: "Planilha manual ou nenhuma", generic: "Relatório mensal PDF", pk: "Dashboards ao vivo (publicidade + financeiro)" },
                { label: "Logística", solo: '"Mando por Correios"', generic: "Orientação genérica", pk: "Estratégia Full/Flex/própria por SKU" },
                { label: "Acompanhamento", solo: "Nenhum", generic: "Call mensal", pk: "Calls semanais + suporte diário" },
                { label: "Conhecimento do ML", solo: "Vídeos do YouTube", generic: "Teoria de mercado", pk: "Operação própria desde 2020" },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="p-5 font-semibold text-brand-white">{row.label}</td>
                  <td className="p-5 text-brand-white/40">{row.solo}</td>
                  <td className="p-5 text-brand-white/40">{row.generic}</td>
                  <td className="p-5 font-medium text-brand-yellow">{row.pk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </SectionWrapper>

      {/* 9. FAQ */}
      <SectionWrapper className="py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-extrabold md:text-4xl"
        >
          Perguntas que a gente sempre ouve.
        </motion.h2>

        <div className="mx-auto mt-14 max-w-3xl">
          <FAQItem
            question="Preciso já estar vendendo no Mercado Livre?"
            answer="Não. Atendemos tanto quem já vende quanto quem quer começar do zero. O método se adapta ao seu momento — se você ainda não tem conta, a gente monta e estrutura desde o início."
          />
          <FAQItem
            question="Quanto tempo leva pra ver resultado?"
            answer="Depende do ponto de partida. Quem já vende e tem catálogo costuma ver melhorias em 30-60 dias (otimização de Ads, precificação, catálogo). Quem está começando do zero precisa de 60-90 dias para a operação ganhar tração. Não prometemos resultado em X dias porque isso depende de produto, mercado e execução."
          />
          <FAQItem
            question="Vocês operam minha conta ou só orientam?"
            answer="Depende do plano. Na consultoria, orientamos e você executa com nosso suporte. Na assessoria, entramos direto na conta e operamos junto com você. Na call, definimos qual modelo faz mais sentido pro seu caso."
          />
          <FAQItem
            question="Trabalham só com material de construção?"
            answer="Não. Temos experiência forte em matcon, mas o método funciona para qualquer categoria. O que muda são as particularidades de cada mercado — e a gente adapta."
          />
          <FAQItem
            question="Tem fidelidade ou contrato longo?"
            answer="A consultoria tem um ciclo de 4 meses (tempo necessário para completar as 4 fases). A assessoria é mensal — sem fidelidade. Você fica porque o resultado segura, não porque o contrato obriga."
          />
          <FAQItem
            question="Quanto custa?"
            answer="Os valores dependem do escopo e do seu momento. Na call, analisamos sua situação e indicamos o plano mais adequado — com valores claros e sem surpresa."
          />
          <FAQItem
            question="O que acontece na call?"
            answer="Conversa de 30 minutos. Você explica seu momento, a gente faz perguntas sobre sua operação (ou intenção de operar), e apresentamos como o método funciona na prática. Sem pitch forçado, sem pressão. Se fizer sentido, seguimos. Se não, você sai com clareza sobre seus próximos passos."
          />
        </div>
      </SectionWrapper>

      {/* 10. CTA FINAL */}
      <SectionWrapper className="py-20 md:py-28 bg-brand-dark" id="conhecer-metodo">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-extrabold md:text-4xl"
          >
            Marketplace é canal de verdade.{" "}
            <span className="text-brand-yellow">Mas só funciona com estrutura.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-brand-white/70"
          >
            Você pode continuar tentando sozinho — ajustando preço no feeling,
            subindo anúncio sem otimização e rezando pro algoritmo funcionar.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-brand-white/70"
          >
            Ou você pode conversar com quem opera marketplace na prática desde
            2020 e saber exatamente o que precisa fazer para transformar isso em
            um canal que gera lucro real.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-semibold text-brand-white"
          >
            30 minutos. Sem compromisso. Sem enrolação.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <CTAButton />
            <p className="mt-4 text-sm text-brand-white/40">
              Escolha o melhor horário na próxima tela. Respondemos em até 24h.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className="border-t border-brand-teal/20 bg-brand-darker px-6 py-10 text-center text-sm text-brand-white/40">
        <Image
          src="/logo-performakon.png"
          alt="Performakon"
          width={140}
          height={36}
          className="mx-auto mb-4 h-6 w-auto"
        />
        <p>PERFORMAKON — Assessoria de Marketplace</p>
        <p className="mt-1">Mercado Livre · Shopee · Amazon</p>
      </footer>
    </main>
  );
}
