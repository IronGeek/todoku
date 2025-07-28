import { z } from 'zod';

import { verifyUserPassword } from '@/services/db';

const POST = async (req: Request) => {
  const { credentials } = await req.json();

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse(credentials);
  const user = await verifyUserPassword(email, password);
  if (!user) { return Response.json({ error: 'Invalid user or password' }, { status: 401 }) }

  if (!user.verifiedAt) { return Response.json({ error: 'Unverified user' }, { status: 401 }) }

  return Response.json(user, { status: 200 });
}


export { POST }





