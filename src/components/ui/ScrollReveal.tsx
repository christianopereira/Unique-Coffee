"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import type { AnimationType, AnimationSpeed } from "@/types/site-data";

const SPEED_MAP: Record<AnimationSpeed, number> = {
  fast: 0.4,
  normal: 0.7,
  slow: 1.2,
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  animationType?: AnimationType;
  speed?: AnimationSpeed;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  animationType,
  speed,
}: ScrollRevealProps) {
  // Se animationType="none", renderiza sem animação
  if (animationType === "none") {
    return <div className={className}>{children}</div>;
  }

  // Calcula o initial state baseado no tipo de animação
  const getInitial = () => {
    const type = animationType || directionToType(direction);
    switch (type) {
      case "fade-up": return { opacity: 0, y: 24 };
      case "fade-left": return { opacity: 0, x: -24 };
      case "fade-right": return { opacity: 0, x: 24 };
      case "fade-in": return { opacity: 0 };
      case "zoom-in": return { opacity: 0, scale: 0.92 };
      default: return { opacity: 0, y: 24 };
    }
  };

  const duration = SPEED_MAP[speed || "normal"];

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function directionToType(direction: string): AnimationType {
  switch (direction) {
    case "left": return "fade-left";
    case "right": return "fade-right";
    case "none": return "fade-in";
    default: return "fade-up";
  }
}
