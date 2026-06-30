import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import type { ServicePillar } from "./types";

const ServicePillarsSection = ({
  pillars,
  tagline,
}: {
  pillars: ServicePillar[];
  tagline: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001,
  });

  const taglineOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const taglineY = useTransform(smoothProgress, [0, 0.15], [0, -300]);
  const labelTop = useTransform(smoothProgress, [0, 0.15], ["50%", "2.5rem"]);

  return (
    <section ref={containerRef} className="relative h-[600svh] bg-[#F8F7F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F8F7F4]">
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-6 md:px-12">
          <motion.span
            style={{ top: labelTop }}
            className="absolute left-1/2 -translate-x-1/2 font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 origin-center"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="font-display text-[6vw] md:text-[4vw] lg:text-[3vw] uppercase tracking-tighter text-neutral-900 leading-[1.1] text-center max-w-4xl"
          >
            {tagline}
          </motion.h2>
        </div>

        <div className="absolute inset-0 z-10">
          {pillars.map((pillar, i) => (
            <PillarItem
              key={i}
              pillar={pillar}
              index={i}
              total={pillars.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-200 z-30">
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="h-full bg-neutral-900 origin-top"
          />
        </div>
      </div>
    </section>
  );
};

const PillarItem = ({
  pillar,
  index,
  total,
  smoothProgress,
}: {
  pillar: ServicePillar;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) => {
  const pillarOffset = 0.15;
  const pillarSpan = (1 - pillarOffset) / total;
  const rangeStart = pillarOffset + index * pillarSpan;
  const rangeEnd = pillarOffset + (index + 1) * pillarSpan;

  const opacity = useTransform(
    smoothProgress,
    [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(smoothProgress, [rangeStart, rangeEnd], [60, -60]);

  const lineScale = useTransform(smoothProgress, [rangeStart, rangeEnd], [0, 1]);

  const imageScale = useTransform(
    smoothProgress,
    [rangeStart, rangeEnd],
    [1.15, 1],
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <div className="absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <img
            src={pillar.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F4] via-[#F8F7F4]/70 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center px-6 md:px-20 max-w-3xl">
        <div>
          <span className="font-display text-[12vw] md:text-[7vw] lg:text-[5vw] font-bold text-black/[0.06] leading-none tracking-tighter select-none block mb-4">
            {pillar.number}
          </span>
          <h3 className="font-display text-[6vw] md:text-[3.5vw] lg:text-[2.8vw] uppercase tracking-tighter text-neutral-900 leading-none mb-6">
            {pillar.title}
          </h3>
          <p className="font-sans text-sm md:text-base text-neutral-500 leading-relaxed max-w-xl">
            {pillar.description}
          </p>
        </div>
      </div>

      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute right-0 top-0 h-full w-[3px] bg-neutral-900 origin-top z-20"
      />
    </motion.div>
  );
};

export default ServicePillarsSection;
