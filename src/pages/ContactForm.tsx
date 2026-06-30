import { useRef, useState, FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ContactForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(
    smoothProgress,
    [0.1, 0.8],
    ["0%", "100%"],
  );

  const leftReveal = useTransform(
    smoothProgress,
    [0, 0.05],
    [0, 1],
  );

  const rightReveal = useTransform(
    smoothProgress,
    [0, 0.08],
    [0, 1],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#F8F7F4] py-24 md:py-32 z-30"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="relative flex flex-col md:flex-row gap-10 md:gap-24">
          {/* Vertical line separator */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-neutral-300 origin-top"
            />
          </div>

          {/* Left: Form */}
          <motion.div
            style={{
              opacity: leftReveal,
              x: useTransform(leftReveal, [0, 1], [-20, 0]),
            }}
            className="w-full md:w-1/2 md:pr-12"
          >
            <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 block mb-4">
              Send a Message
            </span>
            <h2 className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] uppercase tracking-tighter text-neutral-900 leading-[0.95] mb-12">
              Let's Talk
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-transparent border-b border-neutral-300 pb-3 pt-2 font-sans text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors duration-300 placeholder:text-neutral-400"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-transparent border-b border-neutral-300 pb-3 pt-2 font-sans text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors duration-300 placeholder:text-neutral-400"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full bg-transparent border-b border-neutral-300 pb-3 pt-2 font-sans text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 resize-none"
                />
              </div>
              {submitted ? (
                <p className="font-sans text-sm text-neutral-600">
                  Thank you! We&apos;ll be in touch soon.
                </p>
              ) : (
                <button
                  type="submit"
                  className="group self-start flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 font-sans text-button uppercase hover:bg-neutral-800 transition-colors"
                >
                  Send Message
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              )}
            </form>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            style={{
              opacity: rightReveal,
              x: useTransform(rightReveal, [0, 1], [20, 0]),
            }}
            className="w-full md:w-1/2 md:pl-12 flex flex-col justify-between"
          >
            <div>
            <span className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 block mb-4">
              Contact Info
            </span>
              <h2 className="font-display text-[14vw] md:text-[7vw] lg:text-[5.5vw] uppercase tracking-tighter text-neutral-900 leading-[0.95] mb-12">
                Reach Out
              </h2>
            </div>

            <div className="flex flex-col gap-10">
              {/* Dubai */}
              <div>
                <h4 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                  Dubai
                </h4>
                <p className="font-sans text-[11px] 2xl:text-sm tracking-[0.15em] text-neutral-500 uppercase leading-relaxed">
                  Meydan Grandstand - 6th Floor
                  <br />
                  Al Meydan Rd - Nad Al Sheba
                  <br />
                  Dubai, UAE
                </p>
              </div>

              {/* London */}
              <div>
                <h4 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                  London
                </h4>
                <p className="font-sans text-[11px] 2xl:text-sm tracking-[0.15em] text-neutral-500 uppercase leading-relaxed">
                  Studio London
                  <br />
                  85 Great Portland Street
                </p>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                  Get in Touch
                </h4>
                <p className="font-sans text-[11px] 2xl:text-sm tracking-[0.15em] text-neutral-500 uppercase leading-relaxed">
                  +44 (0) 20 7123 4567
                  <br />
                  hi@falcondesign.com
                </p>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-serif italic text-lg 2xl:text-xl text-neutral-900 mb-2">
                  Follow Us
                </h4>
                <div className="flex gap-6">
                  {["Instagram", "LinkedIn", "Vimeo"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="font-sans text-label 2xl:text-sm uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
