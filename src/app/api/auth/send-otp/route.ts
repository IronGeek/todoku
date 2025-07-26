import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

const POST = async (req: Request) => {
  const { email } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
    if (!user) { return Response.json({ message: "User not found" }, { status: 404 }) }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otps.create({
    data: {
      code: otp,
      expiry,
      userId: user.id,
    },
  });

  // send email
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    // auth: {
      //   user: process.env.EMAIL_FROM,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
    host: 'localhost',
    port: 3025,
    secure: false
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  return Response.json({ message: "OTP sent" });
}

export { POST }
