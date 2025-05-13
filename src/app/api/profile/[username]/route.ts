import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// ✅ Nu tipăm manual contextul
export async function GET(
  req: NextRequest,
  context: { params: { username: string } } // ← Așa e permis de Next.js!
) {
  const { username } = context.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tests: { wpm: number; accuracy: number }[] = await prisma.test.findMany({
      where: {
        userId: user.id,
      },
      select: {
        wpm: true,
        accuracy: true,
      },
    });

    const totalTests = tests.length;
    const maxWPM = totalTests > 0 ? Math.max(...tests.map((t) => t.wpm)) : null;
    const averageAccuracy =
      totalTests > 0
        ? tests.reduce((sum, t) => sum + t.accuracy, 0) / totalTests
        : null;

    return NextResponse.json({
      ...user,
      stats: {
        totalTests,
        maxWPM,
        averageAccuracy,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
