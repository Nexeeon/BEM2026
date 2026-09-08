import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollHeroProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollHero({ children, className = "", id = "hero" }: ScrollHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.4, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <motion.section
      id={id}
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  amount?: number;
  delay?: number;
}

export function ScrollSection({
  children,
  className = "",
  id,
  amount = 0.15,
  delay = 0,
}: ScrollSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  scale?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 35,
  duration = 0.6,
  scale = 1,
  amount = 0.2,
}: ScrollRevealProps) {
  let initialY = 0;
  let initialX = 0;

  if (direction === "up") initialY = distance;
  if (direction === "down") initialY = -distance;
  if (direction === "left") initialX = distance;
  if (direction === "right") initialX = -distance;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        x: initialX,
        scale: scale !== 1 ? scale : undefined,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, amount }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number;
}

export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.08,
  amount = 0.15,
}: ScrollStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
