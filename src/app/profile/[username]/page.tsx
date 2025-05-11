"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/profile/${username}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error(error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-indigo-600 font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Profile - {userData.username}
        </h1>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-700">Username</p>
            <p className="text-lg text-gray-700">{userData.username}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-700">Email</p>
            <p className="text-lg text-gray-700">{userData.email}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-700">Max WPM</p>
            <p className="text-lg text-gray-700">{userData.maxWPM}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-700">Total Tests</p>
            <p className="text-lg text-gray-700">{userData.totalTests}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-700">Average Accuracy</p>
            <p className="text-lg text-gray-700">{userData.averageAccuracy}%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
