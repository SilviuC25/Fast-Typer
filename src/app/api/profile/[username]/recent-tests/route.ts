import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const username = context.params?.username;

  if (!username || typeof username !== "string") {
    return NextResponse.json({ message: "Invalid username" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        wpm: true,
        accuracy: true,
        correctWords: true,
        wrongWords: true,
        language: true,
        difficulty: true,
        duration: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
 