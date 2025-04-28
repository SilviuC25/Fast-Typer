import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const { password: _, ...userWithoutPassword } = newUser

        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
