import { AlertCircle, Check, Copy, Send, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { SpotlightCard } from "./SpotlightCard";

interface WaitlistSectionProps {
  preselectedFocus?: string;
}

type PlatformOption = "Android" | "iOS" | "Ambos";

interface RegistrationResult {
  position: number;
  referralCode: string;
  platform: PlatformOption;
  alreadyRegistered: boolean;
  message: string;
}

const FOCUS_OPTIONS = [
  "Ecosistema completo",
  "Chat Mesh P2P offline",
  "Mapa táctico y rutas",
  "Calculadora BCV / USDT",
  "Lienzo y Orbe de voz",
];

export function WaitlistSection({ preselectedFocus }: WaitlistSectionProps) {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<PlatformOption>("Android");
  const [focus, setFocus] = useState<string>("Ecosistema completo");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [totalRegistered, setTotalRegistered] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (preselectedFocus) {
      setFocus(preselectedFocus);
    }
  }, [preselectedFocus]);

  useEffect(() => {
    fetch("/api/waitlist/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.totalRegistered === "number") {
          setTotalRegistered(data.totalRegistered);
        }
      })
      .catch(() => {
        // Ignore silent telemetry fetch failure
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(cleaned)) {
      setStatus("error");
      setErrorMessage("Ingresa un correo electrónico válido para recibir tu invitación.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleaned, platform, focus }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setErrorMessage(payload.error || "No se pudo completar el registro. Inténtalo de nuevo.");
        return;
      }

      setResult({
        position: payload.position,
        referralCode: payload.referralCode,
        platform: payload.platform,
        alreadyRegistered: Boolean(payload.alreadyRegistered),
        message: payload.message,
      });
      setStatus("success");
      if (!payload.alreadyRegistered) {
        setTotalRegistered((prev) => (typeof prev === "number" ? prev + 1 : payload.position));
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de red al conectar con el servidor. Verifica tu conexión.");
    }
  };

  const getShareUrl = () => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "";
    return result?.referralCode ? `${base}?ref=${result.referralCode}` : base;
  };

  const shareText =
    "Me acabo de registrar en la beta exclusiva de DRIVERY OS: ecosistema Telco 4.0 con chat Mesh offline, mapa táctico por voz y calculadora multi-divisa.";

  const handleCopyInvite = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "DRIVERY OS – Lista Beta Exclusiva",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled native share
      }
    } else {
      await handleCopyInvite();
    }
  };

  const shareEncodedUrl = encodeURIComponent(getShareUrl());
  const shareEncodedText = encodeURIComponent(shareText);

  return (
    <section
      id="lista-beta"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <SpotlightCard className="rounded-3xl p-6 sm:p-10 lg:p-14">
        {/* Subtle top cyan radial accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-3/4 -translate-x-1/2 rounded-full bg-cyan-500/14 blur-3xl"
        />

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left column: Value proposition + Social Share integration */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Reserva tu acceso anticipado a la Beta de DRIVERY OS
            </h2>

            <p className="max-w-lg text-base leading-relaxed text-slate-300">
              Estamos liberando invitaciones por lotes para probar la telemetría Telco 4.0,
              el canal familiar Mesh P2P y el Orbe de voz antes del lanzamiento público.
            </p>

            {typeof totalRegistered === "number" && totalRegistered > 0 && (
              <p className="font-mono text-xs text-cyan-300 tabular-nums">
                {totalRegistered} personas ya aseguraron su turno en esta cohorte Beta
              </p>
            )}

            {/* Social integration & launch amplification */}
            <div className="border-t border-cyan-500/15 pt-6">
              <h3 className="text-sm font-semibold text-white">
                Comparte el pre-lanzamiento y escala tu prioridad
              </h3>
              <p className="mt-1.5 text-sm text-slate-400">
                Difunde tu enlace de invitación en redes sociales o sigue las actualizaciones
                de compilación en nuestros canales oficiales.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://x.com/intent/tweet?text=${shareEncodedText}&url=${shareEncodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-cyan-500/20 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Compartir en X</span>
                </a>

                <a
                  href={`https://wa.me/?text=${shareEncodedText}%20${shareEncodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-cyan-500/20 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Enviar por WhatsApp</span>
                </a>

                <a
                  href={`https://t.me/share/url?url=${shareEncodedUrl}&text=${shareEncodedText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-cyan-500/20 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Compartir en Telegram</span>
                </a>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3.5 py-2 text-xs font-medium text-cyan-200 whitespace-nowrap transition-all hover:-translate-y-0.5 hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Invitar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right column: Waitlist Capture Form or Confirmation State */}
          <div className="lg:col-span-6">
            {status === "success" && result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="rounded-2xl border border-cyan-400/40 bg-cyan-950/25 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 text-cyan-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 border border-cyan-400/30">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {result.alreadyRegistered
                        ? "Ya formas parte de la lista"
                        : "Plaza Beta confirmada"}
                    </h3>
                    <p className="text-sm text-slate-300">{result.message}</p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-cyan-500/20 py-4">
                  <div>
                    <dt className="text-xs text-slate-400">Turno asignado</dt>
                    <dd className="mt-1 font-mono text-2xl font-semibold text-cyan-300 tabular-nums">
                      #{result.position}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-400">Código de referido</dt>
                    <dd className="mt-1 font-mono text-lg font-semibold text-white tabular-nums">
                      {result.referralCode}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCopyInvite}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 whitespace-nowrap transition-colors hover:bg-cyan-300 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Enlace copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copiar enlace de invitación</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                      setResult(null);
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-cyan-500/25 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 whitespace-nowrap transition-colors hover:border-cyan-400/50 hover:text-white cursor-pointer"
                  >
                    Registrar otro correo
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-2xl border border-cyan-500/15 bg-[#03060A]/85 p-6 sm:p-8"
              >
                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="nombre@correo.com"
                    className="mt-2 block min-h-[46px] w-full rounded-xl border border-cyan-500/25 bg-[#04070B] px-4 py-3 text-base text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/25"
                  />
                </div>

                <div>
                  <span className="block text-sm font-medium text-slate-200">
                    Dispositivo principal
                  </span>
                  <div
                    role="group"
                    aria-label="Seleccionar plataforma"
                    className="relative mt-2 grid grid-cols-3 gap-1.5 rounded-xl border border-cyan-500/15 bg-[#04070B] p-1"
                  >
                    {(["Android", "iOS", "Ambos"] as const).map((option) => {
                      const active = platform === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPlatform(option)}
                          className={`relative z-10 min-h-[40px] rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            active
                              ? "text-slate-950 font-semibold"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="platformSelectorTab"
                              transition={{ type: "spring", stiffness: 360, damping: 30 }}
                              className="absolute inset-0 -z-10 rounded-lg bg-cyan-400"
                            />
                          )}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="waitlist-focus"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Función prioritaria para ti
                  </label>
                  <select
                    id="waitlist-focus"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    className="mt-2 block min-h-[46px] w-full rounded-xl border border-cyan-500/25 bg-[#04070B] px-4 py-2.5 text-sm text-white transition-colors focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/25"
                  >
                    {FOCUS_OPTIONS.map((item) => (
                      <option key={item} value={item} className="bg-[#04070B] text-white">
                        {item}
                      </option>
                    ))}
                    {!FOCUS_OPTIONS.includes(focus) && (
                      <option value={focus} className="bg-[#04070B] text-white">
                        {focus}
                      </option>
                    )}
                  </select>
                </div>

                {status === "error" && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-950/30 p-3 text-sm text-rose-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 whitespace-nowrap transition-all duration-150 hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.3)] active:scale-[0.99] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060A] cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {status === "loading" ? "Registrando solicitud..." : "Solicitar acceso a la Beta"}
                  </span>
                </button>

                <p className="text-xs leading-relaxed text-slate-400">
                  Sin spam ni correos comerciales. Solo recibirás tu enlace de descarga
                  cuando se habilite tu acceso Beta.
                </p>
              </form>
            )}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
