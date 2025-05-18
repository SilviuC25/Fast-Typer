'use client';

import { motion, AnimatePresence } from "framer-motion";
import RedirectButton from "@/components/RedirectButton";

export default function HowItWorksPage() {
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
        How FastTyper Works
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="group relative p-6 rounded-xl bg-white backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 border border-indigo-200 hover:scale-[1.02]">
                <div className="absolute inset-0 z-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-indigo-600 before:opacity-0 group-hover:before:opacity-100 before:animate-drawBorder transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold mb-2 text-indigo-600">
                    {feature.title}
                  </h2>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <RedirectButton buttonText="Try It Now" />
    </main>
  );
}
