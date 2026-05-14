import defaultContent from '@/data/site-content.json';
import { SiteContent } from '@/types/site';

const fallback = defaultContent as SiteContent;

export function normalizeSiteContent(input: Partial<SiteContent> | null | undefined): SiteContent {
  const source = input ?? {};

  return {
    brandName: source.brandName || fallback.brandName,
    hero: {
      headline: source.hero?.headline || fallback.hero.headline,
      subheadline: source.hero?.subheadline || fallback.hero.subheadline,
      bgImage: source.hero?.bgImage || fallback.hero.bgImage
    },
    about: {
      text: source.about?.text || fallback.about.text,
      highlights:
        source.about?.highlights && source.about.highlights.length > 0
          ? source.about.highlights
          : fallback.about.highlights
    },
    services:
      source.services && source.services.length > 0
        ? source.services.map((item) => ({
            icon: item.icon || 'settings',
            title: item.title || 'Service',
            text: item.text || ''
          }))
        : fallback.services,
    industries:
      source.industries && source.industries.length > 0 ? source.industries : fallback.industries,
    counters:
      source.counters && source.counters.length > 0 ? source.counters : fallback.counters,
    projects:
      source.projects && source.projects.length > 0
        ? source.projects.map((item) => ({
            title: item.title || 'Project',
            image: item.image || fallback.projects[0].image,
            slug: item.slug,
            location: item.location || 'India',
            timeline: item.timeline || 'Execution Timeline',
            metric: item.metric || 'Industrial Grade',
            technologies: item.technologies && item.technologies.length > 0 ? item.technologies : ['Turnkey Execution']
          }))
        : fallback.projects,
    caseStudies:
      source.caseStudies && source.caseStudies.length > 0
        ? source.caseStudies.map((item, index) => ({
            slug: item.slug || fallback.caseStudies[index]?.slug || `case-study-${index + 1}`,
            title: item.title || 'Industrial Case Study',
            clientType: item.clientType || 'Industrial Client',
            location: item.location || 'India',
            scope: item.scope && item.scope.length > 0 ? item.scope : ['Project scope available on request'],
            outcomes:
              item.outcomes && item.outcomes.length > 0
                ? item.outcomes
                : ['Improved reliability and execution quality'],
            image: item.image || fallback.projects[0].image
          }))
        : fallback.caseStudies,
    testimonials:
      source.testimonials && source.testimonials.length > 0
        ? source.testimonials
        : fallback.testimonials,
    contact: {
      phone: source.contact?.phone || fallback.contact.phone,
      email: source.contact?.email || fallback.contact.email,
      address: source.contact?.address || fallback.contact.address,
      mapEmbedUrl: source.contact?.mapEmbedUrl || fallback.contact.mapEmbedUrl,
      whatsapp: source.contact?.whatsapp || fallback.contact.whatsapp
    }
  };
}
