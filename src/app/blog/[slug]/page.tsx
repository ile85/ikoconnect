// src/app/blog/[slug]/page.tsx
import { getPostHtmlBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

export default async function Page({
  params,
}: {
  // ← note that params is now a Promise
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;                   // ← await here
  const post = await getPostHtmlBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-white">
        {post.meta.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">{post.meta.date}</p>
      <article
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}
