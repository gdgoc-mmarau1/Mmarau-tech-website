import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { FormState, ResetPasswordFormSchema } from '../../lib/definations'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()
const SALT_ROUNDS = 12

export default async function resetPassword(state: FormState, formData: FormData): Promise<FormState> {
  // assign inputs from form payload
  const [token, password, confirmPassword] = [formData.get("token"), formData.get("password"), formData.get("confirmPassword")]



  //validate fields
  const validatedFields = ResetPasswordFormSchema.safeParse({ token, password, confirmPassword });

  //returns if all the checks fail
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error?.flatten().fieldErrors,
    }
  }


  //extract fields from the validated data
  const { token: validatedToken, password: validatedPassword } = validatedFields.data;



  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: validatedToken,
        resetTokenExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return { message: 'Invalid or expired token' }
    }

    const hashedPassword = await bcrypt.hash(validatedPassword, SALT_ROUNDS)

    const updatedUserResponse = await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    })

    // TODO: Implement invalidating existing sessions
    if (updatedUserResponse) redirect("/sign-in");

    return { message: 'Password reset successfully' }

  } catch (error) {
    console.error('Password reset error:', error)
    return { error: 'Internal server error' }
  } finally {
    await prisma.$disconnect()
  }
}