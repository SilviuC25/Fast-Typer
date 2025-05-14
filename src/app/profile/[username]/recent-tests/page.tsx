"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Test = {
  id: string;
  wpm: number;
  accuracy: number;
  correctWords: number;
  wrongWords: number;
  language: string;
  difficulty: string;
  duration: number;
  createdAt: string;
};

export default function RecentTestsPage() {
  const [tests, setTests] = useState<Test[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { username } = useParams();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(`/api/profile/${username}/recent-tests`);
        if (!res.ok) throw new Error("Error fetching tests.");
        const data = await res.json();
        setTests(data.tests);
      } catch (error) {
        console.error(error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchTests();
  }, [username, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
      </div>
    );
  }

  if (!tests || tests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500 text-xl font-medium">
        No recent tests found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold text-indigo-600 text-center mb-10 tracking-tight"
      >
        Your Recent Typing Tests
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-5 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 z-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-indigo-500 before:opacity-0 group-hover:before:opacity-100 before:animate-drawBorder"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-zinc-500">
                  {new Date(test.createdAt).toLocaleString()}
                </p>
                <span className="text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                  {test.language} · {test.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="WPM" value={test.wpm} highlight />
                <Stat label="Accuracy" value={`${test.accuracy.toFixed(1)}%`} />
                <Stat label="Correct Words" value={test.correctWords} />
                <Stat label="Wrong Words" value={test.wrongWords} />
                <Stat label="Duration" value={`${test.duration}s`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-zinc-500 dark:text-zinc-400">{label}</p>
      <p
        className={`font-semibold ${
          highlight
            ? "text-indigo-600 dark:text-indigo-400 text-lg"
            : "text-zinc-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
