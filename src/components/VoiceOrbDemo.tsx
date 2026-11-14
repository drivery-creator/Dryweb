import { Calculator, Compass, Globe, MessageSquare, Mic, Music, StickyNote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";

interface VoiceScenario {
  id: string;
  label: string;
  command: string;
  module: string;
  responseTitle: string;
  responseBody: string;
  metrics: string;
}

const VOICE_SCENARIOS: VoiceScenario[] = [
  {
    id: "mesh",
    label: "Modo apagón Mesh",
    command: "Activa el Canal Familiar Mesh P2P y avisa que llegué bien",
    module: "Chat Híbrido y Telemetría Telco 4.0",
    responseTitle: "Enlace Mesh P2P activado sin datos móviles",
    responseBody:
      "Conmutación automática completada. Mensaje cifrado entregado a 2 dispositivos familiares cercanos en modo avión.",
    metrics: "Red local Bluetooth / Wi-Fi Direct · Latencia 18 ms",
  },
  {
    id: "rates",
    label: "Tasa y Lienzo",
    command: "Calcula 150 dólares a tasa BCV y anótalo en el Lienzo",
    module: "Calculadora Multi-Divisa y Lienzo",
    responseTitle: "Conversión ejecutada y guardada en Notas",
    responseBody:
      "Equivalencia calculada con referencia BCV actualizada junto a su contraparte en USDT y EUR, archivada en tu historial de cuentas.",
    metrics: "150 USD · Equivalencia BCV registrada en Lienzo",
  },
  {
    id: "browser-music",
    label: "Páginas y música",
    command: "Abre las noticias tecnológicas y pon música en segundo plano",
    module: "Navegador por Voz y Audio Continuo",
    responseTitle: "Navegador abierto con reproducción en segundo plano",
    responseBody:
      "Página solicitada cargada por voz mientras tu lista de audio continúa activa sin interrupciones al cambiar hacia el mapa o el chat.",
    metrics: "Audio en segundo plano activo · Control manos libres",
  },
  {
    id: "plans",
    label: "Cuadrar salida",
    command: "Cuadra una salida para cenar hoy y traza la ruta más rápida",
    module: "Dry IA y Mapa Táctico",
    responseTitle: "Tres sitios recomendados y ruta táctica lista",
    responseBody:
      "Dry IA seleccionó opciones acordes a tu horario, guardó el plan en tu agenda y dejó el destino cargado en el mapa táctico.",
    metrics: "3 sitios sugeridos · Ruta táctica trazada por voz",
  },
];

export function VoiceOrbDemo() {
  const [selectedId, setSelectedId] = useState<string>(VOICE_SCENARIOS[0].id);
  const current =
    VOICE_SCENARIOS.find((item) => item.id === selectedId) ?? VOICE_SCENARIOS[0];

  return (
    <section
      id="voz-orbe"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <SpotlightCard className="rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
              Un asistente por voz que conecta todos tus módulos
            </h2>
            <p className="text-base leading-relaxed text-slate-300">
              Selecciona una instrucción para ver cómo el Orbe de DRIVERY OS coordina
              mensajería híbrida, tasas cambiarias, navegador web, música en segundo plano
              y rutas tácticas sin tocar múltiples aplicaciones.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {VOICE_SCENARIOS.map((item) => {
                const active = item.id === current.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`relative z-10 min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      active
                        ? "text-slate-950 font-semibold"
                        : "border border-cyan-500/20 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="voiceScenarioTab"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.28)]"
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-cyan-500/20 bg-[#03060A]/90 p-6 sm:p-8">
              {/* Kinetic Multi-Ring Cyan Voice Orb */}
              <div className="mb-6 flex items-center gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  {/* Outer rotating orbital ring */}
                  <div
                    aria-hidden="true"
                    className="animate-orb-spin absolute inset-0 rounded-full border border-dashed border-cyan-400/45"
                  />
                  {/* Reactive acoustic pulse ring on command switch */}
                  <motion.div
                    key={`pulse-${current.id}`}
                    initial={{ scale: 0.75, opacity: 0.85 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    aria-hidden="true"
                    className="absolute inset-1 rounded-full border border-cyan-300"
                  />
                  {/* Core glowing orb */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/60 bg-radial from-cyan-400/35 via-cyan-600/20 to-[#03060A] shadow-[0_0_28px_rgba(34,211,238,0.35)]">
                    <Mic className="h-5 w-5 text-cyan-200" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400">Instrucción al Orbe</div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`cmd-${current.id}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.18 }}
                      className="mt-0.5 font-mono text-sm text-cyan-200 sm:text-base"
                    >
                      "{current.command}"
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 border-t border-cyan-500/15 pt-5"
                >
                  <div className="text-xs font-mono text-cyan-300/90">
                    {current.module}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {current.responseTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {current.responseBody}
                  </p>
                  <div className="pt-2 font-mono text-xs text-slate-400 tabular-nums">
                    {current.metrics}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Connected capability icons */}
              <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-cyan-500/10 pt-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                  Chat Mesh
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-cyan-400" />
                  Tasas BCV / USDT
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <StickyNote className="h-3.5 w-3.5 text-cyan-400" />
                  Lienzo
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  Navegador
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-cyan-400" />
                  Audio continuo
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-cyan-400" />
                  Mapa táctico
                </span>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
