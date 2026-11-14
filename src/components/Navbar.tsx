import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  onJoinWaitlist: () => void;
}

const NAV_LINKS = [
  { href: "#capturas", label: "Capturas" },
  { href: "#ecosistema", label: "Ecosistema" },
  { href: "#voz-orbe", label: "Orbe IA" },
  { href: "#lista-beta", label: "Lista Beta" },
];

export function Navbar({ onJoinWaitlist }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="glass-header sticky top-0 z-40 w-full">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single clean wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-wider text-white whitespace-nowrap shrink-0 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
        >
          DRIVERY OS
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan-400 transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onJoinWaitlist}
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060A] cursor-pointer"
          >
            Unirse a la Beta
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-500/20 bg-white/[0.03] text-slate-200 md:hidden transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[1.5px] w-full origin-left bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-400"
      />

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="border-t border-cyan-500/15 bg-[#03060A]/95 backdrop-blur-xl md:hidden">
          <nav
            aria-label="Navegación móvil"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-200 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onJoinWaitlist();
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 cursor-pointer"
            >
              Unirse a la Beta
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
