'use client';

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-28 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-60 blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Think You’re Fast? How Fast Can You Type?
          </motion.h1>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <a
              href="#"
              className="relative inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              Start Test
              <span className="absolute -inset-px rounded-lg ring-1 ring-inset ring-white/20" aria-hidden="true"></span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
