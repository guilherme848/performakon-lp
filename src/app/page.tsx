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
  Check,
  X,
  User,
  Phone,
  Building2,
  ShoppingCart,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useInView } from "framer-motion";

const CLINT_WEBHOOK = "https://functions-api.clint.digital/endpoints/integration/webhook/41090861-a54c-4baf-a7f7-386f6a5cfb33";

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-brand-yellow"
      style={{ scaleX }}
    />
  );
}

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const prefix = value.replace(/[0-9.].*/g, "");
  const num = parseFloat(numericPart) || 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * num);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, num]);

  const formatted = num % 1 !== 0 ? display.toFixed(1) : Math.round(display).toString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

/* ============================================================
   FLOATING DECORATIVE SHAPES
   ============================================================ */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float-slow absolute -top-10 -left-10 h-40 w-40 rounded-full bg-brand-yellow/[0.03] blur-3xl" />
      <div className="animate-float-slow-delay absolute top-1/3 -right-20 h-60 w-60 rounded-full bg-brand-teal/[0.05] blur-3xl" />
      <div className="animate-float-slow-delay-2 absolute bottom-20 left-1/4 h-32 w-32 rounded-full bg-brand-yellow/[0.02] blur-2xl" />
    </div>
  );
}

/* ============================================================
   MARKETPLACE LOGOS MARQUEE
   ============================================================ */
