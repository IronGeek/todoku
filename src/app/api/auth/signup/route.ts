import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const POST = async (req: Request) => {
  const data = await req.json();

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = schema.parse(data);

  const exist = await prisma.users.findUnique({
    where: { email },
  });

  if (exist) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  await fetch(`${process.env.BASE_URL}/api/auth/send-otp`, {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify({ email }),
  });

  return NextResponse.json({ user });
}

export { POST }
