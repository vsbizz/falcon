import { motion } from "framer-motion";

const ContactHero = () => {
  const letters = "CONTACT".split("");

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
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Letter drop reveal */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex overflow-hidden">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "-120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 5 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-[16vw] md:text-[14vw] lg:text-[12vw] uppercase tracking-tighter text-white leading-none block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 5.8,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="font-sans text-base md:text-lg 2xl:text-xl tracking-[0.2em] font-medium text-white mt-4 max-w-md text-center leading-relaxed"
          >
            Let's start a conversation about your next project.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