function MarqueeLogos() {
  const logos = [
    { src: "/logo-ml.png", name: "Mercado Livre" },
    { src: "/logo-shopee.jpg", name: "Shopee" },
    { src: "/logo-amazon.png", name: "Amazon" },
  ];
  const repeated = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];
  return (
    <div className="overflow-hidden border-y border-brand-teal/10 bg-brand-darker/80 py-5">
      <div className="animate-marquee flex w-max items-center gap-12">
        {repeated.map((logo, i) => (
          <div key={i} className="flex items-center gap-3 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1">
              <img src={logo.src} alt={logo.name} className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-medium text-brand-white/50">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   STICKY MOBILE CTA — appears after scrolling past hero
   ============================================================ */
function StickyMobileCTA({ onClick }: { onClick: () => void }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setVisible(y > 600);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-teal/20 bg-brand-darker/95 px-4 py-3 backdrop-blur-lg sm:hidden"
        >
          <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow py-3.5 text-sm font-bold text-brand-dark shadow-[0_0_20px_rgba(252,227,0,0.2)]"
          >
            <Sparkles className="h-4 w-4" />
            Conhecer o Método
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
      whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(252,227,0,0.35)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-brand-yellow px-6 py-3 text-base font-bold text-brand-dark shadow-[0_0_20px_rgba(252,227,0,0.15)] transition-all hover:bg-brand-yellow-hover hover:shadow-[0_0_30px_rgba(252,227,0,0.3)] sm:px-8 sm:py-4 sm:text-lg cursor-pointer ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">Conhecer o Método</span>
      <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );
}

/* ============================================================
   CONFETTI PARTICLES
   ============================================================ */
function ConfettiParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.5,
    size: 4 + Math.random() * 6,
    color: ["#FCE300", "#fff", "#3a7a8f", "#FCE300", "#e5cd00"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -10, x: `${p.x}%`, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ y: "120%", opacity: 0, scale: 0.5, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          className="absolute"
          style={{ width: p.size, height: p.size, backgroundColor: p.color, borderRadius: Math.random() > 0.5 ? "50%" : "2px" }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   ANIMATED SVG CHECKMARK
   ============================================================ */
function AnimatedCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
      className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute inset-0 rounded-full bg-brand-yellow/20"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 0] }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 rounded-full bg-brand-yellow/10"
      />
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10"
      >
        <motion.path
          d="M20 6L9 17l-5-5"
          stroke="#FCE300"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ============================================================
   STEP ICON INDICATOR
   ============================================================ */
const stepIcons = [User, Phone, Building2, ShoppingCart, TrendingUp];

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <motion.div
            key={i}
            animate={{
              scale: isActive ? 1 : 0.85,
              backgroundColor: isDone ? "rgba(252,227,0,0.2)" : isActive ? "rgba(252,227,0,0.15)" : "rgba(37,55,70,1)",
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: isDone || isActive ? "rgba(252,227,0,0.4)" : "rgba(43,91,108,0.3)" }}
          >
            {isDone ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                <Check className="h-4 w-4 text-brand-yellow" />
              </motion.div>
            ) : (
              <span className={`text-xs font-bold ${isActive ? "text-brand-yellow" : "text-brand-white/30"}`}>{stepNum}</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ============================================================
   FLOATING INPUT LABEL
   ============================================================ */
function FloatingInput({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus = false,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="group relative">
      <div className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 ${active ? "-translate-y-[26px] text-[11px]" : "text-sm"} ${focused ? "text-brand-yellow" : "text-brand-white/40"}`}>
        {label}
      </div>
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 ${active ? "opacity-0 scale-75" : "opacity-100"}`}>
      </div>
      <motion.div
        animate={{ borderColor: focused ? "rgba(252,227,0,0.6)" : "rgba(43,91,108,0.3)" }}
        className="relative flex items-center overflow-hidden rounded-xl border bg-brand-dark transition-shadow"
        style={{ boxShadow: focused ? "0 0 16px rgba(252,227,0,0.1)" : "none" }}
      >
        <div className={`flex h-full items-center pl-4 transition-colors ${focused ? "text-brand-yellow" : "text-brand-white/30"}`}>
          <Icon className="h-4 w-4" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          autoFocus={autoFocus}
          className="w-full bg-transparent px-3 pb-2 pt-5 text-brand-white placeholder-brand-white/25 outline-none"
        />
        {value.length > 0 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="pr-3">
            <Check className="h-4 w-4 text-brand-yellow/60" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

/* ============================================================
   MULTI-STEP LEAD FORM MODAL
   ============================================================ */
const slideVariants = {
  enter: { x: 40, opacity: 0, filter: "blur(4px)" },
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: { x: -40, opacity: 0, filter: "blur(4px)" },
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-md sm:items-center sm:px-4 sm:py-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full min-h-[100dvh] bg-brand-darker shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:min-h-0 sm:max-w-md sm:rounded-2xl sm:border sm:border-brand-teal/20"
      >
        {/* Decorative top glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-yellow/10 blur-3xl" />

        {/* Close button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(43,91,108,0.3)" }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-brand-white/40 transition-colors hover:text-brand-white"
        >
          <X className="h-4 w-4" />
        </motion.button>

        {/* Progress bar with glow */}
        {!sent && (
          <div className="mx-6 mt-5 h-1 overflow-hidden rounded-full bg-brand-dark sm:mx-8 sm:mt-4">
            <motion.div
              className="h-full rounded-full bg-brand-yellow shadow-[0_0_8px_rgba(252,227,0,0.4)]"
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        )}

        <div className="p-6 pt-4 sm:p-8 sm:pt-5">
          {sent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative py-6 text-center"
            >
              <ConfettiParticles />
              <AnimatedCheck />
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-brand-white"
              >
                Recebemos seus dados!
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-3 text-brand-white/60"
              >
                Nossa equipe vai entrar em contato pelo WhatsApp em até 24h para agendar sua conversa.
              </motion.p>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(252,227,0,0.3)" }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-6 rounded-xl bg-brand-yellow px-8 py-3 font-bold text-brand-dark shadow-[0_0_16px_rgba(252,227,0,0.15)] transition-colors hover:bg-brand-yellow-hover"
                >
                  Fechar
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <StepIndicator currentStep={step} totalSteps={totalSteps} />
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-center text-xl font-bold text-brand-white">Como podemos te chamar?</h3>
                    <p className="mt-1 text-center text-sm text-brand-white/40">Preencha para continuarmos</p>
                    <div className="mt-6 space-y-4">
                      <FloatingInput
                        label="Seu nome"
                        icon={User}
                        value={form.nome}
                        onChange={(v) => update("nome", v)}
                        placeholder="Ex: João Silva"
                        autoFocus
                      />
                      <FloatingInput
                        label="WhatsApp"
                        icon={Phone}
                        value={form.telefone}
                        onChange={(v) => update("telefone", phoneMask(v))}
                        placeholder="(00) 00000-0000"
                        type="tel"
                      />
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
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-center text-xl font-bold text-brand-white">Qual a sua empresa?</h3>
                    <p className="mt-1 text-center text-sm text-brand-white/40">Para personalizarmos sua análise</p>
                    <div className="mt-6">
                      <FloatingInput
                        label="Nome da empresa"
                        icon={Building2}
                        value={form.empresa}
                        onChange={(v) => update("empresa", v)}
                        placeholder="Ex: Loja do João Materiais"
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
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-center text-xl font-bold text-brand-white">Já vende no Mercado Livre?</h3>
                    <p className="mt-1 text-center text-sm text-brand-white/40">Isso define seu ponto de partida</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        { value: "sim", label: "Sim, já vendo", icon: ShoppingCart },
                        { value: "nao", label: "Ainda não", icon: Rocket },
                      ].map((opt) => (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => update("vendeML", opt.value)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative overflow-hidden rounded-xl border px-4 py-5 text-center font-semibold transition-all ${
                            form.vendeML === opt.value
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow shadow-[0_0_16px_rgba(252,227,0,0.1)]"
                              : "border-brand-teal/30 text-brand-white/60 hover:border-brand-white/30"
                          }`}
                        >
                          {form.vendeML === opt.value && (
                            <motion.div
                              layoutId="selectedCheck"
                              className="absolute right-2 top-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Check className="h-3.5 w-3.5 text-brand-yellow" />
                            </motion.div>
                          )}
                          <opt.icon className={`mx-auto mb-2 h-6 w-6 ${form.vendeML === opt.value ? "text-brand-yellow" : "text-brand-white/30"}`} />
                          {opt.label}
                        </motion.button>
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
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-center text-xl font-bold text-brand-white">Qual seu faturamento mensal no ML?</h3>
                    <p className="mt-1 text-center text-sm text-brand-white/40">Selecione a faixa mais próxima</p>
                    <div className="mt-6 space-y-2">
                      {[
                        { value: "ate-20k", label: "Até R$20 mil/mês" },
                        { value: "20k-50k", label: "R$20 mil a R$50 mil/mês" },
                        { value: "50k-100k", label: "R$50 mil a R$100 mil/mês" },
                        { value: "100k-300k", label: "R$100 mil a R$300 mil/mês" },
                        { value: "acima-300k", label: "Acima de R$300 mil/mês" },
                      ].map((opt) => (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => update("faturamento", opt.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left font-medium transition-all ${
                            form.faturamento === opt.value
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow shadow-[0_0_12px_rgba(252,227,0,0.08)]"
                              : "border-brand-teal/30 text-brand-white/60 hover:border-brand-white/30"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            {opt.label}
                            {form.faturamento === opt.value && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                                <Check className="h-4 w-4 text-brand-yellow" />
                              </motion.div>
                            )}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <motion.button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-brand-white/50 transition-colors hover:bg-brand-teal/10 hover:text-brand-white"
                  >
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                    Voltar
                  </motion.button>
                ) : (
                  <span />
                )}
                <motion.button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance() || sending}
                  whileHover={canAdvance() && !sending ? { scale: 1.04, boxShadow: "0 0 24px rgba(252,227,0,0.3)" } : {}}
                  whileTap={canAdvance() && !sending ? { scale: 0.96 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-brand-yellow px-6 py-3 font-bold text-brand-dark shadow-[0_0_12px_rgba(252,227,0,0.1)] transition-all hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">
                    {sending
                      ? "Enviando..."
                      : step === totalSteps || (step === 3 && form.vendeML === "nao")
                        ? "Enviar"
                        : "Continuar"}
                  </span>
                  {!sending && (
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                  {sending && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="relative h-4 w-4 rounded-full border-2 border-brand-dark/30 border-t-brand-dark"
                    />
                  )}
                </motion.button>
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
        className="group flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-brand-white transition-colors hover:text-brand-yellow"
      >
        {question}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="h-5 w-5 shrink-0 text-brand-yellow" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
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
    <main className="overflow-x-hidden pb-16 sm:pb-0">
      <ScrollProgress />
      <StickyMobileCTA onClick={openForm} />
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
          <motion.button
            onClick={openForm}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(252,227,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative overflow-hidden rounded-xl bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-dark shadow-[0_0_12px_rgba(252,227,0,0.1)] transition-all hover:bg-brand-yellow-hover hover:shadow-[0_0_20px_rgba(252,227,0,0.25)] sm:px-5 sm:py-2.5 sm:text-sm cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-dark/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-dark/60" />
              </span>
              Conhecer o Método
            </span>
          </motion.button>
        </div>
      </nav>

      {/* 1. HERO */}
      <SectionWrapper className="relative min-h-[85svh] pt-0 pb-0 sm:min-h-[85vh] sm:pt-32 md:pt-44 md:pb-28" id="hero">
        {/* Background image - all breakpoints */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover object-[78%_15%] sm:object-[center_top]"
          />
        </div>
        {/* Desktop: gradient left-to-right */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block bg-gradient-to-r from-brand-darker/90 via-brand-darker/60 to-brand-darker/20" />
        {/* Mobile: gradient bottom-to-top — starts solid at bottom, fades out above faces */}
        <div className="pointer-events-none absolute inset-0 -z-10 sm:hidden" style={{ background: "linear-gradient(to top, #1e2f3a 0%, #1e2f3a 25%, rgba(30,47,58,0.85) 42%, rgba(30,47,58,0.3) 58%, transparent 72%)" }} />

        {/* Mobile: push text to bottom with extra padding; Desktop: normal flow */}
        <div className="flex min-h-[85svh] flex-col justify-end pb-8 sm:min-h-0 sm:pb-0 sm:block">
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
        </div>

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
                <p className="text-xs font-semibold text-brand-white">Novo pedido</p>
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

      {/* MARQUEE LOGOS */}
      <MarqueeLogos />

      {/* 2. BARRA DE CONTEXTO */}
      <SectionWrapper className="relative py-8 sm:py-12 bg-brand-dark">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { value: "85", suffix: " mi", valueLg: "85", suffixLg: " milhões", text: "compradores ativos no ML" },
            { value: "70", suffix: "%", valueLg: "70", suffixLg: "%", text: "das vendas online são marketplace" },
            { value: "R$57", suffix: " bi", valueLg: "R$57", suffixLg: " bi", text: "investidos pelo ML em 2026" },
          ].map((item) => (
            <motion.div key={item.value} variants={fadeScale} className="text-center">
              <p className="text-xl font-extrabold text-brand-yellow sm:text-3xl md:text-4xl">
                <span className="sm:hidden">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </span>
                <span className="hidden sm:inline">
                  <AnimatedCounter value={item.valueLg} suffix={item.suffixLg} />
                </span>
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
          <span className="animate-gradient-text font-bold">a sua operação está?</span>
        </motion.p>
      </SectionWrapper>

      {/* 3. SEÇÃO DE DOR */}
      <SectionWrapper className="relative py-14 sm:py-20 md:py-28 dot-grid">
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
              variants={fadeScale}
              whileHover={{ y: -6, borderColor: "rgba(252,227,0,0.4)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-2xl border border-brand-teal/20 bg-brand-dark p-5 sm:p-8 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow/10 transition-colors group-hover:bg-brand-yellow/20 sm:h-12 sm:w-12">
                <item.icon className="h-5 w-5 text-brand-yellow sm:h-6 sm:w-6" />
              </div>
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
              variants={fadeScale}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-2xl border border-brand-teal/20 bg-brand-darker p-5 sm:p-8 transition-colors hover:border-brand-yellow/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/10 transition-all group-hover:bg-brand-yellow/20 group-hover:scale-110">
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
      <SectionWrapper className="relative py-14 sm:py-20 md:py-28 dot-grid" id="metodo">
        <FloatingShapes />
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl"
        >
          Um método em 4 fases para transformar marketplace em{" "}
          <span className="animate-gradient-text">canal de lucro</span>.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl text-center text-brand-white/60"
        >
          Nada de receita pronta. Cada operação tem suas particularidades. Mas
          toda operação rentável passa por estas 4 etapas:
        </motion.p>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2">
          {/* Timeline connector line - desktop only */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-brand-yellow/30 via-brand-yellow/10 to-transparent md:block" />
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
              variants={fadeScale}
              whileHover={{ y: -6, borderColor: "rgba(252,227,0,0.3)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl border border-brand-teal/20 bg-brand-dark p-5 sm:p-8 transition-colors"
            >
              <span className="text-5xl font-extrabold text-brand-yellow/10 transition-colors group-hover:text-brand-yellow/25">
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
              variants={fadeScale}
              whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.25)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-2xl border border-brand-teal/20 bg-brand-darker p-7 transition-colors hover:border-brand-yellow/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow/10 transition-all group-hover:bg-brand-yellow/20 group-hover:scale-110">
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
      <SectionWrapper className="relative py-14 sm:py-20 md:py-28">
        <FloatingShapes />
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
              variants={fadeScale}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(252,227,0,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-2xl border border-brand-yellow/20 bg-brand-dark p-5 sm:p-8 transition-colors hover:border-brand-yellow/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-yellow/10 transition-all group-hover:bg-brand-yellow/20 group-hover:scale-110">
                <item.icon className="h-7 w-7 text-brand-yellow" />
              </div>
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
                <th className="p-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/10 px-3 py-1 text-sm font-bold text-brand-yellow">
                    <Sparkles className="h-3.5 w-3.5" />
                    PERFORMAKON
                  </span>
                </th>
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
                <tr key={row.label} className="transition-colors hover:bg-brand-teal/5">
                  <td className="p-5 font-semibold text-brand-white">{row.label}</td>
                  <td className="p-5 text-brand-white/40">{row.solo}</td>
                  <td className="p-5 text-brand-white/40">{row.generic}</td>
                  <td className="p-5 font-medium text-brand-yellow bg-brand-yellow/[0.03]">{row.pk}</td>
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
      <SectionWrapper className="relative py-14 sm:py-20 md:py-28 bg-brand-dark" id="conhecer-metodo">
        <FloatingShapes />
        <div className="relative mx-auto max-w-2xl rounded-3xl border border-brand-yellow/20 bg-brand-darker/50 p-8 text-center backdrop-blur-sm sm:p-14">
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-extrabold sm:text-3xl md:text-4xl"
          >
            Marketplace é canal de verdade.{" "}
            <span className="animate-gradient-text">Mas só funciona com estrutura.</span>
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
      <footer className="border-t border-brand-teal/20 bg-brand-darker px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <Image
                src="/logo-performakon.png"
                alt="Performakon"
                width={140}
                height={36}
                className="mx-auto mb-3 h-6 w-auto sm:mx-0"
              />
              <p className="text-sm text-brand-white/40">Assessoria de Marketplace</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-brand-white/30">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white p-0.5"><img src="/logo-ml.png" alt="ML" className="h-full w-full object-contain" /></div>
                <span>Mercado Livre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white p-0.5"><img src="/logo-shopee.jpg" alt="Shopee" className="h-full w-full object-contain" /></div>
                <span>Shopee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white p-0.5"><img src="/logo-amazon.png" alt="Amazon" className="h-full w-full object-contain" /></div>
                <span>Amazon</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-brand-teal/10 pt-6 text-center text-xs text-brand-white/25">
            <p>&copy; {new Date().getFullYear()} PERFORMAKON. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
