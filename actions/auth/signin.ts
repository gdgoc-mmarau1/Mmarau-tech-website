import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { FormState, SigninFormSchema } from '../../lib/definations'

const prisma = new PrismaClient()

// Read your JWT secret from an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'test'
const JWT_EXPIRES_IN = '10h' // Token expires in 10 hours

export default async function signIn(state:FormState,formData: FormData):Promise<FormState> {
  // assign inputs from form payload
  const [username,email,password] =[formData.get("username"),formData.get("email"), formData.get("password")];

  //validate fields
  const validatedFields = SigninFormSchema.safeParse({username,email,password});

 //returns if all the checks fail
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error?.flatten().fieldErrors,
    }}
  

     //extract fields from the validated data
     const{username: validatedUserName,email: validatedEmail,password: validatedPassword} = validatedFields.data;


  try {

  

    

    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ email:validatedEmail }, { username: validatedUserName }],
      },
    })

    if (!foundUser) {
      return { error: 'User not found' }
    }

    //extract all the data properties from the found user
    const {id:foundUserId,username:foundUserName,isVerified,email:foundUserEmail,passwordHash} = foundUser;

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(validatedPassword, passwordHash)
    if (!passwordMatch) {
      return { message: 'Invalid credentials' }
    }

    const token = jwt.sign(
      {
        userId: foundUserId,
        email: foundUserEmail,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return {
      message: 'Login successful',
      token,
      user: {
        id: foundUserId,
        email: foundUserEmail,
        username: foundUserName,
        isVerified: isVerified,
      },
    }
  } catch (error) {
    console.error('Login error:', error)

    return { error: 'Internal server error' }
  } finally {
    await prisma.$disconnect()
  }
}
