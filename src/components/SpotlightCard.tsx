import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SpotlightCard({
  children,
  className = "",
  delay = 0,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
  };

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.14), transparent 72%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel group relative overflow-hidden rounded-2xl transition-[border-color,transform] duration-200 hover:border-cyan-400/35 ${className}`}
    >
      {/* Dynamic specular cyan glass reflection */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
