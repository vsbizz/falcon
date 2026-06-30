import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const AboutPhilosophy = () => {
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

  const words = [
    {
      visible: "WE DON'T",
      hidden: "WE SIMPLY",
      isSerifVisible: false,
      isSerifHidden: true,
      range: [0.1, 0.4],
    },
    {
      visible: "BUILD",
      hidden: "DESIGN",
      isSerifVisible: false,
      isSerifHidden: true,
      range: [0.3, 0.6],
    },
    {
      visible: "STRUCTURES",
      hidden: "ATMOSPHERES",
      isSerifVisible: false,
      isSerifHidden: true,
      range: [0.5, 0.8],
    },
  ];

  const letterRevealStart = 0.65;
  const letterRevealOpacity = useTransform(
    smoothProgress,
    [letterRevealStart, letterRevealStart + 0.15],
    [0, 1],
  );
  const letterRevealY = useTransform(
    smoothProgress,
    [letterRevealStart, letterRevealStart + 0.15],
    [40, 0],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[250svh] bg-[#F8F7F4] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-40 bg-[#F8F7F4]">
        <div className="flex flex-col items-center text-center gap-4 md:gap-8 lg:gap-12 w-full max-w-7xl px-4">
          {words.map((word, i) => {
            const yVisible = useTransform(smoothProgress, word.range, [
              "0%",
              "-120%",
            ]);
            const yHidden = useTransform(smoothProgress, word.range, [
              "120%",
              "0%",
            ]);
            const opacityHidden = useTransform(
              smoothProgress,
              word.range,
              [0, 1],
            );
            const opacityVisible = useTransform(
              smoothProgress,
              word.range,
              [1, 0],
            );

            return (
              <div
                key={i}
                className="relative overflow-hidden h-[15vw] md:h-[12vw] lg:h-[10vw] flex items-center justify-center w-full"
              >
                <motion.span
                  style={{ y: yVisible, opacity: opacityVisible }}
                  className={`${
                    word.isSerifVisible ? "font-serif" : "font-display"
                  } text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.visible}
                </motion.span>
                <motion.span
                  style={{ y: yHidden, opacity: opacityHidden }}
                  className={`absolute h-full flex items-center justify-center inset-0 ${
                    word.isSerifHidden ? "font-serif italic" : "font-display"
                  } text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.hidden}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* Letter-reveal sentence at bottom */}
        <motion.p
          style={{ opacity: letterRevealOpacity, y: letterRevealY }}
          className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 font-serif italic text-lg md:text-2xl text-neutral-700 text-center max-w-2xl px-6"
        >
          We capture the unseen atmosphere of a project, defining space through
          the lens of cinematic precision and technical mastery.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutPhilosophy;
