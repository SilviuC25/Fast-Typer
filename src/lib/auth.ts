// /lib/auth.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { prisma } from "@/lib/prisma";

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  exp: number;
}

export async function getUserFromToken(req: Request | { headers: any }) {
  const cookieHeader = "headers" in req ? req.headers.get("cookie") : cookies().toString();

  const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 < Date.now()) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch {
    return null;
  }
}
