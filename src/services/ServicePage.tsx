import { serviceData } from "./data/serviceData";
import ServiceHeroSection from "./ServiceHero";
import ServicePillarsSection from "./ServicePillars";
import ServiceWorksSection from "./ServiceWorks";
import ServiceTestimonialsSection from "./ServiceTestimonials";
import VirtualRealityWorks from "./VirtualRealityWorks";
import ServicesExplore from "../pages/ServicesExplore";

const ServicePage = ({ slug }: { slug: string }) => {
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F7F4]">
        <p className="font-sans text-sm tracking-wider uppercase text-neutral-400">
          Service not found
        </p>
      </div>
    );
  }

  return (
    <>
      <ServiceHeroSection hero={data.hero} />
      <ServicePillarsSection
        pillars={data.pillars}
        tagline={data.hero.tagline}
      />
      {slug === "virtual-reality" ? (
        <VirtualRealityWorks />
      ) : (
        <ServiceWorksSection projects={data.projects} />
      )}
      <ServiceTestimonialsSection
        testimonials={data.testimonials}
        backgroundImage={data.heroTestimonialBg}
      />
      <ServicesExplore currentPath={data.path} />
    </>
  );
};

export default ServicePage;
