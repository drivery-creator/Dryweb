import { Smartphone } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type MouseEvent } from "react";

interface PhoneShowcaseProps {
  src: string;
  alt: string;
  priority?: boolean;
  interactiveTilt?: boolean;
  className?: string;
}

export function PhoneShowcase({
  src,
  alt,
  priority = false,
  interactiveTilt = false,
  className = "",
}: PhoneShowcaseProps) {
  const [hasError, setHasError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 220,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 26,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1100 }}
      className={`relative mx-auto w-full max-w-[270px] sm:max-w-[295px] ${className}`}
    >
      {/* Subtle cyan ambient edge behind device */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-cyan-500/14 blur-2xl"
      />

      <motion.div
        style={interactiveTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative overflow-hidden rounded-[2.25rem] border border-cyan-400/30 bg-gradient-to-b from-[#0E1824] to-[#04070B] p-2 shadow-[0_28px_70px_-15px_rgba(6,182,212,0.28)]"
      >
        {/* Top glass specular highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
        />

        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.75rem] bg-[#03060A]">
          {!hasError ? (
            <img
              src={src}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-cyan-950/40 to-[#03060A] p-6 text-center">
              <Smartphone className="h-8 w-8 text-cyan-400" />
              <p className="text-xs text-slate-300">{alt}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
