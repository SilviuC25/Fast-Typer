"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="group relative p-8 rounded-xl bg-white/5 backdrop-blur-md overflow-hidden transition-transform duration-500 transform hover:scale-105">
          <div className="absolute inset-0 z-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-indigo-600 before:animate-drawBorder"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Register</h1>
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-white text-black border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white text-black border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-white text-black border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-white text-black border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-5 text-center">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-indigo-500 hover:text-indigo-400 transition duration-200 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
