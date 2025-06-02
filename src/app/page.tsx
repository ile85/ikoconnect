// /var/www/ikoconnect/src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import RecommendationsClient from "@/components/RecommendationsClient";
import FeaturedJobs from "@/components/FeaturedJobs";
import JSONLD from "@/components/JSONLD";
import { getAllRecommendations } from "@/lib/recommendations";
import { getAllPosts, PostSummary } from "@/lib/blog";
import { generateOrganizationJsonLD } from "@/lib/jsonldGenerator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IkoConnect – Empowering Freelancers to Work Smarter",
  description: "Discover tools, jobs & guides to boost your remote workflow.",
  openGraph: {
    title: "IkoConnect – Freelance Tools & Jobs",
    description: "Explore the top remote tools, freelance jobs, and tips.",
    url: "https://ikoconnect.com",
    images: [{ url: "/images/og-home.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IkoConnect – Remote Work Tools",
    description: "Freelance smarter with curated resources and guides.",
    images: ["/images/og-home.png"],
  },
};

export default function HomePage() {
  // Fetch data
  const recommendations = getAllRecommendations();
  const allPosts: PostSummary[] = getAllPosts();
  const posts = allPosts.slice(0, 4); // Show exactly 4 posts now
  const jsonld = generateOrganizationJsonLD({
    name: "IkoConnect",
    url: "https://ikoconnect.com",
    logoUrl: "https://ikoconnect.com/images/logos/default.png",
  });

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* JSON-LD for Organization */}
      <JSONLD data={jsonld} />

      {/* HERO SECTION */}
      <Hero />

      {/* FEATURE CARDS */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
          <FeatureCards />
        </div>
      </section>

      {/* BLOG PREVIEW AS GRID: FIXED TO 4 CARDS */}
      <section className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Latest from the Blog</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border rounded-xl p-4 shadow hover:shadow-md transition-all bg-white dark:bg-gray-800 flex flex-col"
            >
              <Link href={`/blog/${post.slug}`} className="group block flex-1">
                <div className="flex flex-col h-full">
                  {/* ICON / IMAGE CONTAINER – make it larger so icons display */}
                  <div className="w-full h-32 sm:h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-md mb-4">
                    <img
                      alt={post.title}
                      src={post.coverImage}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-[#00957F] hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-6">
          <Link href="/blog" className="text-teal-600 hover:underline">
            See All Posts →
          </Link>
        </div>
      </section>

      {/* RECOMMENDED RESOURCES */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            ✨ Recommended Resources
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Curated tools to level up your freelance workflow — productivity, automation, writing & more.
          </p>
          <RecommendationsClient items={recommendations} />
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
          <FeaturedJobs />
        </div>
      </section>
    </main>
  );
}
