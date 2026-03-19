import {z} from "zod"

export const fullName = z.string().min(3, "Name Must be at least 3 character").max(30).trim().toLowerCase()
export const email  = z.string().email({message:"Incorrect Email Format"}).trim().toLowerCase()
export const password = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[\W_]/, "Password must contain at least 1 special character");

export const isVerified  = z.boolean()
export const plan = z.string()

export  const  SignupSchema = z.object({
    fullName:fullName,
    email:email,
    password:password ,
   
})