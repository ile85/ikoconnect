// /var/www/ikoconnect/src/app/blog/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { buildBasicMetadata } from "@/lib/metadata";
import JSONLD from "@/components/JSONLD";
import { generateWebPageJsonLD } from "@/lib/jsonldGenerator";
import { getAllPosts, PostSummary } from "@/lib/blog";

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = buildBasicMetadata({
  title: "Freelance Blog – Tips, Tools, and Remote Insights",
  description:
    "Read expert tips, explore tools, and stay updated with the freelance world at IkoConnect.",
  path: "/blog",
  ogImage: "/images/og-blog.png",
});

interface BlogPageProps {
  searchParams: { page?: string; tag?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  // 1) Pull `page` and `tag` out of the URL (e.g. /blog?tag=foo&page=2)
  const rawPage = searchParams.page || "1";
  const activeTag = searchParams.tag || "";

  let currentPage = parseInt(rawPage, 10);
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }

  // 2) Fetch all posts (sorted newest-first) via our lib function
  const allPosts: PostSummary[] = getAllPosts();

  // 3) Build a sorted array of unique tags (for the tag filter UI)
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags))
  ).sort();

  // 4) If a tag is active, filter the posts accordingly
  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  // 5) Compute total pages, then clamp `currentPage`
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    // If someone tries /blog?page=999 (beyond range), redirect back to page 1
    redirect("/blog");
  }

  // 6) Slice out exactly POSTS_PER_PAGE posts for the current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // 7) Generate JSON-LD for the current listing (CollectionPage)
  const urlFragment = activeTag
    ? `?tag=${encodeURIComponent(activeTag)}&page=${currentPage}`
    : `?page=${currentPage}`;
  const fullPageUrl = `https://ikoconnect.com/blog${urlFragment}`;

  const jsonldData = generateWebPageJsonLD({
    url: fullPageUrl,
    name: "Freelance Blog – Tips, Tools, and Remote Insights",
    description: metadata.description!,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <JSONLD data={jsonldData} />

      <h1 className="text-4xl font-bold text-center mb-8 text-[#00957F]">
        Blog
      </h1>

      {/* ───── Tag Filter ───── */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Link
          href="/blog"
          className={`px-4 py-1 border rounded-full text-sm ${
            !activeTag
              ? "bg-[#00957F] text-white"
              : "hover:bg-[#E0F7F2] text-gray-700"
          }`}
        >
          All
        </Link>
        {allTags.map((t) => {
          const href = `/blog?tag=${encodeURIComponent(t)}`;
          return (
            <Link
              key={t}
              href={href}
              className={`px-4 py-1 border rounded-full text-sm ${
                activeTag === t
                  ? "bg-[#00957F] text-white"
                  : "hover:bg-[#E0F7F2] text-gray-700"
              }`}
            >
              #{t}
            </Link>
          );
        })}
      </div>

      {/* ───── Blog Posts Grid ───── */}
      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          ⚠️ No blog posts found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              {
                month: "long",
                year: "numeric",
                day: "numeric",
              }
            );

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border rounded-xl p-4 shadow hover:shadow-md transition-all bg-white dark:bg-gray-800"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {post.coverImage && (
                    <div className="
                      w-full          /* full width on mobile */
                      sm:w-48         /* exactly 12rem on ≥sm */
                      h-32            /* exactly 8rem tall */
                      bg-gray-100
                      flex items-center justify-center
                      overflow-hidden
                      rounded-md
                    ">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-[#00957F] hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                      {post.excerpt || "No description available."}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ───── Pagination Controls ───── */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            const href = activeTag
              ? `/blog?tag=${encodeURIComponent(activeTag)}&page=${page}`
              : `/blog?page=${page}`;
            return (
              <Link
                key={page}
                href={href}
                className={`px-4 py-2 border rounded ${
                  page === currentPage
                    ? "bg-[#00957F] text-white"
                    : "hover:bg-[#E0F7F2] text-gray-700"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
