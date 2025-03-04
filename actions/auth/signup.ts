"use server";
import { SignupFormSchema,FormState } from "../../lib/definations"
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const SALT_ROUNDS = 12
 
export async function signUp(state:FormState,formData: FormData):Promise<FormState> {
 
 // assign inputs from form payload
  const [username,email,password,confirmPassword] =[formData.get("username"),formData.get("email"), formData.get("password"),formData.get("confirmPassword")];

  //validate fields
  const validatedFields = SignupFormSchema.safeParse({username, email,password,confirmPassword});



 //returns an errors object if all the checks fail
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error?.flatten().fieldErrors,
    }}

   //extract fields from the validated data
    const{username: validatedUserName,email: validatedEmail,password: validatedPassword} = validatedFields.data;

 try {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: validatedEmail}, { username:validatedUserName}],
    },
  })

  if (existingUser) {
    return {
      error: 'User with this email or username already exists.',
    }
  }
  
  // Hash password 
  const hashedPassword = await bcrypt.hash(validatedPassword, SALT_ROUNDS)

  // add the user to db
  const newUser = await prisma.user.create({
    data: {
      email:validatedEmail,
      username:validatedUserName,
      passwordHash: hashedPassword,
      emailToken: crypto.randomUUID(),
      tokenExpires: new Date(Date.now() + 3600000), 
    },
  })

  console.log(newUser);

  // TODO: email verification
  // Send verification email (future feature)

 
if(newUser){
  //redirect user to home page: in the future change the path to the home url
  redirect("/")

}
  
} catch (error) {

  console.error(error)

  return { error: 'Internal server error' }

} finally {
  await prisma.$disconnect()
}
}