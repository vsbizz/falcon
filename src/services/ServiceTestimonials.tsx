import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import type { ServiceTestimonial } from "./types";

const ServiceTestimonialsSection = ({
  testimonials,
  backgroundImage,
}: {
  testimonials: ServiceTestimonial[];
  backgroundImage: string;
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

  return (
    <section ref={containerRef} className="relative h-[300svh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] font-bold uppercase text-white drop-shadow-lg">
            Testimonials
          </span>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-5xl mx-auto">
            {testimonials.map((item, i) => (
              <TestimonialItem
                key={i}
                item={item}
                index={i}
                total={testimonials.length}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {testimonials.map((_, i) => (
            <DotItem
              key={i}
              index={i}
              total={testimonials.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialItem = ({
  item,
  index,
  total,
  smoothProgress,
}: {
  item: ServiceTestimonial;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) => {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const opacity = useTransform(
    smoothProgress,
    [rangeStart, rangeStart + 0.08, rangeEnd - 0.08, rangeEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(smoothProgress, [rangeStart, rangeEnd], [40, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center max-w-3xl mx-auto px-4">
        <span className="font-serif italic text-[8vw] md:text-[4vw] lg:text-[3vw] text-white/10 leading-none select-none">
          &ldquo;
        </span>
        <p className="font-serif italic text-[max(14px,4vw)] md:text-[2.2vw] lg:text-[1.6vw] text-white/90 leading-[1.4] mb-8 -mt-4">
          {item.quote}
        </p>
        <div>
          <p className="font-display text-sm md:text-base uppercase tracking-wider text-white font-bold">
            {item.author}
          </p>
          <p className="font-sans text-[10px] 2xl:text-xs tracking-[0.2em] uppercase text-white/40 mt-1">
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const DotItem = ({
  index,
  total,
  smoothProgress,
}: {
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) => {
  const dotProgress = useTransform(
    smoothProgress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  const dotScale = useTransform(dotProgress, [0, 0.5, 1], [0.6, 1.4, 0.6]);

  return (
    <motion.div
      style={{ scale: dotScale }}
      className="w-2 h-2 rounded-full bg-white/30"
    >
      <motion.div
        style={{ scaleX: dotProgress }}
        className="h-full w-full bg-white origin-left rounded-full"
      />
    </motion.div>
  );
};

export default ServiceTestimonialsSection;
