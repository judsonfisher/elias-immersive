// GROQ queries for fetching data from Sanity

export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
  services[]->{
    _id,
    title,
    description,
    image,
    slug
  },
  featuredProjects[]->{
    _id,
    title,
    description,
    category,
    image,
    slug
  },
  aboutTitle,
  aboutDescription,
  aboutImage,
  useCases[]{
    title,
    description
  }
}`;

export const projectsQuery = `*[_type == "project"] | order(orderRank) {
  _id,
  title,
  description,
  category,
  image,
  slug,
  featured
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  fullDescription,
  category,
  image,
  gallery,
  embedUrl,
  slug
}`;

export const servicesQuery = `*[_type == "service"] | order(orderRank) {
  _id,
  title,
  description,
  fullDescription,
  image,
  slug
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  logo,
  contactEmail,
  contactPhone,
  address,
  socialLinks
}`;

export const landingPageBySlugQuery = `*[_type == "landingPage" && slug.current == $slug][0]{
  title,
  slug,
  seo,
  heroEyebrow,
  heroHeadline,
  heroSubheadline,
  heroSolution,
  heroCta,
  heroImage,
  problemTitle,
  problemStats,
  problemSummary,
  solutionTitle,
  solutionDescription,
  solutionFeatures,
  solutionImage,
  solutionImageCaption,
  useCasesTitle,
  useCasesIntro,
  useCases,
  processTitle,
  processSteps,
  trustTitle,
  trustContent,
  ctaTitle,
  ctaDescription,
  ctaBenefits
}`;
