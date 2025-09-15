// src/lib/jsonldGenerator.ts

export function generateWebPageJsonLD(params: {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}) {
  const { url, name, description, dateModified } = params;
  const json: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    description,
  };
  if (dateModified) json.dateModified = dateModified;
  return json;
}

export function generateBlogPostJsonLD(params: {
  url: string;
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  publisherName?: string;
  publisherLogo?: string;
  inLanguage?: string;
  wordCount?: number;
}) {
  const {
    url,
    title,
    description,
    authorName,
    datePublished,
    dateModified,
    image,
    keywords,
    articleSection,
    publisherName,
    publisherLogo,
    inLanguage = "en",
    wordCount,
  } = params;

  const json: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: title,
    description,
    author: { "@type": "Person", name: authorName },
    datePublished,
    inLanguage,
    isAccessibleForFree: true,
  };

  if (dateModified) json.dateModified = dateModified;
  if (image) json.image = { "@type": "ImageObject", url: image };
  if (publisherName) {
    json.publisher = {
      "@type": "Organization",
      name: publisherName,
      ...(publisherLogo && { logo: { "@type": "ImageObject", url: publisherLogo } }),
    };
  }
  if (Array.isArray(keywords) && keywords.length) json.keywords = keywords.join(", ");
  if (articleSection) json.articleSection = articleSection;
  if (typeof wordCount === "number") json.wordCount = wordCount;

  return json;
}

export function generateOrganizationJsonLD(params: {
  name: string;
  url: string;
  logoUrl: string;
  sameAs?: string[];
}) {
  const { name, url, logoUrl, sameAs } = params;
  const json: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: { "@type": "ImageObject", url: logoUrl },
  };
  if (sameAs && sameAs.length) json.sameAs = sameAs;
  return json;
}

export function generateJobPostingJsonLD(params: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  hiringOrganization: { name: string; sameAs?: string; logo?: string };
  employmentType: string;
  jobLocation: {
    address: {
      streetAddress?: string;
      addressLocality: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry: string;
    };
  };
}) {
  const {
    title,
    description,
    datePosted,
    validThrough,
    hiringOrganization,
    employmentType,
    jobLocation,
  } = params;

  const json: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    validThrough,
    hiringOrganization: {
      "@type": "Organization",
      name: hiringOrganization.name,
    },
    employmentType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: jobLocation.address.addressLocality,
        addressCountry: jobLocation.address.addressCountry,
      },
    },
  };

  if (hiringOrganization.sameAs) json.hiringOrganization.sameAs = hiringOrganization.sameAs;
  if (hiringOrganization.logo) json.hiringOrganization.logo = hiringOrganization.logo;

  if (jobLocation.address.streetAddress) {
    json.jobLocation.address.streetAddress = jobLocation.address.streetAddress;
  }
  if (jobLocation.address.addressRegion) {
    json.jobLocation.address.addressRegion = jobLocation.address.addressRegion;
  }
  if (jobLocation.address.postalCode) {
    json.jobLocation.address.postalCode = jobLocation.address.postalCode;
  }

  return json;
}
