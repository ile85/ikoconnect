"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-36 overflow-hidden mx-auto max-w-screen-lg">
      {/* 1) Blobs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96
                   bg-gradient-to-tr from-teal-400 to-blue-300
                   opacity-30 filter blur-2xl
                   animate-blob z-10"
      />
      <div
        className="absolute -bottom-28 -right-28 w-80 h-80
                   bg-gradient-to-br from-purple-400 to-pink-300
                   opacity-20 filter blur-xl
                   animate-pulseFast z-10"
      />

      {/* 2) Frosted glass card */}
      <div
        className="relative z-20 mx-auto max-w-3xl
                   px-6 sm:px-8 lg:px-10 py-20
                   bg-white/60 backdrop-blur-md
                   rounded-3xl shadow-2xl text-center"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
          Unlock Your Freelance Flow
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Discover top-tier tools, exclusive guides & remote gigs curated to
          level up your side-hustle—no fluff, just impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools"
            className="inline-block px-6 py-3 sm:px-8 bg-teal-500 hover:bg-teal-600
                       text-white font-semibold rounded-full transition transform
                       hover:scale-105 active:scale-95"
          >
            🚀 Explore Tools
          </Link>
          <Link
            href="/community"
            className="inline-block px-6 py-3 sm:px-8 border-2 border-teal-500
                       text-teal-600 font-semibold rounded-full transition transform
                       hover:scale-105 active:scale-95 hover:bg-teal-50"
          >
            🤝 Join the Crew
          </Link>
        </div>
      </div>
    </section>
  );
}
