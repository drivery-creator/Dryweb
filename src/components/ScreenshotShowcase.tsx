import { ArrowRight, Maximize2, Mic, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SCREENSHOT_MODULES, type AppScreenshotModule } from "../data/driveryData";
import { PhoneShowcase } from "./PhoneShowcase";
import { SpotlightCard } from "./SpotlightCard";

interface ScreenshotShowcaseProps {
  onRequestBeta: (focusTitle?: string) => void;
}

export function ScreenshotShowcase({ onRequestBeta }: ScreenshotShowcaseProps) {
  const [activeId, setActiveId] = useState<string>(SCREENSHOT_MODULES[0].id);
  const [lightboxModule, setLightboxModule] = useState<AppScreenshotModule | null>(null);

  const activeModule =
    SCREENSHOT_MODULES.find((item) => item.id === activeId) ?? SCREENSHOT_MODULES[0];

  useEffect(() => {
    if (!lightboxModule) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxModule(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxModule]);

  return (
    <section
      id="capturas"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Cada módulo diseñado para resolver tu día en una sola interfaz
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Explora las pantallas reales de la beta de DRIVERY OS. Desde mensajería
            resiliente sin conexión hasta conversión de divisas, notas por voz y rutas
            tácticas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRequestBeta(activeModule.shortTitle)}
          className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-200 whitespace-nowrap shrink-0 transition-all duration-150 hover:border-cyan-300/70 hover:bg-cyan-500/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
        >
          <span>Probar en la Beta</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Interactive segmented selector with layoutId sliding indicator */}
      <div
        role="tablist"
        aria-label="Módulos de DRIVERY OS"
        className="mb-8 flex gap-2 overflow-x-auto pb-2"
      >
        {SCREENSHOT_MODULES.map((mod) => {
          const isActive = mod.id === activeModule.id;
          return (
            <button
              key={mod.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(mod.id)}
              className={`relative z-10 min-h-[42px] rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                isActive
                  ? "text-slate-950 font-semibold"
                  : "border border-cyan-500/15 bg-white/[0.03] text-slate-300 hover:border-cyan-400/35 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeScreenshotTab"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-lg bg-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.3)]"
                />
              )}
              <span className="font-mono text-xs opacity-75 mr-2 tabular-nums">
                {mod.index}
              </span>
              {mod.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Main Spotlight Panel with 3D Interactive Device Tilt & Directional Morphing */}
      <SpotlightCard className="rounded-3xl p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Real App Capture */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <PhoneShowcase
                  src={activeModule.image}
                  alt={activeModule.alt}
                  interactiveTilt
                  priority
                />
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setLightboxModule(activeModule)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-cyan-500/25 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200 whitespace-nowrap transition-all hover:border-cyan-400/55 hover:text-cyan-200 hover:bg-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Ampliar captura real</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Detailed Functional Explanation */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -18, filter: "blur(4px)" }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="text-xs font-mono text-cyan-300/90 tabular-nums">
                  Módulo {activeModule.index} de 06 · Captura de interfaz Beta
                </div>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {activeModule.title}
                </h3>

                <p className="max-w-xl text-base leading-relaxed text-slate-300">
                  {activeModule.summary}
                </p>

                <ul className="space-y-3 border-t border-cyan-500/15 pt-6">
                  {activeModule.highlights.map((point, index) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: 0.05 + index * 0.05 }}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                      />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="rounded-xl border border-cyan-400/25 bg-cyan-950/25 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
                    <Mic className="h-3.5 w-3.5 shrink-0" />
                    <span>Comando de voz compatible con el Orbe</span>
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-slate-100">
                    "{activeModule.voicePrompt}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SpotlightCard>

      {/* Complete 6-Card Visual Overview Grid with cursor spotlight & scroll stagger */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SCREENSHOT_MODULES.map((mod, idx) => {
          const isSelected = mod.id === activeModule.id;
          return (
            <SpotlightCard
              key={mod.id}
              delay={idx * 0.05}
              className={`flex flex-col justify-between p-5 transition-transform duration-200 hover:-translate-y-1 ${
                isSelected ? "border-cyan-400/55 bg-cyan-950/20" : ""
              }`}
            >
              <article className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-400 tabular-nums">
                    <span>
                      {mod.index} · {mod.shortTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLightboxModule(mod)}
                      aria-label={`Ampliar captura de ${mod.title}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/20 text-cyan-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/15 cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveId(mod.id)}
                    className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl cursor-pointer"
                  >
                    <div className="mb-5 overflow-hidden rounded-xl border border-cyan-500/15 bg-[#03060A] p-3">
                      <div className="mx-auto aspect-[9/19.5] w-36 overflow-hidden rounded-lg">
                        <img
                          src={mod.image}
                          alt={mod.alt}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {mod.summary}
                    </p>
                  </button>
                </div>
              </article>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal with spring blur-scale transition */}
      <AnimatePresence>
        {lightboxModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxModule(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxModule.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-2xl p-6 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => setLightboxModule(null)}
                aria-label="Cerrar vista ampliada"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-black/60 text-slate-200 transition-colors hover:border-cyan-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto w-56 shrink-0 overflow-hidden rounded-2xl border border-cyan-400/35 bg-[#03060A]">
                <img
                  src={lightboxModule.image}
                  alt={lightboxModule.alt}
                  referrerPolicy="no-referrer"
                  className="aspect-[9/19.5] w-full object-cover object-top"
                />
              </div>

              <div className="space-y-4 pr-4">
                <div className="font-mono text-xs text-cyan-300 tabular-nums">
                  Captura {lightboxModule.index} · {lightboxModule.shortTitle}
                </div>
                <h4 className="font-display text-2xl font-semibold text-white">
                  {lightboxModule.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {lightboxModule.summary}
                </p>
                <ul className="space-y-2 border-t border-cyan-500/15 pt-3">
                  {lightboxModule.highlights.map((h) => (
                    <li key={h} className="text-xs leading-relaxed text-slate-300">
                      · {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
