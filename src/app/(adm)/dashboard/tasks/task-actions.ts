'use server';

import { createTask, removeTaskById, updateTask } from '@/services/task.ts';

import type { Task } from '@/lib/prisma/client.ts';

interface TaskState {
  data?: Task
  error?: Error
  success: boolean
}

const addNewTask = async (
  _state: TaskState,
  formData: FormData
): Promise<TaskState> => {
  try {
    const obj = Object.fromEntries(formData.entries());

    const data = await createTask(obj);

    return { data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

const editTask = async (
  _state: TaskState,
  formData: FormData
): Promise<TaskState> => {
  try {
    const obj = Object.fromEntries(formData.entries());

    const data = await updateTask(obj);

    return { data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

const removeTask = async (id: string): Promise<void> => {
  await removeTaskById(id);
};

export { addNewTask, editTask, removeTask };
export type { TaskState };
