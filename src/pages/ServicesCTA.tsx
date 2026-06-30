import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesCTA = () => {
  const navigate = useNavigate();
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

  const textReveal = useTransform(
    smoothProgress,
    [0.15, 0.5],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.3],
    [0.6, 0.3],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[150svh] bg-black z-10"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <img
          src="/assets/images/back.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <div className="overflow-hidden mb-8">
            <motion.h2
              style={{ clipPath: textReveal }}
              className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] uppercase tracking-tighter text-white leading-none"
            >
              Ready to Create?
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm md:text-base 2xl:text-lg text-white/60 mb-12 max-w-md leading-relaxed"
          >
            Let's discuss your next project and explore what we can build
            together.
          </motion.p>

          <motion.button
            onClick={() => navigate("/contact")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 font-sans text-button uppercase hover:bg-neutral-100 transition-colors"
          >
            START A PROJECT
            <div className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center p-1 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 rotate-[-45deg] text-white" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
