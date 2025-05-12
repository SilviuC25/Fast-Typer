'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  exp: number;
}

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUsername(decoded.username);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setDropdownOpen(false);
    router.push("/");
  };

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
          {[{ href: "/", label: "Home" }, { href: "/leaderboard", label: "Leaderboard" }, { href: "/how-it-works", label: "How it works" }, { href: "/practice", label: "Practice Mode" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end relative" ref={dropdownRef}>
          {username ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition cursor-pointer"
              >
                Welcome, {username}
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-52 z-50"
                  >
                    <div className="group relative p-2 rounded-xl bg-white shadow-xl ring-1 ring-indigo-300 overflow-hidden">
                      <div className="absolute inset-0 z-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-indigo-600 before:animate-drawBorder"></div>

                      <div className="relative z-10">
                        <button
                          onClick={() => {
                            router.push(`/profile/${username}`);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-gray-800 hover:bg-indigo-100 hover:cursor-pointer rounded-md transition"
                        >
                          See Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:cursor-pointer rounded-md transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </motion.nav>
    </header>
  );
}
