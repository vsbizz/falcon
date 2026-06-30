import { useRef, type RefObject } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import type { ServiceProject } from "./types";

const ServiceWorksSection = ({ projects }: { projects: ServiceProject[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative h-[420svh] bg-[#F8F7F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F8F7F4]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30">
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] font-bold uppercase text-neutral-700">
            Featured Projects
          </span>
        </div>

        {projects.map((project, i) => (
          <WorkItem
            key={i}
            project={project}
            index={i}
            total={projects.length}
            smoothProgress={smoothProgress}
          />
        ))}

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {projects.map((_, i) => (
            <DotItem
              key={i}
              index={i}
              total={projects.length}
              smoothProgress={smoothProgress}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkItem = ({
  project,
  index,
  total,
  smoothProgress,
}: {
  project: ServiceProject;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) => {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const y = useTransform(
    smoothProgress,
    [rangeStart, rangeEnd],
    index === total - 1 ? ["80%", "0%"] : ["80%", "-80%"],
  );

  const scale = useTransform(
    smoothProgress,
    [rangeStart, rangeStart + 0.25, rangeEnd - 0.25, rangeEnd],
    [0.88, 1, 1, 0.88],
  );

  const opacity = useTransform(
    smoothProgress,
    [rangeStart, rangeStart + 0.2, rangeEnd - 0.2, rangeEnd],
    [0.3, 1, 1, 0.3],
  );

  const rotateX = useTransform(
    smoothProgress,
    [rangeStart, rangeStart + 0.3, rangeEnd - 0.3, rangeEnd],
    [6, 0, 0, -6],
  );

  return (
    <motion.div
      style={{ y, scale, opacity, rotateX, perspective: "1000px" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-[85vw] h-[60vh] md:w-[80vw] md:h-[65vh] overflow-hidden shadow-xl">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 z-10">
          <span className="font-sans text-eyebrow-sm uppercase text-white/50 mb-2 block">
            {project.subtitle}
          </span>
          <h3 className="font-display text-[5vw] md:text-[3vw] uppercase tracking-tighter text-white leading-none">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const DotItem = ({
  index,
  total,
  smoothProgress,
  containerRef,
}: {
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const progress = useTransform(smoothProgress, [rangeStart, rangeEnd], [0, 1]);

  const handleClick = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollable = container.offsetHeight - window.innerHeight;
    const target = container.offsetTop + (index / total) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="w-[3px] h-8 bg-neutral-300 relative overflow-hidden rounded-full cursor-pointer"
      aria-label={`Go to project ${index + 1}`}
    >
      <motion.div
        style={{ scaleY: progress }}
        className="absolute inset-0 bg-neutral-900 origin-top rounded-full"
      />
    </button>
  );
};

export default ServiceWorksSection;
