import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "ARCHITECTURAL DESIGN",
    desc: "Shaping spaces that balance form, function, and atmosphere.",
    image: "/assets/images/Architectural Design.jpg",
  },
  {
    num: "02",
    title: "LUXURY INTERIORS",
    desc: "Crafting interiors that feel personal, intentional, and enduring.",
    image: "/assets/images/luxury-interior-design.png",
  },
  {
    num: "03",
    title: "3D VISUALIZATION",
    desc: "Bringing unbuilt spaces to life with cinematic precision.",
    image: "/assets/images/3d-architectural-visualization.png",
  },
  {
    num: "04",
    title: "VIRTUAL REALITY",
    desc: "Immersive experiences that let you step inside the design before it exists.",
    image: "/assets/images/architectural-virtual-reality-services.png",
  },
];

const AboutServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 0.5,
    restDelta: 0.0001,
  });

  const labelOpacity = useTransform(smoothProgress, [0, 0.06], [0, 1]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250svh] md:h-[450svh] bg-black z-40"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* WHAT WE DO label */}
        <motion.span
          style={{ opacity: labelOpacity }}
          className="absolute top-[12vh] font-sans text-xs md:text-sm tracking-[0.35em] text-white/50 uppercase z-30"
        >
          What We Do
        </motion.span>

        {SERVICES.map((s, i) => {
          const rangeStart = i / SERVICES.length;
          const rangeEnd = (i + 1) / SERVICES.length;
          const mid = (rangeStart + rangeEnd) / 2;

          const opacity = useTransform(
            smoothProgress,
            [rangeStart, rangeStart + 0.05, mid, rangeEnd - 0.04, rangeEnd],
            [0, 1, 1, 1, 0],
          );
          const y = useTransform(
            smoothProgress,
            [rangeStart, rangeEnd],
            [60, -60],
          );
          const scale = useTransform(
            smoothProgress,
            [rangeStart, rangeEnd],
            [0.95, 1.05],
          );
          const numOpacity = useTransform(
            smoothProgress,
            [rangeStart, rangeStart + 0.05],
            [0, 0.08],
          );
          const imageScale = useTransform(
            smoothProgress,
            [rangeStart, rangeEnd],
            [1.1, 1],
          );

          return (
            <motion.div
              key={s.num}
              style={{ opacity, y, scale }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8"
            >
              {/* Background image */}
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={s.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
                <motion.div
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [rangeStart, rangeStart + 0.1],
                      [0, 0.3],
                    ),
                  }}
                  className="absolute inset-0 bg-black pointer-events-none"
                />
              </motion.div>

              {/* Large transparent number */}
              <motion.span
                style={{ opacity: numOpacity }}
                className="font-display text-[35vw] md:text-[25vw] leading-none font-bold text-white/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                {s.num}
              </motion.span>

              {/* Service title */}
              <h2 className="relative z-20 font-display text-[8vw] md:text-[6vw] lg:text-[5vw] uppercase tracking-tighter text-white leading-none mb-6 text-center">
                {s.title}
              </h2>

              {/* Description */}
              <p className="relative z-20 font-serif italic text-lg md:text-xl text-white/60 text-center max-w-lg leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          );
        })}

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 z-20">
          <div className="h-[1px] bg-white/20 w-full">
            <motion.div
              style={{ width: progressWidth }}
              className="h-[1px] bg-white"
            />
          </div>
          <div className="flex justify-between mt-2">
            {SERVICES.map((s) => (
              <span
                key={s.num}
                className="font-sans text-[9px] 2xl:text-xs tracking-[0.3em] uppercase text-white/40"
              >
                {s.num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
