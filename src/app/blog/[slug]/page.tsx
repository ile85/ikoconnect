// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostHtmlBySlug, getPostSlugs } from "@/lib/blog";
import { getAllTools, Tool } from "@/lib/tools";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "@/components/CopyButton";
import JSONLD from "@/components/JSONLD";
import { generateBlogPostJsonLD } from "@/lib/jsonldGenerator";
import BlogComments from "@/components/BlogComments";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<PageParams["params"][]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = params; // ← no await
  const post = await getPostHtmlBySlug(slug);
  if (!post) return {};

  const site = "https://www.ikoconnect.com";
  const ogImageAbsolute = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${site}${post.coverImage || "/images/og/og-blog-default.png"}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site}/blog/${slug}`,
      images: [
        {
          url: ogImageAbsolute,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageAbsolute],
    },
    keywords: post.tags,
  };
}

export default async function BlogPost({ params }: PageParams) {
  const { slug } = params; // ← no await
  const post = await getPostHtmlBySlug(slug);
  if (!post) return notFound();

  const { title, html, date, tags, author, coverImage, description } = post;
  const allTools = await getAllTools();

  // Reading time (simple estimate ~200 wpm)
  const readingTime = Math.ceil(html.split(/\s+/).length / 200);

  // Related tools: overlap between tool.categories and post.tags
  const relatedTools: Tool[] = allTools.filter(
    (tool) =>
      Array.isArray(tool.categories) &&
      tool.categories.some((toolCategory) =>
        tags.some((postTag) => toolCategory.toLowerCase() === postTag.toLowerCase())
      )
  );

  const jsonldData = generateBlogPostJsonLD({
    url: `https://www.ikoconnect.com/blog/${slug}`,
    title,
    description,
    authorName: author || "IkoConnect Team",
    datePublished: date,
    dateModified: date,
    image: coverImage?.startsWith("http") ? coverImage : "/images/og/og-blog-default.png",
  });

  // Tag color map
  const tagColors: Record<string, string> = {
    Tools: "bg-blue-100 text-blue-800",
    Jobs: "bg-green-100 text-green-800",
    Tips: "bg-yellow-100 text-yellow-800",
    SEO: "bg-purple-100 text-purple-800",
    Freelance: "bg-pink-100 text-pink-800",
    Marketing: "bg-red-100 text-red-800",
    Remote: "bg-cyan-100 text-cyan-800",
  };

  return (
    <article className="mx-auto max-w-4xl space-y-12 px-4 py-16">
      {/* JSON-LD */}
      <JSONLD
  data={{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:[
      { "@type":"ListItem", position:1, name:"Home", item:"https://www.ikoconnect.com" },
      { "@type":"ListItem", position:2, name:"Blog", item:"https://www.ikoconnect.com/blog" },
      { "@type":"ListItem", position:3, name:title, item:`https://www.ikoconnect.com/blog/${slug}` }
    ]
  }}
/>


      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { href: `/blog/${slug}`, label: title },
        ]}
      />

      {/* Title & Meta with Logo */}
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {coverImage && (
          <Image
            src={coverImage}
            alt={`${title} logo`}
            width={64}
            height={64}
            className="rounded-lg border bg-white p-1"
          />
        )}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-[#00957F] sm:text-4xl">{title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Image
                src="/images/ikoconnect-square.png"
                alt="IkoConnect"
                width={24}
                height={24}
                className="rounded-full border"
              />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {author || "IkoConnect Team"}
              </span>
            </div>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              {readingTime} min read
            </span>
            <span>
              📅{" "}
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      {/* Affiliate note for posts (visible, subtle) */}
      <aside
        role="note"
        aria-label="Affiliate disclosure"
        className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-200"
      >
        Some links in this article may be affiliate links. If you purchase through them, we may earn a small commission
        at no extra cost to you. See our{" "}
        <a href="/legal#affiliate-disclosure" className="underline hover:no-underline">
          Affiliate Disclosure
        </a>
        .
      </aside>

      {/* Excerpt + Tags */}
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const colorClasses = tagColors[tag] || "bg-gray-100 text-gray-800";
              return (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`transition text-xs px-3 py-1 rounded-full font-medium hover:brightness-95 ${colorClasses}`}
                >
                  🏷️ #{tag}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Giscus Comments */}
      <BlogComments urlPath={`/blog/${slug}`} />

      {/* Share Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Share:</span>
        {[
          {
            href: `https://twitter.com/intent/tweet?url=https://www.ikoconnect.com/blog/${slug}&text=${encodeURIComponent(
              title
            )}`,
            label: "Twitter (X)",
          },
          {
            href: `https://www.linkedin.com/sharing/share-offsite/?url=https://www.ikoconnect.com/blog/${slug}`,
            label: "LinkedIn",
          },
          {
            href: `https://www.facebook.com/sharer/sharer.php?u=https://www.ikoconnect.com/blog/${slug}`,
            label: "Facebook",
          },
        ].map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-sm underline text-[#00957F] hover:text-[#007965]"
          >
            {btn.label}
          </a>
        ))}
        <CopyButton text={`https://www.ikoconnect.com/blog/${slug}`} />
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12 rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 shadow-xl dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <h3 className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            🔧 Related Tools You’ll Love
          </h3>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <li
                key={tool.id}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:scale-[1.015] hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="h-12 w-12 flex-shrink-0">
                  <Image
                    src={tool.logo || "/images/logos/default.png"}
                    alt={`${tool.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <a
                    href={`/api/redirect-tools/${tool.id}`}
                    className="block hover:underline"
                    target="_blank"
                    rel="sponsored nofollow noopener"
                  >
                    <h4 className="mb-1 text-xl font-semibold text-[#00957F]">{tool.name}</h4>
                  </a>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{tool.description}</p>
                  {tool.categories?.length > 0 && (
                    <span className="inline-block rounded-full bg-[#00957F]/10 px-3 py-1 text-xs font-medium text-[#00957F]">
                      #{tool.categories[0]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="mt-16 rounded-lg bg-[#00957F] p-8 text-center text-white shadow-lg">
        <h3 className="mb-2 text-2xl font-bold">Do you want more articles like this?</h3>
        <p className="mb-4">
          Join our newsletter and receive the latest tips, tools, and remote job offers.
        </p>
        <Link
          href="/newsletter"
          className="inline-block rounded bg-white px-6 py-2 font-semibold text-[#00957F] transition hover:bg-gray-100"
        >
          Join now →
        </Link>
      </section>
    </article>
  );
}
