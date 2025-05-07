// src/app/blog/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">📝 Blog</h1>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-6"
      >
        {posts.map((post, i) => (
          <motion.li
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="border rounded-xl p-6 shadow hover:shadow-md transition-all"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* ... */}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
