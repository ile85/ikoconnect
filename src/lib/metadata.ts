// src/lib/metadata.ts
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url"; // сега ова ќе работи

export function buildBasicMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const image = ogImage ? absoluteUrl(ogImage) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
