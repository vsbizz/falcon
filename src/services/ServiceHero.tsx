import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ServiceHero } from "./types";

const ServiceHeroSection = ({ hero }: { hero: ServiceHero }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const revealProgress = useTransform(smoothProgress, [0, 0.6], [0, 1]);

  const clipPath = useTransform(
    revealProgress,
    [0, 0.5, 1],
    [
      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  const titleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.2], [0, -60]);
  const imageScale = useTransform(smoothProgress, [0, 0.6], [1.1, 1]);
  const persistentOpacity = useTransform(smoothProgress, [0.2, 0.35], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200svh] bg-[#F8F7F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            style={{ clipPath, scale: imageScale }}
            className="absolute inset-0"
          >
            <img
              src={hero.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-black/50 mb-6">
            Service
          </span>
          <h1 className="font-display text-[14vw] md:text-[9vw] lg:text-[6.5vw] uppercase tracking-tighter text-neutral-900/90 leading-none text-center">
            {hero.titleLine1}
            <span className="hidden md:inline">&nbsp;</span>
            <br className="md:hidden" />
            {hero.titleLine2}
          </h1>
          <p className="font-sans text-sm md:text-base tracking-[0.2em] text-black/90 mt-6 max-w-md text-center leading-relaxed uppercase">
            {hero.tagline}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: persistentOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          <h2 className="font-display text-[10vw] md:text-[6vw] lg:text-[4.5vw] uppercase tracking-tighter text-white/90 leading-none text-center max-w-4xl font-bold">
            {hero.persistentLine1}
            <br />
            {hero.persistentLine2}
          </h2>
          <p className="font-sans text-sm md:text-base tracking-[0.2em] text-white/70 mt-6 max-w-md text-center leading-relaxed uppercase">
            {hero.persistentTagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
