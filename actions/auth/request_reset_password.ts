import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { FormState, RequestResetPasswordFormSchema } from '../../lib/definations';
import { redirect } from 'next/navigation';


const prisma = new PrismaClient()
const RESET_TOKEN_EXPIRY = 3600;

export default async function requestResetPassword(state:FormState,formData: FormData) :Promise<FormState> {
    const email = formData.get("email");

   //validate fields
  const validatedFields = RequestResetPasswordFormSchema.safeParse({email});

  //returns if all the checks fail
   if (!validatedFields.success) {
     return {
       fieldErrors: validatedFields.error?.flatten().fieldErrors,
     }}
   
 
      //extract fields from the validated data
      const{email: validatedEmail} = validatedFields.data;
    
       
      

  try {
  
 

    // Prevent user enumeration by not revealing if email exists
    const user = await prisma.user.findUnique({ where: { email:validatedEmail } })
    if (!user) {
      return { message: 'If the email exists, a reset link will be sent' }
    }

    // Generate the reset token and expiry
    const resetToken = crypto.randomUUID()
    const resetTokenExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY * 1000)

   const userUpdateResponse =  await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    })

    // TODO: Implement sending email with reset link
    // Send email with reset link 


if (userUpdateResponse) redirect("/reset-password");
    return {
      message: 'If the email exists, a reset link will be sent',
    }
  } catch (error) {
    return { error: 'Internal server error' }
  } finally {
    await prisma.$disconnect()
  }
}