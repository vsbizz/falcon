import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Fragment {
  text: string;
  font: string;
  size: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startRotate: number;
  startScale: number;
  startBlur: number;
  range: [number, number];
  color: string;
}

const FRAGMENTS: Fragment[] = [
  {
    text: "ARCHITECTURE",
    font: "font-display font-bold",
    size: "text-[8vw] md:text-[6vw]",
    startX: -60,
    startY: -40,
    endX: 0,
    endY: -28,
    startRotate: -8,
    startScale: 1.6,
    startBlur: 0,
    range: [0, 0.4],
    color: "text-neutral-900",
  },
  {
    text: "is not about",
    font: "font-serif italic",
    size: "text-[4vw] md:text-[2.5vw]",
    startX: 50,
    startY: 30,
    endX: 0,
    endY: -8,
    startRotate: 6,
    startScale: 0.3,
    startBlur: 4,
    range: [0.1, 0.5],
    color: "text-neutral-500",
  },
  {
    text: "BUILDINGS",
    font: "font-display font-bold",
    size: "text-[8vw] md:text-[6vw]",
    startX: 50,
    startY: -40,
    endX: 0,
    endY: 8,
    startRotate: 6,
    startScale: 1.4,
    startBlur: 0,
    range: [0.2, 0.55],
    color: "text-neutral-900",
  },
  {
    text: "it is about",
    font: "font-serif italic",
    size: "text-[4vw] md:text-[2.5vw]",
    startX: -40,
    startY: 40,
    endX: 0,
    endY: 22,
    startRotate: -5,
    startScale: 0.4,
    startBlur: 6,
    range: [0.35, 0.65],
    color: "text-neutral-500",
  },
  {
    text: "FEELING",
    font: "font-serif italic",
    size: "text-[10vw] md:text-[7vw]",
    startX: 0,
    startY: 60,
    endX: 0,
    endY: 38,
    startRotate: 12,
    startScale: 0.2,
    startBlur: 10,
    range: [0.5, 0.8],
    color: "text-neutral-900",
  },
];

const AboutManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 28,
    mass: 0.5,
    restDelta: 0.0001,
  });

  const bgProgress = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250svh] md:h-[400svh] bg-[#F8F7F4] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#F8F7F4]">
        {/* PHILOSOPHY label */}
        <motion.span
          style={{
            opacity: useTransform(smoothProgress, [0, 0.06], [0, 1]),
          }}
          className="absolute top-[10vh] font-sans text-xs md:text-sm tracking-[0.35em] text-neutral-400 uppercase z-20"
        >
          Philosophy
        </motion.span>

        {/* Subtle background gradient that shifts */}
        <motion.div
          style={{ opacity: useTransform(bgProgress, [0, 0.5, 1], [0, 0.3, 0]) }}
          className="absolute inset-0 bg-radial from-[#adc9c6]/20 to-transparent pointer-events-none"
        />

        {FRAGMENTS.map((f, i) => {
          const x = useTransform(
            smoothProgress,
            f.range,
            [`${f.startX}vw`, `${f.endX}vw`],
          );
          const y = useTransform(
            smoothProgress,
            f.range,
            [`${f.startY}vh`, `${f.endY}vh`],
          );
          const rotate = useTransform(
            smoothProgress,
            f.range,
            [f.startRotate, 0],
          );
          const scale = useTransform(
            smoothProgress,
            f.range,
            [f.startScale, 1],
          );
          const opacity = useTransform(
            smoothProgress,
            [f.range[0], f.range[0] + 0.06, f.range[1] - 0.02, f.range[1]],
            [0, 1, 1, 1],
          );
          const blur = useTransform(
            smoothProgress,
            [f.range[0], f.range[0] + 0.08],
            [f.startBlur, 0],
          );

          return (
            <motion.span
              key={i}
              style={{
                x,
                y,
                rotate,
                scale,
                opacity,
                filter: useTransform(blur, (v) => `blur(${v}px)`),
              }}
              className={`absolute ${f.font} ${f.size} ${f.color} uppercase tracking-tighter leading-none whitespace-nowrap select-none`}
            >
              {f.text}
            </motion.span>
          );
        })}



        {/* Scroll progress bar */}
        <motion.div
          style={{
            width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          }}
          className="absolute bottom-0 left-0 h-[1px] bg-neutral-900"
        />
      </div>
    </section>
  );
};

export default AboutManifesto;
