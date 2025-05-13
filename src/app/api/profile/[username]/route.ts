import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: { username: string } }
) {
  const { username } = context.params;

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

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      select: { wpm: true, accuracy: true },
    });

    const totalTests = tests.length;
    const maxWPM = totalTests > 0 ? Math.max(...tests.map((t: { wpm: number }) => t.wpm)) : null;

    const averageAccuracy =
      totalTests > 0
        ? tests.reduce((sum: number, t: { accuracy: number }) => sum + t.accuracy, 0) / totalTests
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
