"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  exp: number;
}

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUsername(decoded.username);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-4 lg:px-8 backdrop-blur-md"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <img className="h-11 w-auto" src="/typing_logo.png" alt="Typing Logo" />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {[
            { href: "/", label: "Home" },
            { href: "/leaderboard", label: "Leaderboard" },
            { href: "/how-it-works", label: "How it works" },
            { href: "/practice", label: "Practice Mode" },
            {
              href: username ? `/profile/${username}` : "/login",
              label: "Profile",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-gray-900 transition duration-200 hover:text-indigo-600 hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {username ? (
            <span className="text-sm font-semibold text-indigo-700">
              Welcome, {username}
            </span>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition duration-200"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </motion.nav>
    </header>
  );
}
