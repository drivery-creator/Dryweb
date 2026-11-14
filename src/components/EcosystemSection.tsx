import { Compass, Globe, Music, Radio, ShieldCheck, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";

type NetworkMode = "online" | "mesh";
type CurrencyCode = "USD" | "USDT" | "EUR";

const CURRENCY_RATES: Record<CurrencyCode, { label: string; rateBs: number; sampleAmount: number }> = {
  USD: { label: "BCV USD", rateBs: 889.26, sampleAmount: 150 },
  USDT: { label: "USDT P2P", rateBs: 912.4, sampleAmount: 150 },
  EUR: { label: "BCV Euro", rateBs: 964.15, sampleAmount: 150 },
};

export function EcosystemSection() {
  const [networkMode, setNetworkMode] = useState<NetworkMode>("mesh");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isPlayingBg, setIsPlayingBg] = useState(true);

  const activeRate = CURRENCY_RATES[currency];
  const convertedBs = (activeRate.sampleAmount * activeRate.rateBs).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section
      id="ecosistema"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-2xl"
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Arquitectura Telco 4.0 pensada para operar en cualquier escenario
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          Cada herramienta dentro de DRIVERY OS comparte contexto, telemetría y
          personalización para que no tengas que alternar entre seis aplicaciones
          distintas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Card 1 (Wide): Live Interactive Telco 4.0 & Mesh P2P Topology */}
        <SpotlightCard delay={0.04} className="md:col-span-7 p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan-300 tabular-nums">01</span>
                  <Radio className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                </div>

                {/* Interactive Mode Segmented Switch with shared layoutId */}
                <div
                  role="group"
                  aria-label="Modo de conectividad"
                  className="relative inline-flex rounded-lg border border-cyan-500/20 bg-[#03060A]/80 p-1"
                >
                  {(
                    [
                      { id: "online", label: "Modo Online" },
                      { id: "mesh", label: "Apagón · Mesh P2P" },
                    ] as const
                  ).map((opt) => {
                    const active = networkMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setNetworkMode(opt.id)}
                        className={`relative z-10 min-h-[34px] rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          active ? "text-slate-950 font-semibold" : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="ecosystemNetworkTab"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 -z-10 rounded-md bg-cyan-400"
                          />
                        )}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Telemetría Telco 4.0 con y sin internet
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Supervisa la estabilidad de tu señal, latencia y consumo en tiempo real.
                Cuando cae la cobertura o activas el modo avión, el motor híbrido enlaza
                nodos familiares cercanos mediante red Mesh P2P.
              </p>
            </div>

            {/* Animated SVG Signal Topology Diagram */}
            <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/80 p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>
                  {networkMode === "mesh"
                    ? "Enlace directo Bluetooth / Wi-Fi Direct sin red celular"
                    : "Telemetría celular 4G/5G · Auto-Switch preparado"}
                </span>
                <span className="text-cyan-300 tabular-nums">
                  {networkMode === "mesh" ? "18 ms P2P" : "24 ms Red"}
                </span>
              </div>

              <svg
                viewBox="0 0 520 110"
                className="h-24 w-full overflow-visible"
                aria-hidden="true"
              >
                {/* Base connection rails */}
                <line
                  x1="60"
                  y1="55"
                  x2="260"
                  y2="55"
                  stroke={networkMode === "online" ? "rgba(34,211,238,0.45)" : "rgba(148,163,184,0.16)"}
                  strokeWidth="1.5"
                  strokeDasharray={networkMode === "online" ? "none" : "4 4"}
                />
                <path
                  d="M 260 55 Q 360 16 460 32"
                  fill="none"
                  stroke={networkMode === "mesh" ? "rgba(34,211,238,0.55)" : "rgba(34,211,238,0.18)"}
                  strokeWidth="1.5"
                />
                <path
                  d="M 260 55 Q 360 94 460 78"
                  fill="none"
                  stroke={networkMode === "mesh" ? "rgba(34,211,238,0.55)" : "rgba(34,211,238,0.18)"}
                  strokeWidth="1.5"
                />

                {/* Animated travelling signal packet */}
                {networkMode === "online" ? (
                  <motion.circle
                    r="4"
                    fill="#22D3EE"
                    initial={{ cx: 60, cy: 55 }}
                    animate={{ cx: [60, 260], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <>
                    <motion.circle
                      r="4"
                      fill="#22D3EE"
                      animate={{
                        cx: [260, 360, 460],
                        cy: [55, 22, 32],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      r="3.5"
                      fill="#67E8F9"
                      animate={{
                        cx: [260, 360, 460],
                        cy: [55, 88, 78],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{ duration: 1.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </>
                )}

                {/* Node 1: Tower */}
                <g transform="translate(60,55)">
                  <circle
                    r="16"
                    fill="#08101A"
                    stroke={networkMode === "online" ? "#22D3EE" : "#334155"}
                    strokeWidth="1.5"
                  />
                  <text
                    y="32"
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] font-mono"
                  >
                    Torre Telco
                  </text>
                </g>

                {/* Node 2: User Device */}
                <g transform="translate(260,55)">
                  <circle r="18" fill="#0B1926" stroke="#22D3EE" strokeWidth="2" />
                  <circle r="5" fill="#22D3EE" />
                  <text
                    y="34"
                    textAnchor="middle"
                    className="fill-white text-[10px] font-mono"
                  >
                    DRIVERY OS
                  </text>
                </g>

                {/* Node 3 & 4: Family / Mesh Nodes */}
                <g transform="translate(460,32)">
                  <circle
                    r="13"
                    fill="#08101A"
                    stroke={networkMode === "mesh" ? "#22D3EE" : "#475569"}
                    strokeWidth="1.5"
                  />
                  <text
                    y="24"
                    textAnchor="middle"
                    className="fill-slate-300 text-[10px] font-mono"
                  >
                    Familia 1
                  </text>
                </g>
                <g transform="translate(460,78)">
                  <circle
                    r="13"
                    fill="#08101A"
                    stroke={networkMode === "mesh" ? "#22D3EE" : "#475569"}
                    strokeWidth="1.5"
                  />
                  <text
                    y="24"
                    textAnchor="middle"
                    className="fill-slate-300 text-[10px] font-mono"
                  >
                    Familia 2
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 2 (Standard): Voice Browser & Background Audio Equalizer */}
        <SpotlightCard delay={0.1} className="md:col-span-5 p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 tabular-nums">02</span>
                <Globe className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              </div>

              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Navegador por voz y música en segundo plano
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Pide páginas web, consulta información o reproduce tu música en segundo
                plano mientras usas el mapa táctico o el chat sin interrupciones.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Music className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span className="truncate font-mono text-xs text-slate-200">
                    Audio continuo · Segundo plano
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlayingBg((prev) => !prev)}
                  className="rounded-md border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-200 whitespace-nowrap transition-colors hover:bg-cyan-500/20 cursor-pointer"
                >
                  {isPlayingBg ? "Pausar" : "Reanudar"}
                </button>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="mt-4 flex h-8 items-end gap-1.5" aria-hidden="true">
                {[0.55, 0.9, 0.4, 0.85, 0.65, 1, 0.5, 0.8, 0.6, 0.92, 0.45, 0.75].map(
                  (height, idx) => (
                    <motion.div
                      key={idx}
                      className="flex-1 origin-bottom rounded-full bg-gradient-to-t from-cyan-600 to-cyan-300"
                      style={{ height: "100%" }}
                      animate={
                        isPlayingBg
                          ? { scaleY: [0.22, height, 0.3, height * 0.75] }
                          : { scaleY: 0.18 }
                      }
                      transition={
                        isPlayingBg
                          ? {
                              duration: 0.9 + (idx % 4) * 0.18,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: idx * 0.05,
                            }
                          : { duration: 0.2 }
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 3 (Standard): Live Multi-Currency Rate Preview */}
        <SpotlightCard delay={0.14} className="md:col-span-5 p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 tabular-nums">03</span>
                <Wallet className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              </div>

              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Tasas del día conectadas a tu Lienzo
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Cruza montos entre USDT, USD, Euro y tasa BCV al instante y archiva cada
                operación en tu Lienzo para mantener tus cuentas claras.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/80 p-4 space-y-3">
              <div className="flex items-center gap-1.5">
                {(["USD", "USDT", "EUR"] as const).map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setCurrency(code)}
                      className={`relative z-10 min-h-[32px] flex-1 rounded-md px-2 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        active ? "text-slate-950 font-semibold" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="currencyPillTab"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 -z-10 rounded-md bg-cyan-400"
                        />
                      )}
                      {code}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currency}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="flex items-baseline justify-between border-t border-cyan-500/15 pt-3"
                >
                  <div>
                    <div className="text-xs text-slate-400">{activeRate.label}</div>
                    <div className="font-mono text-sm text-slate-200 tabular-nums">
                      {activeRate.sampleAmount} {currency}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-cyan-300/90">Equivalencia</div>
                    <div className="font-mono text-lg font-semibold text-cyan-300 tabular-nums">
                      {convertedBs} Bs
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 4 (Wide): Dry IA Personality & Tactical Outing Planner */}
        <SpotlightCard delay={0.18} className="md:col-span-7 p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 tabular-nums">04</span>
                <div className="flex items-center gap-2 text-cyan-400">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                IA aplicada con personalidad para cuadrar salidas y trazar rutas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Dry IA entiende tu contexto local para recomendarte sitios, coordinar
                planes con amigos y familia dentro de un entorno cifrado y personalizable,
                y enviar la ruta elegida directamente al mapa táctico.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-cyan-500/15 pt-5 sm:grid-cols-3">
              <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/70 p-3.5">
                <div className="text-xs text-cyan-300">Paso 01</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Pide sitios o comida al Orbe
                </div>
              </div>
              <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/70 p-3.5">
                <div className="text-xs text-cyan-300">Paso 02</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Comparte el plan en el chat
                </div>
              </div>
              <div className="rounded-xl border border-cyan-500/15 bg-[#03060A]/70 p-3.5">
                <div className="text-xs text-cyan-300">Paso 03</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Traza la ruta táctica por voz
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
