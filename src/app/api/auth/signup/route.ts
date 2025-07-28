import { z } from 'zod';

import { createUser, findUserByEmail } from '@/services/db';
import { sendMail } from '@/services/mail';

const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const schema = z.object({
      email: z.email(),
      password: z.string().min(6),
      name: z.string(),
    });

    const { email, password, name } = schema.parse(data);
    const timeout = parseInt(process.env.OTP_TIMEOUT, 10);
    const [user, otp] = await createUser(email, name, password, timeout);

    if (user && otp) {
      await sendMail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It will expire in ${timeout} minutes.`,
      });

      return Response.json({ user }, { status: 201 });
    }

    return Response.json(null, { status: 500 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export { POST }
