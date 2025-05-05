// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeInUp">
          Welcome to <span className="text-purple-400">IkoConnect</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fadeInUp delay-200">
          Your ultimate hub for freelancers & remote workers — productivity tips, job boards, and affiliate tools to scale your digital hustle.
        </p>
        <div className="flex justify-center gap-4 animate-fadeInUp delay-400">
          <a
            href="/blog"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            📚 Read the Blog
          </a>
          <a
            href="/resources"
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            🛠 Tools
          </a>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -z-10 opacity-30">
        <div className="w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-30">
        <div className="w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
      </div>
    </main>
  );
}
