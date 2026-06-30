import { useState } from "react";
import BlogHero from "./BlogHero";
import BlogFeatured from "./BlogFeatured";
import BlogList from "./BlogList";
import { ALL_POSTS, CATEGORIES } from "./blogData";

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filteredPosts =
    activeFilter === "All"
      ? ALL_POSTS
      : ALL_POSTS.filter((p) => p.category === activeFilter);

  const safeIndex = Math.min(featuredIndex, filteredPosts.length - 1);
  const featuredPost = filteredPosts[safeIndex] ?? filteredPosts[0];

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setFeaturedIndex(0);
  };

  const handlePrev = () => {
    setFeaturedIndex((i) => (i - 1 + filteredPosts.length) % filteredPosts.length);
  };

  const handleNext = () => {
    setFeaturedIndex((i) => (i + 1) % filteredPosts.length);
  };

  const hasPrev = filteredPosts.length > 1;
  const hasNext = filteredPosts.length > 1;

  return (
    <main className="bg-white">
      <BlogHero />
      {featuredPost && (
        <BlogFeatured
          post={featuredPost}
          onPrev={handlePrev}
          onNext={handleNext}
          categories={CATEGORIES}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
      <BlogList posts={filteredPosts} />
    </main>
  );
};

export default BlogPage;
