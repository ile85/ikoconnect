// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
      {/* Animated bg glow */}
      <div className="absolute inset-0 opacity-30 animate-pulse bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Empower Your Freelancing Journey
        </h1>
        <p className="text-lg sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          IkoConnect is your one-stop hub for the best tools, resources, and tips to boost productivity and grow your remote business.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105"
          >
            Explore Blog
          </Link>
          <Link
            href="/resources"
            className="inline-block border border-white/40 hover:border-white px-6 py-3 rounded-full font-semibold transition-transform transform hover:-translate-y-1"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
