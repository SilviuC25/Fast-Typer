import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { userId, wpm, accuracy, language } = await request.json()

    const score = await prisma.score.create({
        data: {
            userId,
            wpm,
            accuracy,
            language
        }
    })

    return NextResponse.json(score)
}
