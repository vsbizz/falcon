import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import AboutSpotlight from "./AboutSpotlight";
import AboutIntro from "./AboutIntro";
import AboutManifesto from "./AboutManifesto";
import AboutServices from "./AboutServices";
import AboutProcess from "./AboutProcess";
import AboutTestimonials from "./AboutTestimonials";

const CLIENT_LOGOS = [
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/69749272a91a4725f8afcffa_SENDA_Logo_320x200.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa70e72c49e66d8649ea_SANZPONT_Logo_320x200.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa686c9dadcfbd975b95_RO_Logo_320x200.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa5d5fe2a35881e59d56_NUA_Logo_320x200.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b9962b75cc971c5bb54221_zagaleta.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b995792210258dd491861c_ark.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b9956bd33d82d2042afca2_aspire.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99559afbc4ce307216c75_reserva-club.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99537a9f6585961894b14_sotogrande.avif",
  "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99517cb2be7e369b5f1af_modon.avif",
];

const AboutPage = () => {
  const aboutLogoRef = useRef<HTMLDivElement>(null);
  const aboutLogoX = useMotionValue(0);
  const aboutLogoSetWidth = useRef(0);

  useEffect(() => {
    if (aboutLogoRef.current) {
      aboutLogoSetWidth.current = aboutLogoRef.current.scrollWidth / 2;
    }
  }, []);

  useAnimationFrame((_, delta) => {
    if (aboutLogoSetWidth.current === 0) return;
    let newX = aboutLogoX.get() - 40 * (delta / 1000);
    if (newX <= -aboutLogoSetWidth.current) {
      newX += aboutLogoSetWidth.current;
    }
    aboutLogoX.set(newX);
  });

  return (
    <main className="bg-white">
      <AboutSpotlight />
      <AboutIntro />
      <AboutManifesto />
      <AboutServices />
      <AboutProcess />
      <AboutTestimonials />

      {/* Client Logo Marquee */}
      <section className="py-20 bg-[#F8F7F4] overflow-hidden">
        <div className="relative border-t border-black/5">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#F8F7F4] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#F8F7F4] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden relative">
            <motion.div
              ref={aboutLogoRef}
              style={{ x: aboutLogoX }}
              className="flex whitespace-nowrap gap-14 py-6 flex-none items-center"
            >
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Client Logo"
                  className="h-16 md:h-17 lg:h-24 w-auto object-contain flex-none grayscale brightness-0 transition-all duration-700 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
