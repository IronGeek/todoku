import { z } from 'zod';

import { createUserOTP } from '@/services/user';
import { sendMail } from '@/services/mail';

const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const schema = z.object({
      email: z.email(),
      reason: z.string().optional()
    });

    const { email, reason } = schema.parse(data);
    const timeout = parseInt(process.env.OTP_TIMEOUT, 10);
    const otp = await createUserOTP(email, reason, timeout);

    if (email && otp) {
      await sendMail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It will expire in ${timeout} minutes.`,
      });

      return Response.json(null, { status: 200 });
    }

    return Response.json({ message: "OTP sent" }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export { POST }
