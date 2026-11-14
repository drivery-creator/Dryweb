import { ArrowDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EcosystemSection } from "./components/EcosystemSection";
import { Navbar } from "./components/Navbar";
import { OrbitalAtmosphere } from "./components/OrbitalAtmosphere";
import { PhoneShowcase } from "./components/PhoneShowcase";
import { ScreenshotShowcase } from "./components/ScreenshotShowcase";
import { VoiceOrbDemo } from "./components/VoiceOrbDemo";
import { WaitlistSection } from "./components/WaitlistSection";
import { SOCIAL_CHANNELS } from "./data/driveryData";

const HERO_PREVIEWS = [
  {
    id: "welcome",
    label: "Acceso Beta",
    image: "/assets/aistudio/Screenshot_20261114-174417_fd89e41e.jpg",
    alt: "Pantalla de inicio de DRIVERY OS con acceso seguro y verificado",
  },
  {
    id: "map",
    label: "Mapa Táctico",
    image: "/assets/aistudio/Screenshot_20261114-174443_2f9e2a05.jpg",
    alt: "Mapa táctico nocturno de DRIVERY OS con comandos de voz",
  },
  {
    id: "mesh",
    label: "Red Mesh P2P",
    image: "/assets/aistudio/Screenshot_20261114-174423_6d8ce5d4.jpg",
    alt: "Mensajería híbrida con Dry IA y Canal Familiar Mesh P2P",
  },
];

