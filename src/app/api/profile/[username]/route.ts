import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Nu mai e nevoie de interface Test, tiparea este implicită
export async function GET(
  request: NextRequest,
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

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      select: { wpm: true, accuracy: true },
    });

    const totalTests = tests.length;

    return NextResponse.json({
      ...user,
      stats: {
        totalTests
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
