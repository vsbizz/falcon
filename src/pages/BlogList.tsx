import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import type { BlogPost } from "./blogData";

const BlogCard = ({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full md:w-[calc(33.333%-2rem)]"
    >
      <div className="overflow-hidden mb-5">
        <motion.img
          src={post.image}
          alt={post.title}
          initial={{ scale: 1.05 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="font-sans text-eyebrow-sm uppercase text-neutral-400">
          {post.category}
        </span>
        <span className="w-3 h-[1px] bg-neutral-300" />
        <span className="font-sans text-[9px] 2xl:text-xs tracking-[0.05em] text-neutral-400">
          {post.date}
        </span>
      </div>

      <h3 className="font-display text-xl md:text-2xl uppercase tracking-tighter text-neutral-900 leading-[1.1] mb-3">
        {post.title}
      </h3>

      <p className="font-sans text-xs md:text-sm text-neutral-500 leading-relaxed mb-5">
        {post.excerpt}
      </p>

      <Link
        to={`/blog/${post.slug}`}
        className="group inline-flex items-center gap-2 font-sans text-label uppercase text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-60 transition-opacity"
      >
        Read More
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
};

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <section className="bg-[#F8F7F4] pb-32 md:pb-48">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-wrap gap-x-8 gap-y-10 md:gap-y-20">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
