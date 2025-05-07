// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostHtmlBySlug, getPostSlugs, Post } from "@/lib/blog";

interface PageParams { params: { slug: string } }

export async function generateStaticParams(): Promise<PageParams["params"][]> {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const post = await getPostHtmlBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.ikoconnect.com/blog/${params.slug}`,
      images: [{ url: post.coverImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const post = await getPostHtmlBySlug(params.slug);
  if (!post) return notFound();
  return (
    <main className="prose prose-invert mx-auto px-4 py-12">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-400">{post.date}</p>
      <img src={post.coverImage} alt={post.title} className="my-6 rounded-lg" />
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
