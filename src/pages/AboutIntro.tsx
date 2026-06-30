import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const AboutIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  const labelOpacity = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const textY = useTransform(smoothProgress, [0.15, 0.4], [60, 0]);
  const textOpacity = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);
  const bodyOpacity = useTransform(smoothProgress, [0.45, 0.7], [0, 1]);
  const bodyY = useTransform(smoothProgress, [0.45, 0.7], [40, 0]);
  return (
    <section
      ref={containerRef}
      className="relative h-[150svh] md:h-[250svh] bg-[#F8F7F4] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 md:px-16 w-full">
          <motion.span
            style={{ opacity: labelOpacity }}
            className="font-sans text-xs md:text-sm tracking-[0.35em] text-neutral-400 uppercase block mb-12"
          >
            Studio
          </motion.span>

          <motion.p
            style={{ y: textY, opacity: textOpacity }}
            className="font-serif italic text-[max(16px,4.5vw)] md:text-[3.5vw] lg:text-[3vw] leading-[1.3] text-neutral-900 max-w-4xl mb-10"
          >
            We are a design studio that transforms architectural blueprints into
            sensory experiences. Every project is a narrative, we capture the
            unseen atmosphere, define space through cinematic precision, and
            craft visual identities for the world's most ambitious architecture
            and design practices.
          </motion.p>

          <motion.div
            style={{ y: bodyY, opacity: bodyOpacity }}
            className="border-t border-neutral-200 pt-8"
          >
            <p className="font-sans text-[12px] md:text-sm 2xl:text-base leading-relaxed text-neutral-600 uppercase tracking-wider max-w-2xl">
              Based in Dubai with a global reach, we work with award winning
              architects, developers, and design studios to bring unbuilt spaces
              to life with uncompromising quality and an eye for the
              extraordinary.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
