import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/app/models/user";
import ConnectDb from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    await ConnectDb();

    const { otp } = await req.json();

    // 1. Get token from cookie
    const token = req.cookies.get("otp_session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Session expired" },
        { status: 401 }
      );
    }

    // 2. Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const email = decoded.email;

    // 3. Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 4. Check OTP expiry
    if (!user.OtpExpiry || user.OtpExpiry < new Date()) {
      return NextResponse.json(
        { success: false, message: "OTP expired" },
        { status: 400 }
      );
    }

    // 5. Check OTP match
    if (user.Otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // 6. Mark verified + clear OTP
    user.isVerified = true;
    user.Otp = undefined;
    user.OtpExpiry = undefined;

    await user.save();

    // 7. Clear cookie
    const response = NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });

    response.cookies.set("otp_session", "", {
      maxAge: 0,
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