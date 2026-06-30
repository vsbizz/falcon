import { motion } from "framer-motion";

const ServicesHero = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        {/* Background image with subtle zoom */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.18 }}
          transition={{ delay: 5, duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Curtain text reveal */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative overflow-hidden">
            <motion.h1
              initial={{ clipPath: "inset(0 50% 0 50%)" }}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              transition={{
                delay: 5,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-[16vw] md:text-[14vw] lg:text-[12vw] uppercase tracking-tighter text-white leading-none py-4"
            >
              SERVICES
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 5.6,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="font-sans text-base md:text-lg 2xl:text-xl tracking-[0.2em] font-medium text-white mt-4 max-w-md text-center leading-relaxed"
          >
            From concept to completion, crafting spaces that define how we
            live, work, and experience the world.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
