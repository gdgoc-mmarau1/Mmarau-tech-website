import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
const SALT_ROUNDS = 12

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password, username } = req.body

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // add the user to db
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash: hashedPassword,
        emailToken: crypto.randomUUID(),
        tokenExpires: new Date(Date.now() + 3600000), 
      },
    })

    // TODO: email verification
    // Send verification email (future feature)

    return res.status(201).json({
      message: 'User created. Please check your email for verification.',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}