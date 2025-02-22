import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const prisma = new PrismaClient()
const RESET_TOKEN_EXPIRY = 3600;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Prevent user enumeration by not revealing if email exists
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a reset link will be sent' })
    }

    // Generate the reset token and expiry
    const resetToken = crypto.randomUUID()
    const resetTokenExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY * 1000)

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    })

    // TODO: Implement sending email with reset link
    // Send email with reset link 

    return res.status(200).json({
      message: 'If the email exists, a reset link will be sent',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}