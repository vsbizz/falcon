import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ALL_SERVICES = [
  {
    title: "Architectural Design",
    path: "/services/architectural-design",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Luxury Interior Design",
    path: "/services/luxury-interior-design",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "3D Visualization",
    path: "/services/3d-visualization",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Virtual Reality",
    path: "/services/virtual-reality",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Consultancy",
    path: "/services/consultancy",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Walkthroughs",
    path: "/services/walkthroughs",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2000&auto=format&fit=crop",
  },
];

const ServicesExplore = ({ currentPath }: { currentPath: string }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const otherServices = ALL_SERVICES.filter((s) => s.path !== currentPath);

  return (
    <section className="relative h-screen bg-[#1a1a1a] overflow-hidden">
      {otherServices.map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeIndex === i ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <img
            src={service.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-white/40 mb-12">
          Explore More
        </span>

        <div className="flex flex-col gap-6 md:gap-8">
          {otherServices.map((service, i) => (
            <Link
              key={i}
              to={service.path}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative block"
            >
              <div className="flex items-center gap-6">
                <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.2em] text-white/20 font-bold uppercase w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[8vw] md:text-[5vw] lg:text-[4vw] uppercase tracking-tighter text-white/80 group-hover:text-white transition-colors leading-none">
                  {service.title}
                </h3>
                <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.2em] uppercase font-bold text-white/20 group-hover:text-white/60 transition-colors">
                  →
                </span>
              </div>
              <div className="h-[1px] bg-white/10 mt-4 md:mt-6 group-hover:bg-white/30 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesExplore;
