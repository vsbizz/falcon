import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const VR_EXPERIENCES = [
  {
    title: "Najmi Group",
    subtitle: "Virtual Showcase",
    url: "https://vr.najmigroup.co",
  },
  {
    title: "Verdantia",
    subtitle: "Residential Experience",
    url: "https://vr.najmigroup.co/verdantia/",
  },
  {
    title: "Continental",
    subtitle: "Commercial Tour",
    url: "https://www.vsbizz.com/continental/",
  },
  {
    title: "SMB",
    subtitle: "Virtual Experience",
    url: "https://vr.smb.ke",
  },
];

const VRSection = ({
  exp,
  index,
}: {
  exp: (typeof VR_EXPERIENCES)[0];
  index: number;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-10%" });
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!isInView) setActivated(false);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#1a1a1a] overflow-hidden flex flex-col"
    >
      {/* Top scroll zone — safe scrolling area */}
      <div className="h-[12.5%] min-h-[60px] flex items-center justify-center flex-shrink-0 relative">
        {index === 0 && (
          <span className="font-sans text-xs md:text-sm tracking-[0.35em] font-bold uppercase text-white/40">
            Featured Projects
          </span>
        )}

        <motion.div
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.3em] uppercase text-white/20">
            Scroll
          </span>
        </motion.div>

        <div className="absolute top-1/2 -translate-y-1/2 right-6">
          <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.2em] uppercase text-white/20">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(VR_EXPERIENCES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* iframe — constrained height, pointer events work */}
      <div className="h-[75%] flex-shrink-0 relative">
        <iframe
          src={exp.url}
          className="absolute inset-0 w-full h-full"
          allow="fullscreen; vr; xr-spatial-tracking; accelerometer; gyroscope"
          allowFullScreen
          title={exp.title}
        />
        {/* Mobile overlay: tap to unlock iframe interaction */}
        {!activated && (
          <motion.div
            onClick={() => setActivated(true)}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a]/60 backdrop-blur-sm cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/70">
                Tap to Explore
              </span>
              <span className="text-white/20 text-2xl">↗</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom scroll zone — safe scrolling area */}
      <div className="h-[12.5%] min-h-[60px] flex items-center flex-shrink-0 px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.2em] uppercase text-white/40 mb-1 block">
            {exp.subtitle}
          </span>
          <h3 className="font-display text-[4vw] md:text-[2.5vw] uppercase tracking-tighter text-white/90 leading-none">
            {exp.title}
          </h3>
        </motion.div>
      </div>

      {/* Fixed Exit VR button — outside iframe context, works on all devices */}
      {activated && (
        <button
          onClick={() => setActivated(false)}
          className="fixed bottom-6 right-6 z-50 px-3 py-1.5 font-sans text-[9px] 2xl:text-xs tracking-[0.2em] uppercase text-white/50 bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors cursor-pointer"
        >
          Exit VR
        </button>
      )}
    </section>
  );
};

const VirtualRealityWorks = () => {
  return (
    <div>
      {VR_EXPERIENCES.map((exp, i) => (
        <VRSection key={i} exp={exp} index={i} />
      ))}
    </div>
  );
};

export default VirtualRealityWorks;
