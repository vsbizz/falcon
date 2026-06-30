import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Félix brought clarity, initiative and reliability to a fast-paced, AI-driven competition. The project ended up winning.",
    author: "SANZPONT",
    category: "ARCHITECTURE FIRM",
  },
  {
    quote:
      "\"INSPIRE\" helped us understand our strengths and focus on what truly matters. Félix exceeded our expectations.",
    author: "NUA",
    category: "ARCHITECTURE FIRM",
  },
  {
    quote:
      "The whole experience felt warm, coherent and genuinely empathetic. Félix quickly understood the essence of my work.",
    author: "Romina Ross",
    category: "RO ARCHITECTURE",
  },
];

const AboutTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.5,
    restDelta: 0.0001,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[200svh] md:h-[300svh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image that shifts */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/back.webp"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* WHAT PEOPLE SAY label */}
        <motion.span
          style={{
            opacity: useTransform(smoothProgress, [0, 0.06], [0, 1]),
          }}
          className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-sans text-xs md:text-sm tracking-[0.35em] text-white/40 uppercase z-20"
        >
          What People Say
        </motion.span>

        {/* Animated overlay gradient */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-white/5 blur-3xl"
        />

        {TESTIMONIALS.map((t, i) => {
          const rangeStart = i / TESTIMONIALS.length;
          const rangeEnd = (i + 1) / TESTIMONIALS.length;
          const mid = (rangeStart + rangeEnd) / 2;

          const opacity = useTransform(
            smoothProgress,
            [rangeStart, rangeStart + 0.06, mid, rangeEnd - 0.04, rangeEnd],
            [0, 1, 1, 1, 0],
          );
          const y = useTransform(
            smoothProgress,
            [rangeStart, rangeEnd],
            [60, -60],
          );

          const quoteChars = t.quote.split("");
          const charStart = rangeStart + 0.02;
          const charEnd = mid;

          return (
            <motion.div
              key={i}
              style={{ opacity, y }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16"
            >
              {/* Large opening quote mark */}
              <span className="font-serif italic text-[20vw] md:text-[15vw] leading-none text-white/10 select-none absolute top-[8%] left-[5%]">
                "
              </span>

              {/* Quote text with character stagger */}
              <div className="relative z-10 max-w-4xl text-center mb-8 flex flex-wrap justify-center">
                {quoteChars.map((char, ci) => {
                  const charOpacity = useTransform(
                    smoothProgress,
                    [
                      charStart + (ci / quoteChars.length) * (charEnd - charStart),
                      charStart + ((ci + 1) / quoteChars.length) * (charEnd - charStart),
                    ],
                    [0, 1],
                  );
                  return (
                    <motion.span
                      key={ci}
                      style={{ opacity: charOpacity }}
                       className="font-serif italic text-[max(20px,5.5vw)] md:text-[3.5vw] leading-[1.2] text-white/90 whitespace-pre"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>

              {/* Author */}
              <motion.div
                className="relative z-10 text-center"
                style={{
                  opacity: useTransform(
                    smoothProgress,
                    [mid - 0.02, mid],
                    [0, 1],
                  ),
                }}
              >
                <p className="font-sans text-[14px] md:text-sm 2xl:text-base tracking-[0.35em] text-white/50 uppercase mb-1">
                  {t.author}
                </p>
                <p className="font-sans text-[12px] md:text-xs 2xl:text-sm tracking-[0.3em] text-white/30 uppercase">
                  {t.category}
                </p>
              </motion.div>

              {/* Progress dots */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {TESTIMONIALS.map((_, di) => {
                  const dotOpacity = useTransform(
                    smoothProgress,
                    [
                      di / TESTIMONIALS.length,
                      (di + 0.5) / TESTIMONIALS.length,
                    ],
                    [0.3, 1],
                  );
                  const dotWidth = useTransform(
                    smoothProgress,
                    [
                      di / TESTIMONIALS.length,
                      (di + 0.3) / TESTIMONIALS.length,
                    ],
                    ["6px", "24px"],
                  );
                  return (
                    <motion.div
                      key={di}
                      style={{ opacity: dotOpacity, width: dotWidth }}
                      className="h-[2px] bg-white"
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutTestimonials;
