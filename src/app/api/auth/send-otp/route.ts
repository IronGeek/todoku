import { z } from 'zod';

import { sendMail } from '@/services/mail.ts';
import { createUserOTP } from '@/services/user.ts';

const POST = async (req: Request): Promise<Response> => {
  try {
    const data = await req.json();

    const schema = z.object({
      email : z.email(),
      reason: z.string().optional()
    });

    const { email, reason } = schema.parse(data);
    const timeout = parseInt(process.env.OTP_TIMEOUT, 10);
    const otp = await createUserOTP(email, reason, timeout);

    if (email && otp) {
      await sendMail({
        subject: 'Your OTP Code',
        text   : `Your OTP is ${otp}. It will expire in ${timeout} minutes.`,
        to     : email
      });

      return Response.json(null, { status: 200 });
    }

    return Response.json({ message: 'OTP sent' }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export { POST };
