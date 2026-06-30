import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    num: "01",
    bold: "Understand Your Vision.",
    desc: "We begin by distilling complexity into clarity, long before a single line is drawn.",
  },
  {
    num: "02",
    bold: "Design with Intent.",
    desc: "Every decision is intentional. Concepts evolve into refined plans and immersive visualizations.",
  },
  {
    num: "03",
    bold: "Craft with Precision.",
    desc: "Where vision meets reality. We collaborate closely with artisans and builders to realize the design.",
  },
  {
    num: "04",
    bold: "Deliver with Care.",
    desc: "We deliver more than a project, an experience. Ongoing support ensures the vision endures.",
  },
];

const AboutProcess = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-40 md:py-56 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:gap-32">
          {/* Left Column — Sticky Heading */}
          <div className="lg:w-[35%] lg:sticky lg:top-[20vh] lg:self-start mb-20 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.85] tracking-tighter">
                <span className="text-neutral-900">HOW WE</span>
                <br />
                <span className="text-neutral-500">WORK</span>
              </h2>

              <button onClick={() => navigate("/contact")} className="group mt-12 flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 font-sans text-button uppercase hover:bg-neutral-800 transition-colors">
                Let&apos;s Talk
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center p-1 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column — Steps List */}
          <div className="lg:w-[60%] lg:pt-6">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-900 block mb-10"
            >
              Steps:
            </motion.span>

            <div className="flex flex-col">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group"
                >
                  {/* Divider */}
                  <div className="h-[1px] bg-neutral-200 w-full mb-10" />

                  <div className="flex gap-8 pb-10">
                    {/* Number */}
                    <span className="font-sans text-xs tracking-[0.2em] text-neutral-400 mt-1 w-7 flex-none">
                      {step.num}
                    </span>

                    {/* Text block */}
                    <div className="flex-1">
                      <p className="font-sans text-base md:text-lg leading-relaxed">
                        <span className="font-bold text-neutral-900">
                          {step.bold}
                        </span>{" "}
                         <span className="font-serif italic text-neutral-500">
                           {step.desc}
                         </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Final divider */}
              <div className="h-[1px] bg-neutral-200 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;
