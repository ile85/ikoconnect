import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostHtmlBySlug, getPostSlugs } from "@/lib/blog";
import { getAllTools } from "@/lib/tools";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "@/components/CopyButton";

interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<PageParams["params"][]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageParams
): Promise<Metadata> {
  const post = await getPostHtmlBySlug(props.params.slug);
  if (!post) return {};

  const ogImage = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `https://www.ikoconnect.com${post.coverImage || "/images/og/default.png"}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.ikoconnect.com/blog/${props.params.slug}`,
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}


export default async function BlogPost({ params }: PageParams) {
  const post = await getPostHtmlBySlug(params.slug);
  const tools = await getAllTools();

  if (!post) return notFound();

  const { title, html, date, tags, author, coverImage, description } = post;

  const readingTime = Math.ceil(html.split(" ").length / 200);

  const relatedTools = tools.filter((tool) =>
    tags.some((tag: string) =>
      tool.tags?.map((t: string) => t.toLowerCase()).includes(tag.toLowerCase())
    )
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/blog" className="hover:underline">Blog</Link> /{" "}
        <span className="text-gray-700">{title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-[#00957F]">{title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <p>📅 {date}</p>
        <p>✍️ {author || "IkoConnect Team"}</p>
        <p>⏱️ {readingTime} min. reading</p>
      </div>

      {/* OG Image */}
      {coverImage && (
        <div className="rounded-lg overflow-hidden shadow">
          <Image
            src={coverImage}
            alt={title}
            width={1000}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <Link
            key={tag}
            href={`/blog?tag=${tag}`}
            className="text-sm px-3 py-1 rounded-full bg-[#E0F7F2] text-[#00957F] font-medium"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Share buttons */}
      <div className="flex gap-4 items-center mt-6">
        <span className="text-sm font-semibold text-gray-600">Share:</span>
        {[
          {
            href: `https://twitter.com/intent/tweet?url=https://ikoconnect.com/blog/${params.slug}&text=${encodeURIComponent(title)}`,
            label: "Twitter (X)",
          },
          {
            href: `https://www.linkedin.com/sharing/share-offsite/?url=https://ikoconnect.com/blog/${params.slug}`,
            label: "LinkedIn",
          },
          {
            href: `https://www.facebook.com/sharer/sharer.php?u=https://ikoconnect.com/blog/${params.slug}`,
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
        <CopyButton text={`https://ikoconnect.com/blog/${params.slug}`} />
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="mt-12 space-y-4">
          <h3 className="text-2xl font-bold">Related tools</h3>
          <ul className="grid sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <li key={tool.id} className="border rounded p-4 shadow-sm">
                <Link href={`/resources#${tool.id}`}>
                  <h4 className="text-lg font-semibold text-[#00957F] hover:underline">
                    {tool.name}
                  </h4>
                </Link>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="bg-[#00957F] text-white rounded-lg p-6 mt-16 text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Сакаш повеќе вакви статии?</h3>
        <p className="mb-4">Join our newsletter and receive the latest tips, tools, and remote job offers.</p>
        <Link
          href="/newsletter"
          className="inline-block bg-white text-[#00957F] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          Join now →
        </Link>
      </div>
    </article>
  );
}
