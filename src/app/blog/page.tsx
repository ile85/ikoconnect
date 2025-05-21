// src/app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { redirect } from "next/navigation";

const POSTS_PER_PAGE = 6;
const blogDir = path.join(process.cwd(), "content", "blog");

function getAllPosts() {
  const files = fs
    .readdirSync(blogDir)
    .filter((fileName) => {
      const fullPath = path.join(blogDir, fileName);
      return fs.statSync(fullPath).isFile() && fileName.endsWith(".md");
    });

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(blogDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        date: data.date || null,
        tags: data.tags || [],
        coverImage: data.coverImage || "/images/default-cover.jpg",
        excerpt: data.excerpt || "",
      };
    })
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string };
}) {
  const allPosts = getAllPosts();
  const activeTag = searchParams.tag || "";
  const currentPage = parseInt(searchParams.page || "1");
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  const filtered = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filtered.slice(start, start + POSTS_PER_PAGE);

  if (currentPage > totalPages && totalPages > 0) redirect("/blog");

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00957F]">Blog</h1>

      {/* Таг филтер */}
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
        {allTags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`px-4 py-1 border rounded-full text-sm ${
              activeTag === tag
                ? "bg-[#00957F] text-white"
                : "hover:bg-[#E0F7F2] text-gray-700"
            }`}
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Листа на блог постови */}
      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">⚠️ No blog posts found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="overflow-hidden rounded-lg shadow hover:shadow-xl transition">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h2 className="text-lg font-semibold group-hover:text-[#00957F]">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Пагинација */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
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
