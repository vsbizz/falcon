import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We immerse ourselves in your vision, site, and aspirations — uncovering the narrative that will define every decision.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "Ideas take form through iterative design, translating ambition into a coherent architectural language.",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Every detail is refined — materials, light, proportion — until the design resonates with precision and feeling.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We bring the vision to completion with meticulous execution, ensuring the built reality matches the imagined one.",
  },
];

const ServicesApproach = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const step = Math.min(
      Math.floor((latest / 0.85) * STEPS.length),
      STEPS.length - 1,
    );
    if (step !== activeStep) setActiveStep(step);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[300svh] bg-[#F8F7F4] z-20"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-[#F8F7F4]">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 w-full">
          <div className="grid grid-cols-12 gap-8 md:gap-16">
            {/* Left: Title + Line */}
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between min-h-0 md:min-h-[70vh]">
              <div>
                <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 block mb-4">
                  Our Approach
                </span>
                <h2 className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] uppercase tracking-tighter text-neutral-900 leading-none">
                  How We
                  <br />
                  Work
                </h2>
              </div>

            </div>

            {/* Right: Steps */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-start md:justify-center gap-6 md:gap-16 overflow-y-auto max-h-[55vh] md:max-h-none [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {STEPS.map((step, i) => {
                const isActive = i <= activeStep;

                return (
                  <div
                    key={i}
                    className="flex gap-6 md:gap-8 items-start"
                  >
                    {/* Accent bar */}
                    <div
                      className={`w-[3px] self-stretch rounded-full transition-colors duration-700 flex-shrink-0 ${
                        isActive ? "bg-neutral-900" : "bg-neutral-200"
                      }`}
                    />

                    {/* Number */}
                    <span
                      className={`font-display text-4xl md:text-5xl tracking-tighter leading-none flex-shrink-0 transition-all duration-700 ${
                        isActive
                          ? "text-neutral-900"
                          : "text-neutral-300"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Content */}
                    <div className="flex-1 border-t border-neutral-200 pt-4">
                      <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tighter text-neutral-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="font-sans text-base md:text-lg text-neutral-500 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesApproach;
