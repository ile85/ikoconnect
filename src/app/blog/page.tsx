// src/app/blog/page.tsx
import { getAllPosts, PostSummary } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default async function BlogPage() {
  const posts: PostSummary[] = getAllPosts();
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">📝 Blog</h1>
      {/* Client-only анимации */}
      <BlogList posts={posts} />
    </section>
  );
}
