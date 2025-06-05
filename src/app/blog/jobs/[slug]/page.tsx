// /var/www/ikoconnect/src/app/blog/jobs/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { marked } from "marked";
import Link from "next/link"; // ← Added for breadcrumb links

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getJobPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      images: [post.data.coverImage || "/images/og-jobs.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.description,
      images: [post.data.coverImage || "/images/og-jobs.png"],
    },
  };
}

function getJobPostBySlug(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", "jobs", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  return matter(fileContent);
}

export default function JobPostPage({ params }: { params: { slug: string } }) {
  const post = getJobPostBySlug(params.slug);
  if (!post) return notFound();

  const htmlContent = marked(post.content);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      {/* ─────────── Breadcrumb ─────────── */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>›</li>
          <li>
            <Link href="/blog/jobs" className="hover:underline">
              Jobs
            </Link>
          </li>
          <li>›</li>
          <li className="font-semibold">{post.data.title}</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
      <div className="text-gray-600 mb-6">
        <p>{post.data.date?.slice(0, 10)}</p>
        <p>{post.data.tags?.join(" • ")}</p>
      </div>

      {post.data.coverImage && (
        <img src={post.data.coverImage} alt="Cover" className="mb-8 rounded-lg shadow" />
      )}

      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}
