// src/app/profile/[username]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Tipuri pentru datele de la API
type UserStats = {
  maxWPM: number | null;
  totalTests: number;
  averageAccuracy: number | null;
};

type UserData = {
  username: string;
  email: string;
  stats: UserStats;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/profile/${username}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
      </div>
    );
  }

  if (!userData) return null;

  const { email, stats } = userData;

  return (
    <div className="min-h-screen px-4 py-12 flex justify-center items-start bg-gray-50 dark:bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl rounded-3xl shadow-xl p-8 space-y-8 bg-white dark:bg-zinc-800"
      >
        <div className="relative z-10 border-b pb-4 border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                @{userData.username}
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {email}
              </p>
            </div>

            <button
              onClick={() => router.push(`/profile/${username}/recent-tests`)}
              className="relative group px-4 py-2 text-sm font-medium text-gray-800 hover:bg-indigo-50 hover:cursor-pointer rounded-md transition overflow-hidden"
            >
              <span className="relative z-10">View Recent Tests</span>
              <span
                className="absolute inset-0 rounded-md border-2 border-indigo-600 opacity-0 group-hover:opacity-100 group-hover:animate-drawBorder pointer-events-none"
              ></span>
            </button>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            label="Max WPM"
            value={stats?.maxWPM ?? "N/A"}
            color="text-green-600"
          />
          <StatCard
            label="Total Tests"
            value={stats?.totalTests ?? "N/A"}
            color="text-blue-600"
          />
          <StatCard
            label="Average Accuracy"
            value={
              stats?.averageAccuracy != null
                ? `${stats.averageAccuracy.toFixed(1)}%`
                : "N/A"
            }
            color="text-purple-600"
          />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 shadow transition-all"
    >
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
        {label}
      </p>
      <p
        className={`text-2xl font-semibold ${
          color ?? "text-zinc-800 dark:text-white"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}
