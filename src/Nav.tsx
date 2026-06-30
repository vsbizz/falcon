import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Vimeo"];

const NavOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ stiffness: 100, damping: 30, type: "spring" }}
            className="fixed right-0 top-0 z-[110] h-screen w-[85vw] sm:w-[220px] sm:max-w-[90vw] 2xl:w-[35vw] [@media(max-width:1999px)]:max-w-[450px] min-[2000px]:w-[min(35vw,600px)] bg-[#F8F7F4] shadow-2xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end px-8 pt-8 pb-4">
              <button
                onClick={onClose}
                className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-neutral-900" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-12">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <motion.span
                    key={link.path}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative py-3 md:py-4 overflow-hidden block ${
                      isActive ? "text-neutral-900" : "text-neutral-500"
                    }`}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="block"
                    >
                      <span className="font-display text-5xl md:text-6xl uppercase tracking-tighter leading-none block">
                        {link.label}
                      </span>
                      <span
                        className={`block h-[2px] bg-neutral-900 transition-transform duration-500 origin-left ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </motion.span>
                );
              })}
            </nav>

            {/* Social + Location Footer */}
            <div className="px-8 md:px-12 pb-6 pt-6 border-t border-neutral-200">
              <div className="flex gap-6 mb-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-sans text-label uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
              <p className="font-sans text-[10px] 2xl:text-xs tracking-[0.3em] uppercase text-neutral-400">
                Dubai / London
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export { NAV_LINKS };
export default NavOverlay;
