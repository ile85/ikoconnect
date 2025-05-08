// src/components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white"
    >
      <div className="text-center px-6">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl font-extrabold mb-4 drop-shadow-lg"
        >
          Empower Your Freelancing Journey
        </motion.h1>
        {/* ...buttons... */}
      </div>
    </motion.section>
  );
}
