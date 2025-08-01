import { z } from 'zod';

import { verifyUserOTP } from '@/services/user';

const  POST = async (req: Request) => {
  try {
    const data = await req.json();

    const schema = z.object({
      email: z.email(),
      otp: z.string(),
    });

    const { email, otp } = schema.parse(data);

    const verified =await verifyUserOTP(email, otp);
    if (!verified) { return Response.json({ error: 'Invalid or expired OTP' }, { status: 400 }) }

    return Response.json({ message: 'OTP verified' }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export { POST };
