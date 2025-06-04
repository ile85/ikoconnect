// /var/www/ikoconnect/src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostHtmlBySlug, getPostSlugs } from "../../../lib/blog";
import { getAllTools, Tool } from "../../../lib/tools";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "../../../components/CopyButton";
import JSONLD from "../../../components/JSONLD";
import { generateBlogPostJsonLD } from "../../../lib/jsonldGenerator";

interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<PageParams["params"][]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const post = await getPostHtmlBySlug(params.slug);
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
      url: `https://www.ikoconnect.com/blog/${params.slug}`,
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
  const post = await getPostHtmlBySlug(params.slug);
  if (!post) return notFound();

  const { title, html, date, tags, author, coverImage, description } = post;
  const allTools = await getAllTools();

  // Compute reading time (200 wpm)
  const readingTime = Math.ceil(html.split(" ").length / 200);

  // Find related tools whose categories overlap with post tags (case-insensitive)
  const relatedTools: Tool[] = allTools.filter((tool) =>
    tool.categories.some((toolCategory: string) =>
      tags.some((postTag: string) => toolCategory.toLowerCase() === postTag.toLowerCase())
    )
  );

  const jsonldData = generateBlogPostJsonLD({
    url: `https://www.ikoconnect.com/blog/${params.slug}`,
    title,
    description,
    authorName: author || "IkoConnect Team",
    datePublished: date,
    dateModified: date,
    image: coverImage?.startsWith("http") ? coverImage : `/blog/${params.slug}/og.png`,
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
    <article className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* JSON-LD */}
      <JSONLD data={jsonldData} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-gray-700">{title}</span>
      </nav>

      {/* Title & Meta */}
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-[#00957F]">{title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Image
              src="/images/ikoconnect-square.png"
              alt="IkoConnect"
              width={28}
              height={28}
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
      </header>

      {/* Cover Image */}
      {coverImage && (
        <div className="rounded-xl overflow-hidden shadow-lg max-h-[450px]">
          <Image
            src={coverImage.startsWith("http") ? coverImage : coverImage}
            alt={`Cover image for ${title}`}
            width={1200}
            height={450}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}

      {/* Excerpt + Tags */}
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => {
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

      {/* Content */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Share Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          Share:
        </span>
        {[
          {
            href: `https://twitter.com/intent/tweet?url=https://www.ikoconnect.com/blog/${params.slug}&text=${encodeURIComponent(title)}`,
            label: "Twitter (X)",
          },
          {
            href: `https://www.linkedin.com/sharing/share-offsite/?url=https://www.ikoconnect.com/blog/${params.slug}`,
            label: "LinkedIn",
          },
          {
            href: `https://www.facebook.com/sharer/sharer.php?u=https://www.ikoconnect.com/blog/${params.slug}`,
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
        <CopyButton text={`https://www.ikoconnect.com/blog/${params.slug}`} />
      </div>

      {/* Related Tools */}
{relatedTools.length > 0 && (
  <section className="mt-12 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-xl">
    <h3 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
      🔧 Related Tools You’ll Love
    </h3>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {relatedTools.map((tool) => (
        <li
          key={tool.id}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.015] transition-all bg-white dark:bg-gray-800 flex items-start gap-4"
        >
          {/* Logo */}
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src={tool.logo || "/images/logos/default.png"}
              alt={`${tool.name} logo`}
              width={48}
              height={48}
              className="rounded-md"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <Link
              href={`/api/redirect-tools/${tool.id}`}
              className="block hover:underline"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <h4 className="text-xl font-semibold text-[#00957F] mb-1">
                {tool.name}
              </h4>
            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {tool.description}
            </p>

            {/* Optional: Show first tag */}
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



      {/* Newsletter CTA */}
      <section className="bg-[#00957F] text-white rounded-lg p-8 mt-16 text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Do you want more articles like this?</h3>
        <p className="mb-4">
          Join our newsletter and receive the latest tips, tools, and remote job offers.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-white text-[#00957F] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          Join now →
        </Link>
      </section>
    </article>
  );
}
