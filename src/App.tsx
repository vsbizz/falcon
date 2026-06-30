import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import ProjectsSlider from "./ProjectSlider";
import ProjectsGridSection from "./ProjectsGridSection";
import HoldingSection from "./Hero";
import RevealingHeading from "./RevealingHeader";
import Preloader from "@/Preloader";
import { ALL_POSTS } from "./pages/blogData";
import CaseStudies from "./caseStudies";
import NavOverlay from "./Nav";
import NavBar from "./NavBar";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/Contact";
import Sitemap from "./pages/Sitemap";
import ContactSection from "./ContactSection";
import ServicePage from "./services/ServicePage";
import Footer from "./Footer";

const IntroMorphSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const words = [
    {
      visible: "EVOKING",
      hidden: "DEFINING",
      isSerifVisible: true,
      isSerifHidden: false,
      range: [0.1, 0.4],
    },
    {
      visible: "UNBUILT",
      hidden: "FUTURE",
      isSerifVisible: false,
      isSerifHidden: true,
      range: [0.3, 0.6],
    },
    {
      visible: "REALITIES",
      hidden: "STANDARDS",
      isSerifVisible: true,
      isSerifHidden: false,
      range: [0.5, 0.8],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-[#F8F7F4] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-40 bg-[#F8F7F4]">
        <div className="flex flex-col items-center text-center gap-4 md:gap-8 lg:gap-12 w-full max-w-7xl px-4">
          {words.map((word, i) => {
            const yVisible = useTransform(smoothProgress, word.range, [
              "0%",
              "-120%",
            ]);
            const yHidden = useTransform(smoothProgress, word.range, [
              "120%",
              "0%",
            ]);
            const opacityHidden = useTransform(
              smoothProgress,
              word.range,
              [0, 1],
            );
            const opacityVisible = useTransform(
              smoothProgress,
              word.range,
              [1, 0],
            );

            return (
              <div
                key={i}
                className="relative overflow-hidden h-[15vw] md:h-[12vw] lg:h-[10vw] flex items-center justify-center w-full"
              >
                <motion.span
                  style={{ y: yVisible, opacity: opacityVisible }}
                  className={`${word.isSerifVisible ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.visible}
                </motion.span>
                <motion.span
                  style={{ y: yHidden, opacity: opacityHidden }}
                  className={`absolute h-full flex items-center justify-center inset-0 ${word.isSerifHidden ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.hidden}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const spiralImages = [
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b62c573f916024e78_1_Luxury_Villa_Night.avif",
    alt: "1",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b37c5c78176983d54_2_Private_Spa_Landscape.avif",
    alt: "2",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bfb74047d2ef52563_4_Luxury_Villa__Outdoor_Pool.avif",
    alt: "3",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bc2307c9830e5ceec_5_Luxury_Master_Bedroom.avif",
    alt: "4",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b7ca21af8764885cd_6_Architecture_Light_Materials.avif",
    alt: "5",
  },
];
const SpiralSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,

    /**
     * Starts animation earlier
     * Reduces dead scroll feeling
     */
    offset: ["start 0.92", "end 0.90"],
  });

  /**
   * Faster + smoother cinematic response
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0001,
  });

  /**
   * One full cinematic orbit
   */
  const totalRotation = useTransform(smoothProgress, [0, 1], [0, 180]);

  const doubled = [...spiralImages, ...spiralImages];

  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const setWidthRef = useRef(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidthRef.current = carouselRef.current.scrollWidth / 2;
    }
  }, []);

  const speed = 100;

  useAnimationFrame((_, delta) => {
    if (setWidthRef.current === 0) return;
    let newX = x.get() - speed * (delta / 1000);
    if (newX <= -setWidthRef.current) {
      newX += setWidthRef.current;
    }
    x.set(newX);
  });

  return (
    <>
      {/* ─── Mobile carousel ─── */}
      <section className="md:hidden relative z-50 py-20 bg-[#F8F7F4] overflow-hidden">
        <div className="px-6 mb-20">
          <h2 className="font-display text-[14vw] uppercase tracking-tighter text-neutral-900 leading-[0.85]">
            Every Space
          </h2>
          <h2 className="font-serif italic text-[11vw] text-neutral-900 leading-[0.9] mt-4">
            Tells a Story
          </h2>
        </div>
        <div className="overflow-hidden">
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex gap-4"
          >
            {doubled.map((img, i) => (
              <div
                key={i}
                className="shrink-0 w-[70vw] aspect-[4/3] overflow-hidden shadow-xl"
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-center mt-20">
          <Link
            to="/contact"
            className="inline-block font-sans text-button uppercase tracking-[0.15em] text-white bg-neutral-900 px-8 py-4 hover:bg-neutral-800 transition-colors"
          >
            Browse Portfolio
          </Link>
        </div>
      </section>

      {/* ─── Desktop spiral ─── */}
      <section
        ref={containerRef}
        /**
         * Reduced height
         * Less unnecessary scrolling
         */
        className="hidden md:block relative z-50 h-[160svh] bg-[#F8F7F4]"
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <div className="relative flex h-full w-full items-center justify-center">
            {spiralImages.map((img, i) => {
              const angleOffset = -20 + (i / spiralImages.length) * 360;
              /**
               * Faster image entry timing
               */
              const imageStart = i * 0.022;

              /**
               * Longer orbit before stacking
               */
              const imageEnd = 0.82 + i * 0.025;

              /**
               * Circular rotation
               */
              const rotation = useTransform(
                totalRotation,
                (r) => r + angleOffset,
              );

              /**
               * Starts farther from edge
               * Creates premium cinematic entrance
               */
              const imageRadius = useTransform(
                smoothProgress,
                [imageStart, imageEnd],
                [72, 0],
              );

              /**
               * Smooth fade-in
               */
              const opacity = useTransform(
                smoothProgress,
                [imageStart, imageStart + 0.045],
                [0, 1],
              );

              /**
               * Scale animation
               */
              const scale = useTransform(
                smoothProgress,
                [imageStart, imageStart + 0.07],
                [0.72, 1],
              );

              return (
                <motion.div
                  key={i}
                  style={{
                    rotate: rotation,
                    width: "100%",
                    position: "absolute",
                    opacity,
                    zIndex: spiralImages.length - i,
                  }}
                  className="pointer-events-none flex h-1 origin-center items-center justify-center"
                >
                  <motion.div
                    className="pointer-events-auto aspect-[4/3] w-[42vw] overflow-hidden rounded-sm bg-white shadow-2xl md:w-[40vw]"
                    style={{
                      /**
                       * Main spiral movement
                       */
                      x: useTransform(imageRadius, (r) => `${r}vw`),

                      /**
                       * Keeps images upright
                       */
                      rotateZ: useTransform(rotation, (r) => -r),

                      scale,
                    }}
                  >
                    <img
                      src={img.src}
                      className="h-full w-full object-cover"
                      alt=""
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
const ReviewsSection = () => {
  const testimonials = [
    {
      quote:
        "Falcon brought clarity, initiative and reliability to a fast-paced, AI-driven competition. The project ended up winning, a great outcome for a collaboration we genuinely recommend and would repeat again.",
      author: "SANZPONT AWARD-WINNING",
      category: "ARCHITECTURE FIRM",
    },
    {
      quote:
        '"INSPIRE" helped us understand our strengths and focus on what truly matters in our studio. Falcon exceeded our expectations, his insights on processes, client acquisition and positioning were especially valuable.',
      author: "NUA",
      category: "ARCHITECTURE FIRM",
    },
    {
      quote:
        'The whole experience felt warm, coherent and genuinely empathetic. Falcon quickly understood my studio and the essence of my work. "INSPIRE" added real quality and value, helping me strengthen my positioning within my niche.',
      author: "Romina Ross",
      category: "RO ARCHITECTURE",
    },
    {
      quote:
        "Falcon delivered outstanding videos for an international sports event under intense deadlines. He understood every indication, added high-value proposals and made the whole process smooth and collaborative. The final result was excellent and visually spectacular.",
      author: "Simone Vela",
      category: "SV DESIGN",
    },
  ];

  const logos = [
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

  const logoRef = useRef<HTMLDivElement>(null);
  const logoX = useMotionValue(0);
  const logoSetWidth = useRef(0);

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsX = useMotionValue(0);
  const testimonialsSetWidth = useRef(0);

  useEffect(() => {
    if (logoRef.current) {
      logoSetWidth.current = logoRef.current.scrollWidth / 2;
    }
    if (testimonialsRef.current) {
      testimonialsSetWidth.current = testimonialsRef.current.scrollWidth / 2;
    }
  }, []);

  useAnimationFrame((_, delta) => {
    if (logoSetWidth.current > 0) {
      let newX = logoX.get() - 40 * (delta / 1000);
      if (newX <= -logoSetWidth.current) newX += logoSetWidth.current;
      logoX.set(newX);
    }
    if (testimonialsSetWidth.current > 0) {
      let newX = testimonialsX.get() - 30 * (delta / 1000);
      if (newX <= -testimonialsSetWidth.current) newX += testimonialsSetWidth.current;
      testimonialsX.set(newX);
    }
  });

  return (
    <section className="bg-luxury-bg py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <RevealingHeading topText="What people" bottomText="say about Us" />
        {/* Testimonials - Mobile carousel */}
        <div className="md:hidden overflow-hidden mb-12">
          <motion.div
            ref={testimonialsRef}
            style={{ x: testimonialsX }}
            className="flex gap-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-[80vw] flex flex-col justify-between border border-black/10 bg-white/40 p-6 pt-8 min-h-[280px]"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] leading-[1.8] text-neutral-800 font-medium">
                  {t.quote}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-1.5 text-[10px] tracking-[0.3em] font-medium text-neutral-500 uppercase">
                  <span>{t.author}</span>
                  <span className="opacity-40 ml-1">/</span>
                  <span className="opacity-70">{t.category}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials - Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between border border-black/10 bg-white/40 p-6 pt-8 md:p-8 md:pt-10 min-h-[280px] md:min-h-[420px] transition-all duration-700 hover:shadow-2xl hover:shadow-black/5"
            >
              <p className="font-sans text-xs 2xl:text-sm uppercase tracking-[0.12em] leading-[1.8] text-neutral-800 font-medium">
                {t.quote}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-1.5 text-[10px] 2xl:text-xs tracking-[0.3em] font-medium text-neutral-500 uppercase">
                <span>{t.author}</span>
                <span className="opacity-40 ml-1">/</span>
                <span className="opacity-70">{t.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Marquee */}
        <div className="relative border-t border-black/5">
          {/* Subtle Side Fade Masks for "Infinite" look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-luxury-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-luxury-bg to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden relative">
            <motion.div
              ref={logoRef}
              style={{ x: logoX }}
              className="flex whitespace-nowrap gap-14 py-6 flex-none items-center"
            >
              {/* Pair of sets for infinite loop */}
              {[...logos, ...logos].map((src, i) => (
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
      </div>
    </section>
  );
};

const BlogSection = () => {
  const featured = ALL_POSTS.slice(0, 3);
  const posts = featured.map((p) => ({
    slug: p.slug,
    label: p.category,
    title: p.title,
    description: p.excerpt,
    image: p.image,
  }));

  return (
    <section className="bg-[#f8f7f5] py-32 md:py-48">
      <div className="container mx-auto px-8 md:px-16">
        {/* Header */}
        <RevealingHeading topText="Explore" bottomText="Insights and Blogs" />
        <div className="flex flex-col md:flex-row justify-end items-start md:items-end mb-24 gap-8">
          <Link
            to="/blog"
            className="font-sans text-[10px] md:text-xs 2xl:text-sm font-bold tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            EXPLORE INSIGHTS
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 items-start">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col group cursor-pointer"
            >
              <div
                className={`relative overflow-hidden mb-8 shadow-sm transition-all duration-500 group-hover:shadow-xl ${
                  i === 1 ? "aspect-square opacity-90" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

              </div>

              <div className="flex flex-col">
                <span className="font-sans text-eyebrow uppercase text-neutral-400 mb-4">
                  {post.label}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-neutral-900 leading-snug mb-4">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                    {post.description}
                  </p>
                )}
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-sans text-label uppercase text-neutral-900 border-b border-neutral-900 w-fit pb-1 hover:opacity-60 transition-opacity"
                >
                  READ MORE
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  const onToggleNav = () => setNavOpen((v) => !v);
  const onCloseNav = () => setNavOpen(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
  }, [location.pathname]);

  return (
    <main className="bg-white">
      <NavOverlay isOpen={navOpen} onClose={onCloseNav} />
      <NavBar navOpen={navOpen} onToggleNav={onToggleNav} />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key={`preloader-${location.pathname}`} onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <>
                  <HoldingSection />
                  <div className="flex flex-col md:block">
                    <div className="order-2 md:order-1">
                      <IntroMorphSection />
                    </div>
                    <div className="order-1 md:order-2">
                      <SpiralSection />
                    </div>
                  </div>
                  <ProjectsSlider />
                  <ProjectsGridSection />
                  <CaseStudies />
                  <ReviewsSection />
                  <BlogSection />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/services"
              element={<ServicesPage />}
            />
            <Route
              path="/blog"
              element={<BlogPage />}
            />
            <Route
              path="/blog/:slug"
              element={<BlogPostPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            <Route
              path="/sitemap"
              element={<Sitemap />}
            />
            <Route
              path="/services/architectural-design"
              element={<ServicePage slug="architectural-design" />}
            />
            <Route
              path="/services/luxury-interior-design"
              element={<ServicePage slug="luxury-interior-design" />}
            />
            <Route
              path="/services/3d-visualization"
              element={<ServicePage slug="3d-visualization" />}
            />
            <Route
              path="/services/walkthroughs"
              element={<ServicePage slug="walkthroughs" />}
            />
            <Route
              path="/services/virtual-reality"
              element={<ServicePage slug="virtual-reality" />}
            />
            <Route
              path="/services/consultancy"
              element={<ServicePage slug="consultancy" />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </main>
  );
}
