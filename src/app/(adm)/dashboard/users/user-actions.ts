'use server';

import { createUser, removeUserById, updateUser } from '@/services/user.ts';

import type { User } from '@/lib/prisma/client.ts';

interface UserState {
  data?: User
  error?: Error
  success: boolean
}

const addNewUser = async (
  _state: UserState,
  formData: FormData
): Promise<UserState> => {
  try {
    const obj = Object.fromEntries(formData.entries());

    const [data] = await createUser(obj, true);

    return { data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

const editUser = async (
  _state: UserState,
  formData: FormData
): Promise<UserState> => {
  try {
    const obj = Object.fromEntries(formData.entries());

    const data = await updateUser(obj);

    return { data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

const removeUser = async (id: string): Promise<void> => {
  await removeUserById(id);
};

export { addNewUser, editUser, removeUser };
export type { UserState };
