import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/app/models/user";
import ConnectDb from "@/app/lib/db";
import { Comparepass } from "@/helpers/bcrypt/bc";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();

    const { email, password } = await req.json();

    // 1. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    // 2. Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Check if verified
    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your account first" },
        { status: 403 }
      );
    }

    // 4. Compare password
    const isMatch = await Comparepass(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 5. Create JWT session
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // you can change
    );

    // 6. Send response + cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}