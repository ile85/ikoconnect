import { redirect } from "next/navigation";
import { Metadata } from "next";

import { buildBasicMetadata } from "@/lib/metadata";
import JSONLD from "@/components/JSONLD";
import { generateWebPageJsonLD } from "@/lib/jsonldGenerator";
import { getAllPosts, PostSummary } from "@/lib/blog";
import BlogHero from "@/components/blog/BlogHero";
import CategoryDropdown from "@/components/CategoryDropdown";
import BlogList from "@/components/BlogList";

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = buildBasicMetadata({
  title: "Freelance Blog – Tips, Tools, and Remote Insights",
  description:
    "Read expert tips, explore tools, and stay updated with the freelance world at IkoConnect.",
  path: "/blog",
  ogImage: "/images/og-blog.png",
});

interface BlogPageProps {
  searchParams: URLSearchParams;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // ✅ Create URL instance manually from current request (next 15 trick)
  const url = new URL(`https://dummy.com?${searchParams}`);
  const rawPage = url.searchParams.get("page") || "1";
  const activeTag = url.searchParams.get("tag") || "";

  let currentPage = parseInt(rawPage, 10);
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }

  const allPosts: PostSummary[] = getAllPosts();
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags))).sort();

  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    redirect("/blog");
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const urlFragment = activeTag
    ? `?tag=${encodeURIComponent(activeTag)}&page=${currentPage}`
    : `?page=${currentPage}`;
  const fullPageUrl = `https://www.ikoconnect.com/blog${urlFragment}`;

  const jsonldData = generateWebPageJsonLD({
    url: fullPageUrl,
    name: "Freelance Blog – Tips, Tools, and Remote Insights",
    description: metadata.description!,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <JSONLD data={jsonldData} />
      <BlogHero />
      <CategoryDropdown allTags={allTags} />

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">⚠️ No blog posts found.</p>
      ) : (
        <BlogList posts={paginatedPosts} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            const href = activeTag
              ? `/blog?tag=${encodeURIComponent(activeTag)}&page=${page}`
              : `/blog?page=${page}`;
            return (
              <a
                key={page}
                href={href}
                className={`px-4 py-2 border rounded ${
                  page === currentPage
                    ? "bg-[#00957F] text-white"
                    : "hover:bg-[#E0F7F2] text-gray-700"
                }`}
              >
                {page}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
