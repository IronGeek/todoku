import { z } from 'zod';

import { createUser, getUsers, removeUserById, updateUser } from '@/services/user.ts';

import type { NextRequest } from 'next/server';

const GET = async (req: NextRequest): Promise<Response> => {
  try {
    const { searchParams } = req.nextUrl;
    const pageIndex = searchParams.get('pageIndex') ?? '0';
    const pageSize = searchParams.get('pageSize') ?? '10';

    const users = await getUsers(parseInt(pageIndex, 10), parseInt(pageSize, 10));

    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.stack }, { status: 500 });
  }
};

const POST = async (req: Request): Promise<Response> => {
  try {
    const data = await req.json();

    const schema = z.object({
      email   : z.email(),
      name    : z.string(),
      password: z.string(),
      role    : z.enum(['USER', 'ADMIN'])
    });

    const param = schema.parse(data);
    const [user] = await createUser(param, true);

    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.stack }, { status: 500 });
  }
};

const PATCH = async (req: Request): Promise<Response> => {
  try {
    const data = await req.json();

    const schema = z.object({
      email   : z.email(),
      id      : z.cuid2(),
      name    : z.string(),
      password: z.string(),
      role    : z.enum(['USER', 'ADMIN'])
    });

    const param = schema.parse(data);
    const user = await updateUser(param);

    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.stack }, { status: 500 });
  }
};

const DELETE = async (req: Request): Promise<Response> => {
  try {
    const data = await req.json();
    const schema = z.object({
      id: z.cuid2()
    });

    const { id } = schema.parse(data);
    if (!id) { return Response.json(null, { status: 400 }) }

    await removeUserById(id);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.stack }, { status: 500 });
  }
};

export { GET, DELETE, POST, PATCH };
