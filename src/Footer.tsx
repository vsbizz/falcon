import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#e3ac2b] pt-24 pb-12 text-[#1a1a1a]">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-24">
          <div className="md:col-span-5 flex flex-col items-start">
            <img
              src="/assets/images/falcon-logo.png"
              alt="Falcon Design"
              className="w-28 md:w-40 h-28 md:h-40 object-contain mb-2"
            />

            <p className="font-sans text-sm text-[#1a1a1a] leading-relaxed max-w-xs mb-8">
              Crafting visual narratives for the world's most ambitious
              architecture and design practices.
            </p>
            <div className="flex gap-6 mt-auto">
              {["Instagram", "LinkedIn", "Vimeo"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-label uppercase text-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[#1a1a1a] mb-8">
                Links
              </h4>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Blog", path: "/blog" },
                  { label: "Contact", path: "/contact" },
                  { label: "Sitemap", path: "/sitemap" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="font-sans text-sm text-[#1a1a1a] hover:text-[#1a1a1a] transition-all underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[#1a1a1a] mb-8">
                Services
              </h4>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Architectural Design", path: "/services/architectural-design" },
                  { label: "Interior Design", path: "/services/luxury-interior-design" },
                  { label: "3D Visualization", path: "/services/3d-visualization" },
                  { label: "Walkthroughs", path: "/services/walkthroughs" },
                  { label: "Virtual Reality", path: "/services/virtual-reality" },
                  { label: "Consultancy", path: "/services/consultancy" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="font-sans text-sm text-[#1a1a1a] hover:text-[#1a1a1a] transition-all underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-full lg:col-span-2">
              <div>
                <h5 className="font-serif italic text-xl mb-4 text-[#1a1a1a]">
                  Address
                </h5>
                <p className="font-sans text-[12px] 2xl:text-sm text-[#1a1a1a] leading-relaxed uppercase tracking-widest">
                  Meydan Grandstand - 6th Floor
                  <br />
                  Al Meydan Rd - Nad Al Sheba
                  <br />
                  Dubai, UAE
                </p>
                <h5 className="font-serif italic text-xl my-4 text-[#1a1a1a]">
                  Phone
                </h5>
                <p className="font-sans text-[12px] 2xl:text-sm text-[#1a1a1a] leading-relaxed uppercase tracking-widest">
                  +44 (0) 20 7123 4567
                </p>
                <h5 className="font-serif italic text-xl my-4 text-[#1a1a1a]">
                  Email
                </h5>
                <p className="font-sans text-[12px] 2xl:text-sm text-[#1a1a1a] leading-relaxed tracking-widest">
                  hi@falcondesign.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a]/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <a
              href="#"
              className="font-sans text-eyebrow-sm uppercase text-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-eyebrow-sm uppercase text-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <p className="font-sans text-eyebrow-sm uppercase text-[#1a1a1a]">
            &copy; {new Date().getFullYear()} FALCON DESIGN | ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
