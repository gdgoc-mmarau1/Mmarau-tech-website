"use server";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { FormState, RequestResetPasswordFormSchema } from "../../lib/definations";

const prisma = new PrismaClient();
const RESET_TOKEN_EXPIRY = 3600; // in seconds

export default async function requestResetPassword(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");

  // Validate fields
  const validatedFields = RequestResetPasswordFormSchema.safeParse({ email });
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { email: validatedEmail } = validatedFields.data;

  try {
    // Prevent user enumeration: always return a generic message
    const user = await prisma.user.findUnique({ where: { email: validatedEmail } });
    if (!user) {
      return { message: "If the email exists, a reset link will be sent" };
    }

    // Generate the reset token and expiry time
    const resetToken = crypto.randomUUID();
    const resetTokenExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    });

    // TODO: Implement sending email with the reset link using the token

    return { message: "If the email exists, a reset link will be sent" };
  } catch (error) {
    console.error("Request reset password error:", error);
    return { error: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
}
