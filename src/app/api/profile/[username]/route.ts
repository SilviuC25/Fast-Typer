import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ message: "Invalid username" }, { status: 400 });
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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tests: { wpm: number; accuracy: number }[] = await prisma.test.findMany({
      where: { userId: user.id },
      select: { wpm: true, accuracy: true },
    });

    const totalTests = tests.length;

    const maxWPM =
      totalTests > 0 ? Math.max(...tests.map((t: { wpm: number }) => t.wpm)) : null;

    const averageAccuracy =
      totalTests > 0
        ? tests.reduce(
            (sum: number, t: { accuracy: number }) => sum + t.accuracy,
            0
          ) / totalTests
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
