// src/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00BFA6] to-[#00957F] text-white overflow-hidden"
    >
      {/* Визуелни елементи */}
      <div className="absolute top-0 left-0 w-52 sm:w-80 h-52 sm:h-80 bg-white/10 rounded-full blur-3xl opacity-50 animate-pulse -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-2xl opacity-40 animate-ping z-0" />

      {/* Главна содржина */}
      <div className="relative z-10 px-6 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl"
        >
          Empowering Freelancers to{" "}
          <span className="text-yellow-300 underline decoration-wavy underline-offset-8 drop-shadow-sm italic">
            Work Smarter
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          Discover remote tools, guides, and job resources designed for productivity and independence.
        </motion.p>

        {/* Повик за акција */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link
            href="/resources"
            className="px-6 py-3 bg-white text-[#00957F] font-semibold rounded shadow hover:bg-gray-100 transition"
          >
            Browse Tools
          </Link>
          <Link
            href="/newsletter"
            className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-[#00957F] transition"
          >
            Join the Community
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
