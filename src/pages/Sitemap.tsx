import { Link } from "react-router-dom";
import { ALL_POSTS } from "./blogData";

const LOCATIONS = [
  "Mumbai",
  "Australia",
  "New Zealand",
  "Canada",
  "Saudi Arabia",
  "Kuwait",
  "Dubai",
];

const Sitemap = () => {
  return (
    <div className="bg-[#F8F7F4] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h1 className="font-display text-[10vw] md:text-[5vw] uppercase tracking-tighter text-neutral-900 leading-none mb-16">
          Sitemap
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Main Pages */}
          <div>
            <h2 className="font-sans text-eyebrow uppercase text-neutral-400 mb-6">
              Pages
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-sans text-eyebrow uppercase text-neutral-400 mb-6">
              Services
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/services"
                  className="font-sans text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline-offset-2 hover:underline"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services/architectural-design"
                  className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  Architectural Designing Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services/luxury-interior-design"
                  className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  Interior Designing Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services/3d-visualization"
                  className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  Architectural Visualization Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services/walkthroughs"
                  className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  Architectural Walkthrough Service
                </Link>
              </li>
              <li>
                <Link
                  to="/services/virtual-reality"
                  className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  Architectural Virtual Reality
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h2 className="font-sans text-eyebrow uppercase text-neutral-400 mb-6">
              Where We Are
            </h2>
            <ul className="flex flex-col gap-3">
              {LOCATIONS.map((loc) => (
                <li
                  key={loc}
                  className="font-sans text-sm text-neutral-600"
                >
                  {loc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mt-16 pt-16 border-t border-neutral-200">
          <h2 className="font-sans text-eyebrow uppercase text-neutral-400 mb-8">
            Blog Posts
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {ALL_POSTS.map((post) => (
              <li key={post.title}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-sans text-sm text-neutral-700 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
