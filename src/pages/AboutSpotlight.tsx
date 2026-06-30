import { motion } from "framer-motion";

const AboutSpotlight = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        {/* Background image with subtle zoom */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ delay: 5, duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Text */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 5.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-[16vw] md:text-[14vw] lg:text-[12vw] uppercase tracking-tighter text-white leading-none"
          >
            ABOUT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 5.9,
              ease: "easeOut",
            }}
            className="font-sans text-base md:text-lg 2xl:text-xl tracking-[0.2em] font-medium text-white mt-6 max-w-md leading-relaxed"
          >
            A design studio crafting cinematic visual narratives for the world's
            most ambitious architecture.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutSpotlight;
