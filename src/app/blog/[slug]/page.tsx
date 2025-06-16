// src/app/blog/[slug]/page.tsx — PART 1 of 3 (Lines 1–170 approx.)

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

// ----------- Static Route Generation -----------
interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<PageParams["params"][]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ----------- Metadata Generation -----------
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostHtmlBySlug(slug);
  if (!post) return {};

  const ogImageAbsolute = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://www.ikoconnect.com${post.coverImage || "/images/og/default.png"}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.ikoconnect.com/blog/${slug}`,
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

// ----------- MAIN COMPONENT -----------
export default async function BlogPost({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostHtmlBySlug(slug);
  if (!post) return notFound();

  const { title, html, date, tags, author, coverImage, description } = post;
  const allTools = await getAllTools();

  const readingTime = Math.ceil(html.split(" ").length / 200); // ~200 wpm

  const relatedTools: Tool[] = allTools.filter((tool) =>
    Array.isArray(tool.categories) &&
    tool.categories.some((toolCategory) =>
      tags.some((postTag) =>
        toolCategory.toLowerCase() === postTag.toLowerCase()
      )
    )
  );

  const jsonldData = generateBlogPostJsonLD({
    url: `https://www.ikoconnect.com/blog/${slug}`,
    title,
    description,
    authorName: author || "IkoConnect Team",
    datePublished: date,
    dateModified: date,
    image: coverImage?.startsWith("http")
      ? coverImage
      : `/blog/${slug}/og.png`,
  });

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
    <article className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* -------- SEO Structured Data -------- */}
      <JSONLD data={jsonldData} />

      {/* -------- Breadcrumbs -------- */}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { href: `/blog/${slug}`, label: title },
        ]}
      />

      {/* -------- Header Section -------- */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {coverImage && (
          <Image
            src={coverImage}
            alt={`${title} logo`}
            width={64}
            height={64}
            className="rounded-xl border bg-white p-1 shadow"
          />
        )}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00957F] leading-tight">
            {title}
          </h1>
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
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
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

      {/* Part 2 coming next... */}
      {/* -------- Description & Tags -------- */}
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => {
              const colorClasses = tagColors[tag] || "bg-gray-100 text-gray-800";
              return (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`text-xs px-3 py-1 rounded-full font-medium hover:brightness-95 transition ${colorClasses}`}
                >
                  🏷️ #{tag}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* -------- Blog Content -------- */}
      <div
        className="prose dark:prose-invert prose-lg max-w-none mt-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* -------- Comments Section -------- */}
      <section className="mt-16">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          💬 Join the Conversation
        </h3>
        <BlogComments urlPath={`/blog/${slug}`} />
      </section>

      {/* -------- Share Section -------- */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Share:
          </span>
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
              rel="noopener noreferrer"
              className="text-sm text-[#00957F] underline hover:text-[#007965]"
            >
              {btn.label}
            </a>
          ))}
          <CopyButton text={`https://www.ikoconnect.com/blog/${slug}`} />
        </div>
      </section>

      {/* Part 3 coming next... */}
      {/* -------- Related Tools -------- */}
      {relatedTools.length > 0 && (
        <section className="mt-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-xl">
          <h3 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
            🔧 Tools that Match Your Interests
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool) => (
              <li
                key={tool.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.015] transition-all bg-white dark:bg-gray-800 flex items-start gap-4"
              >
                <div className="w-12 h-12 flex-shrink-0">
                  <Image
                    src={tool.logo || "/images/logos/default.png"}
                    alt={`${tool.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-md object-contain bg-white dark:bg-gray-900 p-1 border"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/api/redirect-tools/${tool.id}`}
                    className="block hover:underline"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <h4 className="text-lg font-semibold text-[#00957F] mb-1">
                      {tool.name}
                    </h4>
                  </Link>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
                    {tool.description}
                  </p>
                  {tool.categories?.length > 0 && (
                    <span className="inline-block text-xs bg-[#00957F]/10 text-[#00957F] px-3 py-1 rounded-full font-medium">
                      #{tool.categories[0]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* -------- Newsletter CTA -------- */}
      <section className="mt-20 bg-[#00957F] text-white rounded-xl py-12 px-8 shadow-xl text-center space-y-6">
        <h3 className="text-3xl font-extrabold">🔥 Want More Like This?</h3>
        <p className="text-lg max-w-2xl mx-auto">
          Join our free newsletter to receive new blog posts, tools, and remote job resources straight to your inbox.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-white text-[#00957F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Subscribe Now →
        </Link>
      </section>
    </article>
  );
}
