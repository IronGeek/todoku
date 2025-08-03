'use server';

import { prisma } from '@/services/db.ts';

import type { Task } from '@/lib/prisma/client.ts';

const getTasks = async (pageIndex: number = 0, pageSize: number = 10): Promise<Task[]> => await prisma.task.findMany({
  skip: pageIndex * pageSize,
  take: pageSize
});

const createTask = async (data: Partial<Task>): Promise<Task> => await prisma.$transaction(async (tx) => {
  const { title, description } = data;

  const task = await tx.task.create({
    data: {
      description,
      title,
      done     : false,
      dueDate  : new Date(),
      important: false
    }
  });

  return task;
});

const updateTask = async (data: Partial<Task>): Promise<Task> => await prisma.$transaction(async (tx) => {
  const { id, title, description } = data;

  const updated = await tx.task.update({
    data: {
      description, title
    },
    where: { id }
  });

  return updated;
});

const removeTaskById = async (id: string): Promise<void> => {
  await prisma.task.delete({ where: { id }});
};

export { getTasks, createTask, updateTask, removeTaskById };
