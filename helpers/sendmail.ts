import { transporter } from "@/app/lib/mailer";
export const sendOtpEmail = async (email: string, otp: string) => {
    console.log(email);
    console.log(process.env.EMAIL_USER);
    console.log(otp);
  await transporter.sendMail({
    from: `"Your REPOLENS APP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Code</h2>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 2 minutes.</p>
    `,
  });
};