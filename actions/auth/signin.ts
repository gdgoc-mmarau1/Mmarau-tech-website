"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FormState, SigninFormSchema } from "../../lib/definations";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "test";
const JWT_EXPIRES_IN = "10h";

export default async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract inputs from form payload
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate fields using your schema (which should now only expect email and password)
  const validatedFields = SigninFormSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  // Extract validated data
  const { email: validatedEmail, password: validatedPassword } = validatedFields.data;

  try {
    // Find the user only by email
    const foundUser = await prisma.user.findUnique({
      where: {
        email: validatedEmail,
      },
    });

    if (!foundUser) {
      return { error: "User not found" };
    }

    const { id: foundUserId, username: foundUserName, isVerified, email: foundUserEmail, passwordHash } = foundUser;

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(validatedPassword, passwordHash);
    if (!passwordMatch) {
      return { message: "Invalid credentials" };
    }

    const token = jwt.sign(
      {
        userId: foundUserId,
        email: foundUserEmail,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      message: "Login successful",
      token,
      user: {
        id: foundUserId,
        email: foundUserEmail,
        username: foundUserName,
        isVerified,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
}
