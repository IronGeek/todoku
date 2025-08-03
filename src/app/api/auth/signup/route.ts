import { z } from 'zod';

import { sendMail } from '@/services/mail.ts';
import { createUser } from '@/services/user.ts';

const POST = async (req: Request): Promise<Response> => {
  try {
    const data = await req.json();

    const schema = z.object({
      email   : z.email(),
      name    : z.string(),
      password: z.string().min(6)
    });

    const { email, password, name } = schema.parse(data);
    const timeout = parseInt(process.env.OTP_TIMEOUT, 10);
    const [user, otp] = await createUser({ email, name, password, role: 'USER' }, false, timeout);

    if (user && otp) {
      await sendMail({
        subject: 'Your OTP Code',
        text   : `Your OTP is ${otp}. It will expire in ${timeout} minutes.`,
        to     : email
      });

      return Response.json({ user }, { status: 201 });
    }

    return Response.json(null, { status: 500 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export { POST };
