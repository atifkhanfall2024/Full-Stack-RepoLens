import mongoose, { Schema, Document } from "mongoose";

export interface userValidations extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  plan?: string;
  Otp?: string;
  OtpExpiry?: Date;
}

const UserSchema: Schema<userValidations> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Enter Email With Proper Format"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    plan: {
      type: String,
      default: "free",
    },
    Otp: {
      type: String,
    },
    OtpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<userValidations>) ||
  mongoose.model<userValidations>("User", UserSchema);

export default UserModel;