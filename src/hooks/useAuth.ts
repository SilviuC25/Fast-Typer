"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  exp: number;
}

export function useAuth(redirectIfUnauthenticated: boolean = false) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (redirectIfUnauthenticated) {
        router.push("/login");
      }
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        if (redirectIfUnauthenticated) {
          router.push("/login");
        }
        setUser(null);
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      if (redirectIfUnauthenticated) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [redirectIfUnauthenticated, router]);

  return { user, loading };
}
