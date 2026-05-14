export type ServiceItem = {
  title: string;
  text: string;
  icon: 'fan' | 'workflow' | 'building2' | 'cpu' | 'waves' | 'settings' | 'wrench';
};

export type SiteContent = {
  brandName: string;
  hero: {
    headline: string;
    subheadline: string;
    bgImage: string;
  };
  about: {
    text: string;
    highlights: string[];
  };
  services: ServiceItem[];
  industries: string[];
  counters: Array<{ value: string; label: string }>;
  projects: Array<{ title: string; image: string; slug?: string }>;
  caseStudies: Array<{
    slug: string;
    title: string;
    clientType: string;
    location: string;
    scope: string[];
    outcomes: string[];
    image: string;
  }>;
  testimonials: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
    mapEmbedUrl: string;
    whatsapp: string;
  };
};
