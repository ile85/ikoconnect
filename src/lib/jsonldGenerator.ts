// src/lib/jsonldGenerator.ts

export function generateWebPageJsonLD({
  url,
  name,
  description,
  dateModified,
  
}: {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    description,
    ...(dateModified && { dateModified }),
  };
}

export function generateBlogPostJsonLD({
  url,
  title,
  description,
  authorName,
  datePublished,
  dateModified,
  image,
}: {
  url: string;
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url,
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: authorName,
    },
    datePublished,
    ...(dateModified && { dateModified }),
  };
}

export function generateOrganizationJsonLD({
  name,
  url,
  logoUrl,
  sameAs,       // ← allow passing sameAs[]
}: {
  name: string;
  url: string;
  logoUrl: string;
  sameAs?: string[];  // ← add sameAs to the type
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    ...(sameAs && { sameAs }),  // ← include sameAs if it exists
  };
}

export function generateJobPostingJsonLD({
  title,
  description,
  datePosted,
  validThrough,
  hiringOrganization,
  employmentType,
  jobLocation,
}: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  hiringOrganization: {
    name: string;
    sameAs?: string;
    logo?: string;
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    validThrough,
    hiringOrganization: {
      "@type": "Organization",
      name: hiringOrganization.name,
      ...(hiringOrganization.sameAs && { sameAs: hiringOrganization.sameAs }),
      ...(hiringOrganization.logo && { logo: hiringOrganization.logo }),
    },
    employmentType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(jobLocation.address.streetAddress && {
          streetAddress: jobLocation.address.streetAddress,
        }),
        addressLocality: jobLocation.address.addressLocality,
        ...(jobLocation.address.addressRegion && {
          addressRegion: jobLocation.address.addressRegion,
        }),
        ...(jobLocation.address.postalCode && {
          postalCode: jobLocation.address.postalCode,
        }),
        addressCountry: jobLocation.address.addressCountry,
      },
    },
  };
}
