import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import type { BlogPost } from "./blogData";

interface BlogFeaturedProps {
  post: BlogPost;
  onPrev: () => void;
  onNext: () => void;
  categories: string[];
  activeFilter: string;
  onFilterChange: (cat: string) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const BlogFeatured = ({
  post,
  onPrev,
  onNext,
  categories,
  activeFilter,
  onFilterChange,
  hasPrev,
  hasNext,
}: BlogFeaturedProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-[#F8F7F4] py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-8 mb-8 md:mb-12 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`font-sans text-label uppercase whitespace-nowrap transition-all duration-300 pb-1 cursor-pointer ${
                cat === activeFilter
                  ? "text-neutral-900 border-b border-neutral-900"
                  : "text-neutral-400 border-b border-transparent hover:text-neutral-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* 60/40 Featured Layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Image — 60% */}
          <motion.div
            key={post.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[60%] overflow-hidden"
          >
            <img
              src={post.image}
              alt=""
              className="w-full h-[50vw] md:h-[38vw] lg:h-[32vw] object-cover"
            />
          </motion.div>

          {/* Content — 40% */}
          <motion.div
            key={post.title + "text"}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[40%] flex flex-col justify-center"
          >
            {/* Nav arrows */}
            <div className="flex gap-3 mb-8 self-end">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className={`w-9 h-9 border flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${
                  hasPrev
                    ? "border-neutral-300 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                    : "border-neutral-200 text-neutral-300 cursor-not-allowed"
                }`}
              >
                ←
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={`w-9 h-9 border flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${
                  hasNext
                    ? "border-neutral-300 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                    : "border-neutral-200 text-neutral-300 cursor-not-allowed"
                }`}
              >
                →
              </button>
            </div>

            <span className="font-sans text-[10px] 2xl:text-xs tracking-[0.1em] text-neutral-400 mb-4">
              {post.date}
            </span>

            <h2 className="font-display text-[7vw] md:text-[3.2vw] lg:text-[2.8vw] uppercase tracking-tighter text-neutral-900 leading-[0.95] mb-5">
              {post.title}
            </h2>

            <p className="font-sans text-sm md:text-base text-neutral-500 leading-relaxed mb-8 max-w-md">
              {post.excerpt}
            </p>

            <Link
              to={`/blog/${post.slug}`}
              className="group inline-flex items-center gap-2 font-sans text-label uppercase text-neutral-900 border-b border-neutral-900 pb-0.5 w-fit hover:opacity-60 transition-opacity"
            >
              Read More
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogFeatured;
