export interface ServiceHero {
  image: string;
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  persistentLine1: string;
  persistentLine2: string;
  persistentTagline: string;
}

export interface ServicePillar {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceProject {
  title: string;
  subtitle: string;
  image: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ServiceData {
  slug: string;
  path: string;
  hero: ServiceHero;
  heroTestimonialBg: string;
  pillars: ServicePillar[];
  projects: ServiceProject[];
  testimonials: ServiceTestimonial[];
}
