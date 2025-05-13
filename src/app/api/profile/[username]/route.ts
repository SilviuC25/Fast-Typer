import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  context: any // 👈 FIX esențial aici!
) {
  const username = context?.params?.username;

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ message: 'Invalid username' }, { status: 400 });
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
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
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
  } catch (err) {
    console.error('Error in profile GET route:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