const HERO_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const HERO_ITEM = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [waitlistFocus, setWaitlistFocus] = useState<string | undefined>(undefined);

  // Sync canonical URL & og:url for SEO
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;
  }, []);

  const scrollToWaitlist = (focusTitle?: string) => {
    if (focusTitle) {
      setWaitlistFocus(focusTitle);
    }
    const section = document.getElementById("lista-beta");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const emailInput = document.getElementById("waitlist-email");
        emailInput?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const activeHeroPreview = HERO_PREVIEWS[heroIndex];
  const prevIndex = (heroIndex - 1 + HERO_PREVIEWS.length) % HERO_PREVIEWS.length;
  const nextIndex = (heroIndex + 1) % HERO_PREVIEWS.length;

  return (
    <div id="inicio" className="relative min-h-screen overflow-x-hidden bg-[#03060A] text-slate-100">
      {/* Orbital Atmosphere Background */}
      <OrbitalAtmosphere />

      <Navbar onJoinWaitlist={() => scrollToWaitlist()} />

      <main className="relative z-10">
        {/* Hero Section: Choreographed Entry + 3D Depth Multi-Screen Stage */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Primary Copy & Single Primary CTA */}
            <motion.div
              variants={HERO_CONTAINER}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-7"
            >
              <motion.h1
                variants={HERO_ITEM}
                className="font-display font-semibold tracking-tight text-white"
                style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.65rem)", lineHeight: 1.06 }}
              >
                Tu ecosistema Telco 4.0 para comunicarte y moverte con o sin internet
              </motion.h1>

              <motion.p
                variants={HERO_ITEM}
                className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
              >
                Telemetría de red en tiempo real, mensajería híbrida Mesh P2P para
                apagones o modo avión, calculadora de tasas USDT, USD, Euro y BCV,
                lienzo inteligente, navegador por voz con música en segundo plano y mapa
                táctico guiado por Dry IA.
              </motion.p>

              <motion.div variants={HERO_ITEM} className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToWaitlist()}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 whitespace-nowrap transition-all duration-150 hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(34,211,238,0.4)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060A] cursor-pointer"
                >
                  <span>Entrar a la lista Beta</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#capturas"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-cyan-500/25 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 whitespace-nowrap transition-all duration-150 hover:border-cyan-400/55 hover:bg-cyan-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Explorar capturas</span>
                  <ArrowDown className="h-4 w-4 text-cyan-400" />
                </a>
              </motion.div>

              {/* Quiet unboxed capability summary strip */}
              <motion.div
                variants={HERO_ITEM}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cyan-500/15 pt-6 text-xs font-medium text-slate-400 sm:text-sm"
              >
                <span>Pre-lanzamiento Beta</span>
                <span aria-hidden="true" className="text-cyan-500/60">·</span>
                <span>Red Mesh P2P Offline</span>
                <span aria-hidden="true" className="text-cyan-500/60">·</span>
                <span>Asistente Dry IA por voz</span>
                <span aria-hidden="true" className="text-cyan-500/60">·</span>
                <span>Android e iOS</span>
              </motion.div>
            </motion.div>

            {/* Right Column: 3D Depth Multi-Screen Stage with Flanking Previews */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative flex items-center justify-center py-2">
                {/* Orbital cyan ring halo behind center phone */}
                <div
                  aria-hidden="true"
                  className="animate-orb-spin pointer-events-none absolute h-[380px] w-[380px] rounded-full border border-dashed border-cyan-400/18 sm:h-[430px] sm:w-[430px]"
                />

                {/* Left Flanking Preview (Desktop/Tablet) */}
                <button
                  type="button"
                  onClick={() => setHeroIndex(prevIndex)}
                  aria-label={`Ver ${HERO_PREVIEWS[prevIndex].label}`}
                  className="hidden sm:block -mr-14 z-10 w-44 opacity-45 scale-90 -rotate-6 transition-all duration-300 hover:opacity-75 hover:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-3xl cursor-pointer"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border border-cyan-500/25 bg-[#04070B] p-1.5">
                    <img
                      src={HERO_PREVIEWS[prevIndex].image}
                      alt={HERO_PREVIEWS[prevIndex].alt}
                      referrerPolicy="no-referrer"
                      className="aspect-[9/19.5] w-full rounded-[1.35rem] object-cover object-top"
                    />
                  </div>
                </button>

                {/* Center Primary Focal Phone with 3D Interactive Tilt */}
                <div className="relative z-20 w-full max-w-[275px] sm:max-w-[290px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroPreview.id}
                      initial={{ opacity: 0, scale: 0.94, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -12 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <PhoneShowcase
                        src={activeHeroPreview.image}
                        alt={activeHeroPreview.alt}
                        interactiveTilt
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Flanking Preview (Desktop/Tablet) */}
                <button
                  type="button"
                  onClick={() => setHeroIndex(nextIndex)}
                  aria-label={`Ver ${HERO_PREVIEWS[nextIndex].label}`}
                  className="hidden sm:block -ml-14 z-10 w-44 opacity-45 scale-90 rotate-6 transition-all duration-300 hover:opacity-75 hover:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-3xl cursor-pointer"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border border-cyan-500/25 bg-[#04070B] p-1.5">
                    <img
                      src={HERO_PREVIEWS[nextIndex].image}
                      alt={HERO_PREVIEWS[nextIndex].alt}
                      referrerPolicy="no-referrer"
                      className="aspect-[9/19.5] w-full rounded-[1.35rem] object-cover object-top"
                    />
                  </div>
                </button>
              </div>

              {/* Quick screen preview switcher with layoutId indicator */}
              <div
                role="tablist"
                aria-label="Vista rápida de pantallas"
                className="mx-auto mt-6 flex max-w-[320px] items-center justify-center gap-1 rounded-xl border border-cyan-500/20 bg-white/[0.03] p-1 backdrop-blur-md"
              >
                {HERO_PREVIEWS.map((preview, idx) => {
                  const active = idx === heroIndex;
                  return (
                    <button
                      key={preview.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setHeroIndex(idx)}
                      className={`relative z-10 min-h-[36px] flex-1 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        active ? "text-slate-950 font-semibold" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="heroPreviewTab"
                          transition={{ type: "spring", stiffness: 360, damping: 30 }}
                          className="absolute inset-0 -z-10 rounded-lg bg-cyan-400"
                        />
                      )}
                      {preview.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Dedicated Showcase for all 6 Screenshots & Functions */}
        <ScreenshotShowcase onRequestBeta={(title) => scrollToWaitlist(title)} />

        {/* Section 3: Interactive Asymmetric Bento Grid for Telco 4.0 Ecosystem */}
        <EcosystemSection />

        {/* Section 4: Interactive Voice Orb Workflow Preview */}
        <VoiceOrbDemo />

        {/* Section 5: Exclusive Beta Waitlist + Social Sharing Integration */}
        <WaitlistSection preselectedFocus={waitlistFocus} />
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-cyan-500/15 bg-[#020407]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2">
            <a
              href="#inicio"
              className="font-display text-lg font-bold tracking-wider text-white"
            >
              DRIVERY OS
            </a>
            <p className="max-w-sm text-sm text-slate-400">
              Ecosistema Telco 4.0 de movilidad ejecutiva, mensajería híbrida Mesh P2P y
              asistencia multimodal por voz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <a href="#capturas" className="hover:text-cyan-300 transition-colors">
              Capturas
            </a>
            <a href="#ecosistema" className="hover:text-cyan-300 transition-colors">
              Ecosistema
            </a>
            <a href="#voz-orbe" className="hover:text-cyan-300 transition-colors">
              Orbe IA
            </a>
            <a href="#lista-beta" className="hover:text-cyan-300 transition-colors">
              Lista Beta
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            {SOCIAL_CHANNELS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-cyan-500/20 px-3 py-1.5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-cyan-500/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} DRIVERY OS · Pre-lanzamiento Beta · Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}
