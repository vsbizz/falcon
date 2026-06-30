import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react"; // Assuming you're using lucide-react based on the icon

const HoldingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- UPDATED VIDEO TRANSFORMS ---
  // [0.0 - 0.3]: Horizontal expansion
  // [0.3 - 0.6]: Vertical expansion

  const videoWidth = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["60vw", "100vw", "100vw"],
  );
  const videoHeight = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["55vh", "55vh", "100vh"],
  );

  // X moves during horizontal expansion, Y moves during vertical expansion
  const videoX = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["10%", "0%", "0%"],
  );
  const videoY = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["20%", "20%", "0%"],
  );

  // Scale smoothly across both phases
  const videoScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    [0.85, 0.95, 1],
  );

  // Border radius smooths out gradually
  const videoBorderRadius = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["12px", "6px", "0px"],
  );

  // Text transforms
  const titleOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -80]);

  const CharacterReveal = ({
    text,
    delay = 0,
    className = "",
  }: {
    text: string;
    delay?: number;
    className?: string;
  }) => {
    const words = text.split(" ");
    return (
      <div className={`flex flex-wrap ${className}`}>
        {words.map((word, wi) => {
          const chars = wi < words.length - 1 ? word + " " : word;
          return (
            <span key={wi} className="whitespace-nowrap">
              {chars.split("").map((char, i) => (
                <span key={i} className="relative inline-block">
                  <motion.span
                    initial={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    animate={{
                      x: "0%",
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.1,
                      delay: delay + i * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ─── Mobile layout ─── */}
      <section className="md:hidden relative min-h-screen bg-[#f8f7f5] flex flex-col">
        <div className="px-6 pt-[20vh] z-20">
          <div className="flex flex-col uppercase font-sans font-medium text-[12vw] leading-[0.85] tracking-tighter text-neutral-900">
            <CharacterReveal text="ARCHITECTURAL SOUL" delay={0.2} />
          </div>
          <div className="flex items-center text-[10vw] leading-none tracking-tight text-neutral-900 -mt-1">
            <CharacterReveal
              text="& VISUAL POETRY"
              delay={0.45}
              className="font-serif italic"
            />
          </div>
        </div>

        <div className="px-6 mt-10 mb-6">
          <div className="relative w-full aspect-video overflow-hidden shadow-2xl">
            <video
              src="https://felixnieto.b-cdn.net/projects/Loop_web_hero_2025.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pb-6">
          <span className="font-sans text-[13px] tracking-[0.3em] uppercase text-neutral-400">
            Scroll
          </span>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 4.4,
              ease: "easeInOut",
            }}
            className="mt-2"
          >
            <svg width="16" height="20" viewBox="0 0 12 16" fill="none" className="text-neutral-400">
              <line x1="6" y1="0" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 7L6 11L10 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="px-6 pb-16 mt-8"
        >
          <p className="font-sans text-[13px] leading-relaxed text-neutral-800 uppercase tracking-wider font-medium text-center max-w-[85vw] mx-auto">
            Transforming structural blueprints into sensory experiences. We
            capture the unseen atmosphere of a project, defining space through
            the lens of cinematic precision and technical mastery.
          </p>
        </motion.div>
      </section>

      {/* ─── Desktop layout ─── */}
      <section ref={containerRef} className="hidden md:block relative h-[300vh] bg-[#f8f7f5]">
        <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

          <div className="relative flex-1 flex flex-col pt-[12vh] md:pt-[15vh] px-6 md:px-12">
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="px-8 md:px-16 z-20 pt-14"
            >
              <div className="flex flex-col uppercase font-sans font-medium text-[8vw] lg:text-[5.5vw] xl:text-[8vw] leading-[0.85] tracking-tighter text-neutral-900">
                <CharacterReveal text="ARCHITECTURAL SOUL" delay={0.2} />
              </div>
              <div className="flex items-center text-[6.5vw] md:text-[7vw] leading-none tracking-tight text-neutral-900 -mt-1 lg:-mt-4 ml-[8vw] md:ml-[15vw]">
                <CharacterReveal
                  text="& VISUAL POETRY"
                  delay={0.45}
                  className="font-serif italic"
                />
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: titleOpacity }}
              className="relative md:absolute md:left-12 md:top-[65%] z-20 mt-16 md:mt-0 max-w-[280px] md:max-w-[400px] overflow-hidden"
            >
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-sans text-[13px] md:text-sm 2xl:text-base leading-relaxed text-neutral-800 uppercase tracking-wider font-medium"
              >
                Transforming structural blueprints into sensory experiences. We
                capture the unseen atmosphere of a project, defining space through
                the lens of cinematic precision and technical mastery.
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-0 flex items-end justify-end pointer-events-none z-10">
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 100%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{
                duration: 1.4,
                delay: 2.2,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                width: videoWidth,
                height: videoHeight,
                scale: videoScale,
                x: videoX,
                y: videoY,
              }}
              className="relative overflow-hidden shadow-2xl pointer-events-auto origin-bottom-right m-0"
            >
              <video
                src="https://felixnieto.b-cdn.net/projects/Loop_web_hero_2025.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.4], [0.2, 0]),
                }}
                className="absolute inset-0 bg-black/20 pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HoldingSection;
