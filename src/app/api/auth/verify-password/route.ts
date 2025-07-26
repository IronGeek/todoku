import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const POST = async (req: Request) => {
  const { credentials } = await req.json();

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse(credentials);
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user || !user.password) { return Response.json({ message: 'Invalid user or password' }, { status: 401 }) }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { return Response.json({ message: 'Invalid user or password' }, { status: 401 }) }

  if (!user.verifiedAt) { return Response.json({ message: 'Unverified user' }, { status: 401 }) }

  return Response.json({
    id: user.id,
    email: user.email,
    name: user.name
  }, { status: 200 });
}


export { POST }





