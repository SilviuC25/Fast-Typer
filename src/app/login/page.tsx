'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  exp: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        router.push(`/profile/${decoded.username}`);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.token;

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        localStorage.setItem("token", token);

        router.push(`/profile/${decoded.username}`);
      } catch (err) {
        console.error("Failed to decode token", err);
        setError("Invalid token received.");
      }
    } else {
      const data = await res.json();
      setError(data.message || "Login failed.");
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
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Login</h1>
            <form onSubmit={handleLogin} className="space-y-5">
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
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-white text-black border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-transform duration-300 hover:scale-105 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-5 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-indigo-500 hover:text-indigo-400 transition duration-200 hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
