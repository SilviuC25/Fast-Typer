import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      wpm,
      accuracy,
      correctWords,
      wrongWords,
      language,
      difficulty,
      duration,
    } = body;

    const test = await prisma.test.create({
      data: {
        userId,
        wpm,
        accuracy,
        correctWords,
        wrongWords,
        language,
        difficulty,
        duration,
      },
    });

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error('Error saving test:', error);
    return NextResponse.json({ error: 'Failed to save test' }, { status: 500 });
  }
}
