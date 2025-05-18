import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = body

    if (!email || !username || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ message: 'Email or username already in use' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash
      }
    })

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' })

    const response = NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username
      }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'strict',
    })

    return response

  } catch (err) {
    console.error('REGISTER ERROR:', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
