import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";

export function OrbitalAtmosphere() {
  const [imageFailed, setImageFailed] = useState(false);
  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 1400], [0, -70]);
  const backdropScale = useTransform(scrollY, [0, 1400], [1.04, 1.12]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#03060A]"
    >
      {!imageFailed && (
        <motion.div
          style={{ y: backdropY, scale: backdropScale }}
          className="absolute inset-0 h-[112%] w-full will-change-transform"
        >
          <img
            src="/assets/aistudio/Picsart_26-11-14_18-35-45-317_b89c2049.png"
            alt="Horizonte orbital terrestre desde el espacio"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-center opacity-85"
          />
        </motion.div>
      )}

      {/* Subtle cyan atmospheric tint & measured contrast scrim for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3, 6, 10, 0.58) 0%, rgba(3, 6, 10, 0.28) 38%, rgba(3, 6, 10, 0.72) 78%, rgba(3, 6, 10, 0.94) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 45%, rgba(6, 182, 212, 0.08) 0%, rgba(3, 6, 10, 0.55) 75%, rgba(3, 6, 10, 0.88) 100%)",
        }}
      />
    </div>
  );
}
