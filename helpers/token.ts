import jwt from 'jsonwebtoken'

export const createOtpSession = (email: string) => {
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET as string,
    { expiresIn: "2m" } // ⏱ 2 minutes
  );

  return token;
};