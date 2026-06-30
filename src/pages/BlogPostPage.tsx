import { Link, useParams, Navigate } from "react-router-dom";
import { ALL_POSTS } from "./blogData";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = ALL_POSTS.findIndex((p) => p.slug === slug);
  const post = ALL_POSTS[postIndex];
  const prevPost = postIndex > 0 ? ALL_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < ALL_POSTS.length - 1 ? ALL_POSTS[postIndex + 1] : null;

  if (!post) return <Navigate to="/blog" replace />;

  const contentHtml = post.content
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2 class="font-display text-3xl md:text-4xl uppercase tracking-tighter text-neutral-900 mt-12 mb-6">${line.slice(3)}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3 class="font-display text-2xl md:text-3xl uppercase tracking-tighter text-neutral-900 mt-10 mb-4">${line.slice(4)}</h3>`;
      }
      return `<p class="font-sans text-base md:text-lg text-neutral-600 leading-relaxed mb-5">${line}</p>`;
    })
    .join("");

  return (
    <main className="bg-[#F8F7F4] min-h-screen pt-32 pb-24">
      <article className="container mx-auto px-8 md:px-16 lg:px-24 max-w-4xl">
        {/* Back link */}
        <Link
          to="/blog"
          className="font-sans text-eyebrow uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-12 block"
        >
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="font-sans text-eyebrow uppercase text-neutral-400">
            {post.category}
          </span>
          <h1 className="font-display text-[8vw] md:text-[4.5vw] uppercase tracking-tighter text-neutral-900 leading-none mt-4 mb-6">
            {post.title}
          </h1>
          <span className="font-sans text-sm text-neutral-400">
            {post.date}
          </span>
        </div>

        {/* Featured image */}
        <div className="mb-16">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[40vh] md:h-[55vh] object-cover shadow-lg"
          />
        </div>

        {/* Content */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Second image */}
        {post.image2 && (
          <div className="mt-16 mb-12">
            <img
              src={post.image2}
              alt=""
              className="w-full h-[35vh] md:h-[45vh] object-cover shadow-lg"
            />
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-neutral-200 pt-8 mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-sans text-sm text-neutral-400">
            {post.date} &middot; {post.category}
          </span>
          <Link
            to="/blog"
            className="font-sans text-eyebrow uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-neutral-200 pt-8 mt-12 flex items-center justify-between gap-6">
          <div className="flex-1">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <span className="text-xl md:text-2xl leading-none group-hover:-translate-x-1 transition-transform">&larr;</span>
                <div className="flex flex-col">
                  <span className="font-sans text-eyebrow uppercase text-neutral-400">Previous</span>
                  <span className="font-sans text-sm md:text-base leading-tight line-clamp-1">{prevPost.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <div className="flex flex-col items-end">
                  <span className="font-sans text-eyebrow uppercase text-neutral-400">Next</span>
                  <span className="font-sans text-sm md:text-base leading-tight line-clamp-1 text-right">{nextPost.title}</span>
                </div>
                <span className="text-xl md:text-2xl leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
