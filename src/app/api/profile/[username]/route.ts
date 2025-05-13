import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sau import { PrismaClient } și new PrismaClient()

interface Test {
  wpm: number;
  accuracy: number;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tests: Test[] = await prisma.test.findMany({
      where: { userId: user.id },
      select: { wpm: true, accuracy: true },
    });

    const totalTests = tests.length;

    let maxWPM: number | null = null;
    let averageAccuracy: number | null = null;

    if (totalTests > 0) {
      const wpmValues = tests.map((test: Test) => test.wpm);
      maxWPM = Math.max(...wpmValues);

      const accuracySum = tests.reduce((acc: number, test: Test) => acc + test.accuracy, 0);
      averageAccuracy = accuracySum / totalTests;
    }

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
