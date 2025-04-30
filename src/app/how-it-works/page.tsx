'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorksPage() {
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 }
    }),
  };

  const features = [
    {
      title: "Practice Mode (No Account Needed)",
      description:
        "You can test your typing speed instantly, no account required. At the end, you'll see your WPM (Words Per Minute).",
    },
    {
      title: "Logged-In Mode",
      description:
        "When you're logged in, we save your stats: WPM, accuracy, correct/incorrect keystrokes, and session history.",
    },
    {
      title: "Randomized Text",
      description:
        "Typing tests use randomly generated words based on difficulty (common vs rare words). Every test is unique.",
    },
    {
      title: "Game Modes & Time Options",
      description:
        "Select from 15s, 30s, 60s, or 120s time limits. You can also choose difficulty level before starting.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-24 lg:py-32 text-gray-900">
      <motion.h1
        className="text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How Fast Typer Works
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition"
            initial="initial"
            animate="animate"
            variants={cardVariants}
            custom={i}
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">
              {feature.title}
            </h2>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          href="/practice"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold text-lg transition hover:bg-indigo-500"
        >
          Try It Now
        </Link>
      </motion.div>
    </main>
  );
}
