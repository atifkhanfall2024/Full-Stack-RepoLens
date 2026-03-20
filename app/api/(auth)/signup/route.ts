import { NextRequest, NextResponse } from "next/server";
import {SignupSchema} from "@/schemas/signupSchema"
import ConnectDb from "@/app/lib/db";
import { HashPassward , Comparepass } from '@/helpers/bcrypt/bc'
import crypto from 'crypto'
import UserModel from "@/app/models/user";
import { sendOtpEmail } from "@/helpers/sendmail";
import { createOtpSession } from "@/helpers/token";

export async function POST(req:NextRequest) {
    
   try {
     const body = await req.json()
    const parse = SignupSchema.safeParse(body)
    if(!parse.success){
        return NextResponse.json({message:parse.error.flatten().fieldErrors},{status:400})
    }

    await ConnectDb()

    const {fullName , email  ,password} = parse.data

    const Hash = await HashPassward(password)
   // const compare = await Comparepass(password , )

   const RandomOtp = crypto.randomInt(100000, 1000000).toString();
   const HashOtp = await HashPassward(RandomOtp)


   // send otp

 
 
   await UserModel.create({
          fullName , 
          email ,
          password:Hash ,
         Otp:HashOtp,
          OtpExpiry:new Date(Date.now() + 2 * 60 * 1000)
   })
     await sendOtpEmail(email , RandomOtp)
    const token =  createOtpSession(email)
   const response =  NextResponse.json({message:`${fullName} Check Your Email and Verify Account`})
   
    // ✅ Set cookie properly
    response.cookies.set("otp_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60, // seconds (important!)
    });
    return response
   } catch (error) {
   return NextResponse.json({message:error || "Something went wrong"} , {status:400})
   }

     



}