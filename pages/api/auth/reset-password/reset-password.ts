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
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    })

    // TODO: Implement invalidating existing sessions

    return res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Password reset error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}