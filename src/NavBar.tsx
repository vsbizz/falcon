import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = ({
  navOpen,
  onToggleNav,
}: {
  navOpen: boolean;
  onToggleNav: () => void;
}) => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    if (current > previous && current > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 md:px-12 py-0 min-h-0 bg-white border-b border-black/5"
    >
      <motion.img
        src="/assets/images/falcon-logo.png"
        alt="Falcon Design"
        className="w-24 h-24 md:w-20 lg:w-24 lg:h-24 object-contain"
      />
      <div className="flex items-center gap-8">
        <motion.button onClick={() => navigate("/contact")} className="group hidden md:flex items-center gap-3 bg-white/70 text-[#1a1a1a] px-6 py-2.5 rounded-full font-sans text-button hover:bg-white/90 transition-colors backdrop-blur-xl border border-white/30 shadow-lg shadow-black/5">
          GET IN TOUCH
          <div className="w-5 h-5 bg-[#1a1a1a]/10 rounded-full flex items-center justify-center p-1 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3 h-3 rotate-[-45deg] text-[#1a1a1a]" />
          </div>
        </motion.button>
        <motion.button
          onClick={onToggleNav}
          className="relative z-50 flex flex-col gap-1.5 w-8 items-end group cursor-pointer"
          aria-label={navOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={navOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="h-0.5 bg-[#1a1a1a] origin-center w-full"
          />
          <motion.div
            animate={navOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className={`h-0.5 bg-[#1a1a1a] origin-center transition-all duration-300 ${
              navOpen ? "w-full" : "w-2/3 group-hover:w-full"
            }`}
          />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default NavBar;
