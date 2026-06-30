import ServicesHero from "./ServicesHero";
import ServicesReel from "./ServicesReel";
import ServicesApproach from "./ServicesApproach";
import ServicesCTA from "./ServicesCTA";

const ServicesPage = () => {
  return (
    <main className="bg-white">
      <ServicesHero />
      <ServicesReel />
      <ServicesApproach />
      <ServicesCTA />
    </main>
  );
};

export default ServicesPage;
