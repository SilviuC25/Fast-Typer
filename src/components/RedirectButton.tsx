'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface RedirectButtonProps {
  buttonText: string;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ buttonText }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <motion.div
      className="mt-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="relative inline-block group">
        <Link
          href={isLoggedIn ? "/game" : "/practice"}
          className="relative z-10 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold text-lg transition duration-300 hover:bg-indigo-500 hover:scale-105"
        >
          {buttonText}
        </Link>
        <div className="absolute inset-0 z-0 rounded-md pointer-events-none before:absolute before:inset-0 before:rounded-md before:border-2 before:border-indigo-600 before:opacity-0 group-hover:before:opacity-100 before:animate-drawBorder transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default RedirectButton;
