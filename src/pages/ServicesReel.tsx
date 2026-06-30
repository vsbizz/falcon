import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SERVICES = [
  {
    title: "Architectural Design",
    description:
      "Transform your concepts into breathtaking architectural marvels that blend form, function, and innovation.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    path: "/services/architectural-design",
  },
  {
    title: "Luxury Interior Design",
    description:
      "Elevate your living spaces with opulent interiors that marry elegance and comfort in every detail.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    path: "/services/luxury-interior-design",
  },
  {
    title: "3D Visualization",
    description:
      "Experience your vision in vivid detail through immersive 3D renderings and photorealistic presentations.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop",
    path: "/services/3d-visualization",
  },
  {
    title: "Virtual Reality",
    description:
      "Dive into your designs with interactive VR tours that bring unrealized spaces to life.",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2000&auto=format&fit=crop",
    path: "/services/virtual-reality",
  },
  {
    title: "Consultancy",
    description:
      "Benefit from seasoned insights guiding your project from vision through execution with precision.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop",
    path: "/services/consultancy",
  },
  {
    title: "Walkthroughs",
    description:
      "Experience your space before it is built with immersive cinematic architectural walkthroughs.",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2000&auto=format&fit=crop",
    path: "/services/walkthroughs",
  },
];

const ServicesReel = () => {
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

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(SERVICES.length - 1) * 100}vw`],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[600svh] bg-[#F8F7F4] z-30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F8F7F4]">
        <motion.div
          style={{ x: trackX }}
          className="flex h-full will-change-transform"
        >
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="relative h-screen w-[100vw] flex-shrink-0 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Mobile visual spacer between slides */}
              {i < SERVICES.length - 1 && (
                <div className="absolute right-0 inset-y-0 w-1 bg-[#F8F7F4] z-10 md:hidden" />
              )}
              {/* Text side */}
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-[#F8F7F4] flex items-center justify-center">
                <div className="max-w-lg mx-auto px-8 md:px-16 lg:px-20">
                  <span className="block font-display text-[20vw] md:text-[16vw] lg:text-[12vw] text-black/[0.04] leading-none tracking-tighter select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-[1.5px] bg-neutral-900/20 mb-8 -mt-4" />
                  <h2 className="font-display text-[8vw] md:text-[5vw] lg:text-[3.5vw] uppercase tracking-tighter text-neutral-900 leading-none mb-6">
                    {service.title}
                  </h2>
                  <p className="font-sans text-base md:text-lg text-neutral-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <a
                    href={service.path}
                    className="group inline-flex items-center gap-2 font-sans text-label uppercase text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    Read More
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>

              {/* Image side */}
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                <img
                  src={service.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-200 z-20">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-neutral-900 origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesReel;
