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
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

const CLINT_WEBHOOK = "https://functions-api.clint.digital/endpoints/integration/webhook/41090861-a54c-4baf-a7f7-386f6a5cfb33";

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

function CTAButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 text-base font-bold text-brand-dark transition-colors hover:bg-brand-yellow-hover sm:px-8 sm:py-4 sm:text-lg cursor-pointer ${className}`}
    >
      Conhecer o Método
      <ArrowRight className="h-5 w-5" />
    </motion.button>
  );
}

/* ============================================================
   MULTI-STEP LEAD FORM MODAL
   ============================================================ */
const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

function LeadFormModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    empresa: "",
    vendeML: "",
    faturamento: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = useCallback(() => {
    if (step === 1) return form.nome.trim().length >= 2 && form.telefone.trim().length >= 10;
    if (step === 2) return form.empresa.trim().length >= 2;
    if (step === 3) return form.vendeML !== "";
    if (step === 4) return form.faturamento !== "";
    return false;
  }, [step, form]);

  const totalSteps = form.vendeML === "sim" ? 4 : 3;

  const next = async () => {
    if (step === 3 && form.vendeML === "nao") {
      await submit();
      return;
    }
    if (step === totalSteps) {
      await submit();
      return;
    }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nome,
          phone: form.telefone,
          company: form.empresa,
          sells_on_ml: form.vendeML === "sim",
          revenue: form.faturamento || null,
          source: "landing-page-performakon",
          created_at: new Date().toISOString(),
        }),
      });
    } catch {
      // silently continue — lead still captured
    }
    setSending(false);
    setSent(true);
  };

  const phoneMask = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md overflow-hidden rounded-none border-0 bg-brand-darker shadow-2xl sm:rounded-2xl sm:border sm:border-brand-teal/20 max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brand-white/40 transition-colors hover:text-brand-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        {/* Progress bar */}
        {!sent && (
          <div className="h-1 bg-brand-dark">
            <motion.div
              className="h-full bg-brand-yellow"
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="p-8">
          {sent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#FCE300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-white">Recebemos seus dados!</h3>
              <p className="mt-3 text-brand-white/60">
                Nossa equipe vai entrar em contato pelo WhatsApp em até 24h para agendar sua conversa.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-lg bg-brand-yellow px-6 py-3 font-bold text-brand-dark transition-colors hover:bg-brand-yellow-hover"
              >
                Fechar
              </button>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-medium text-brand-yellow">Passo 1 de {totalSteps}</p>
                    <h3 className="mt-2 text-xl font-bold text-brand-white">Como podemos te chamar?</h3>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-brand-white/60">Seu nome</label>
                        <input
                          type="text"
                          value={form.nome}
                          onChange={(e) => update("nome", e.target.value)}
                          placeholder="Ex: João Silva"
                          className="w-full rounded-lg border border-brand-teal/30 bg-brand-dark px-4 py-3 text-brand-white placeholder-brand-white/30 outline-none transition-colors focus:border-brand-yellow"
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-brand-white/60">WhatsApp</label>
                        <input
                          type="tel"
                          value={form.telefone}
                          onChange={(e) => update("telefone", phoneMask(e.target.value))}
                          placeholder="(00) 00000-0000"
                          className="w-full rounded-lg border border-brand-teal/30 bg-brand-dark px-4 py-3 text-brand-white placeholder-brand-white/30 outline-none transition-colors focus:border-brand-yellow"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-medium text-brand-yellow">Passo 2 de {totalSteps}</p>
                    <h3 className="mt-2 text-xl font-bold text-brand-white">Qual a sua empresa?</h3>
                    <div className="mt-6">
                      <label className="mb-1.5 block text-sm text-brand-white/60">Nome da empresa</label>
                      <input
                        type="text"
                        value={form.empresa}
                        onChange={(e) => update("empresa", e.target.value)}
                        placeholder="Ex: Loja do João Materiais"
                        className="w-full rounded-lg border border-brand-teal/30 bg-brand-dark px-4 py-3 text-brand-white placeholder-brand-white/30 outline-none transition-colors focus:border-brand-yellow"
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-medium text-brand-yellow">Passo 3 de {totalSteps}</p>
                    <h3 className="mt-2 text-xl font-bold text-brand-white">Já vende no Mercado Livre?</h3>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        { value: "sim", label: "Sim, já vendo" },
                        { value: "nao", label: "Ainda não" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update("vendeML", opt.value)}
                          className={`rounded-lg border px-4 py-4 text-center font-semibold transition-all ${
                            form.vendeML === opt.value
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                              : "border-brand-teal/30 text-brand-white/60 hover:border-brand-white/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm font-medium text-brand-yellow">Passo 4 de {totalSteps}</p>
                    <h3 className="mt-2 text-xl font-bold text-brand-white">Qual seu faturamento mensal no ML?</h3>
                    <div className="mt-6 space-y-2">
                      {[
                        { value: "ate-20k", label: "Até R$20 mil/mês" },
                        { value: "20k-50k", label: "R$20 mil a R$50 mil/mês" },
                        { value: "50k-100k", label: "R$50 mil a R$100 mil/mês" },
                        { value: "100k-300k", label: "R$100 mil a R$300 mil/mês" },
                        { value: "acima-300k", label: "Acima de R$300 mil/mês" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update("faturamento", opt.value)}
                          className={`w-full rounded-lg border px-4 py-3 text-left font-medium transition-all ${
                            form.faturamento === opt.value
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                              : "border-brand-teal/30 text-brand-white/60 hover:border-brand-white/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="text-sm font-medium text-brand-white/50 transition-colors hover:text-brand-white"
                  >
                    Voltar
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance() || sending}
                  className="rounded-lg bg-brand-yellow px-6 py-3 font-bold text-brand-dark transition-all hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending
                    ? "Enviando..."
                    : step === totalSteps || (step === 3 && form.vendeML === "nao")
                      ? "Enviar"
                      : "Continuar"}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
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
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);

  return (
    <main className="overflow-x-hidden">
      {/* Lead Form Modal */}
      <AnimatePresence>
        {showForm && <LeadFormModal onClose={() => setShowForm(false)} />}
      </AnimatePresence>
      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-brand-teal/20 bg-brand-darker/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-12 lg:px-20">
          <Image
            src="/logo-performakon.png"
            alt="Performakon"
            width={180}
            height={48}
            className="h-7 w-auto sm:h-10"
          />
          <button
            onClick={openForm}
            className="rounded-lg bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-yellow-hover sm:px-5 sm:py-2.5 sm:text-sm cursor-pointer"
          >
            Conhecer o Método
          </button>
        </div>
      </nav>

      {/* 1. HERO */}
      <SectionWrapper className="relative min-h-0 pt-20 pb-0 sm:min-h-[85vh] sm:pt-32 md:pt-44 md:pb-28" id="hero">
        {/* Background image - desktop only (behind everything) */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden sm:block">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover object-[center_top]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block bg-gradient-to-r from-brand-darker/90 via-brand-darker/60 to-brand-darker/20" />

        {/* Mobile: text centered, then image below */}
        <div className="text-center sm:text-left sm:max-w-2xl">
          <motion.h1
            variants={fadeUp}
            className="text-[1.75rem] font-extrabold leading-[1.15] tracking-tight sm:text-3xl md:text-5xl"
          >
            Venda no Mercado Livre com{" "}
            <span className="text-brand-yellow">margem real</span> — não com
            achismo.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-brand-white/70 sm:mt-5 sm:text-base md:text-lg"
          >
            A PERFORMAKON estrutura sua operação no Mercado Livre do zero:
            catálogo, precificação, publicidade e logística. Tudo com foco em
            lucro por produto — não em faturamento de vaidade.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <CTAButton onClick={openForm} />
            <span className="text-xs text-brand-white/50 sm:text-sm">
              30 min · Sem compromisso · Sem enrolação
            </span>
          </motion.div>
        </div>

        {/* Mobile: hero image visible below text */}
        <motion.div
          variants={fadeUp}
          className="mt-8 overflow-hidden rounded-2xl sm:hidden"
        >
          <img
            src="/hero-bg.jpg"
            alt="Fundadores Performakon"
            className="w-full object-cover object-[center_20%]"
            style={{ aspectRatio: "16/10" }}
          />
        </motion.div>

        {/* Floating marketplace notifications - right side, below faces */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pointer-events-none absolute bottom-[22%] right-[3%] hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1"><img src="/logo-ml.png" alt="Mercado Livre" className="h-full w-full object-contain" /></div>
              <div>
                <p className="text-xs font-semibold text-brand-white">Você vendeu!</p>
                <p className="text-[11px] text-brand-white/50">Kit Chuveiro Lorenzetti · R$189,90</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="pointer-events-none absolute bottom-[12%] right-[10%] hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1"><img src="/logo-shopee.jpg" alt="Shopee" className="h-full w-full object-contain" /></div>
              <div>
                <p className="text-xs font-semibold text-brand-white">Novo pedido Shopee</p>
                <p className="text-[11px] text-brand-white/50">Furadeira Bosch 12V · R$347,00</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="pointer-events-none absolute bottom-[3%] right-[5%] hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1"><img src="/logo-amazon.png" alt="Amazon" className="h-full w-full object-contain" /></div>
              <div>
                <p className="text-xs font-semibold text-brand-white">Venda confirmada</p>
                <p className="text-[11px] text-brand-white/50">Serra Circular Dewalt · R$892,00</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* 2. BARRA DE CONTEXTO */}
      <SectionWrapper className="py-8 sm:py-12 bg-brand-dark">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { number: "85 mi", numberLg: "85 milhões", text: "compradores ativos no ML" },
            { number: "70%", numberLg: "70%", text: "das vendas online são marketplace" },
            { number: "R$57 bi", numberLg: "R$57 bi", text: "investidos pelo ML em 2026" },
          ].map((item) => (
            <motion.div key={item.number} variants={fadeUp} className="text-center">
              <p className="text-xl font-extrabold text-brand-yellow sm:text-3xl md:text-4xl">
                <span className="sm:hidden">{item.number}</span>
                <span className="hidden sm:inline">{item.numberLg}</span>
              </p>
              <p className="mt-1 text-xs text-brand-white/60 sm:mt-2 sm:text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-center text-sm font-medium text-brand-white/80 sm:mt-10 sm:text-lg"
        >
          O mercado está pronto. A pergunta é:{" "}
          <span className="text-brand-yellow">a sua operação está?</span>
        </motion.p>
      </SectionWrapper>

      {/* 3. SEÇÃO DE DOR */}
      <SectionWrapper className="py-14 sm:py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
              className="group rounded-2xl border border-brand-teal/20 bg-brand-dark p-5 sm:p-8 transition-colors hover:border-brand-yellow/40"
            >
              <item.icon className="h-6 w-6 text-brand-yellow sm:h-8 sm:w-8" />
              <h3 className="mt-3 text-base font-bold sm:mt-4 sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-white/60 sm:mt-3 sm:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-center text-sm text-brand-white/70 sm:mt-12 sm:text-lg"
        >
          Se você se identificou com pelo menos uma dessas situações, o problema
          não é o marketplace.{" "}
          <span className="font-semibold text-brand-yellow">
            É a falta de estrutura na operação.
          </span>
        </motion.p>
      </SectionWrapper>

      {/* 4. PARA QUEM É */}
      <SectionWrapper className="py-14 sm:py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
              className="rounded-2xl border border-brand-teal/20 bg-brand-darker p-5 sm:p-8"
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
      <SectionWrapper className="py-14 sm:py-20 md:py-28" id="metodo">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
              className="relative rounded-2xl border border-brand-teal/20 bg-brand-dark p-5 sm:p-8"
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
          <CTAButton onClick={openForm} />
          <p className="mt-4 text-sm text-brand-white/50">
            Vamos analisar juntos qual fase faz sentido para a sua operação.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* 6. O QUE VOCÊ RECEBE */}
      <SectionWrapper className="py-14 sm:py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
      <SectionWrapper className="py-14 sm:py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
              className="rounded-2xl border border-brand-yellow/20 bg-brand-dark p-5 sm:p-8"
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
      <SectionWrapper className="py-14 sm:py-20 md:py-28 bg-brand-dark">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
      <SectionWrapper className="py-14 sm:py-20 md:py-28">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
      <SectionWrapper className="py-14 sm:py-20 md:py-28 bg-brand-dark" id="conhecer-metodo">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-extrabold sm:text-3xl md:text-4xl"
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
            <CTAButton onClick={openForm} />
            <p className="mt-4 text-sm text-brand-white/40">
              Escolha o melhor horário na próxima tela. Respondemos em até 24h.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className="border-t border-brand-teal/20 bg-brand-darker px-4 py-8 text-center text-xs text-brand-white/40 sm:px-6 sm:py-10 sm:text-sm">
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
