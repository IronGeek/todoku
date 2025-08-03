'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';

import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/button.tsx';
import { columnHelper } from '@/ui/data-table/columns.tsx';
import { DataTable } from '@/ui/data-table.tsx';
import { Dialog } from '@/ui/dialog.tsx';
import { Dropdown } from '@/ui/dropdown.tsx';
import { PlusLgIcon, ThreeDotsIcon } from '@/ui/icons.ts';

import { addNewUser, editUser, removeUser } from './user-actions.ts';
import { initialState, columns as userColumns } from './user-columns.ts';

import type { Session } from 'next-auth';
import type { JSX } from 'react';

import type { User } from '@/lib/prisma/client.ts';

interface UserTableProps {
  readonly data: User[]
  readonly session: Session
}

const UserTable = ({ data, session }: UserTableProps): JSX.Element => {
  const [userData, setUserData] = useState(data);
  const [isDeleting, setIsDeleting] = useState(false);
  const [createState, createUserAction, cratePending] = useActionState(addNewUser, { success: false });
  const [updateState, updateUserAction, updatePending] = useActionState(editUser, { success: false });

  const [addUser, setAddUser] = useState(false);
  const [tobeUpdated, setTobeUpdated] = useState<User | null>(null);
  const [tobeDeleted, setTobeDeleted] = useState<User | null>(null);

  const columns = useMemo(() => [
    ...userColumns,
    columnHelper.actions<User>(
      'actions',
      (row, context) => (
        <>
          {context.session?.user && row.id !== context.session?.user.id
            ? (
              <Button
                className="me-2"
                variant="outline"
                onClick={() => {
                  setTobeUpdated(row);
                }}
              >
                Edit
              </Button>)
            : null}

          {context.session?.user && row.id !== context.session?.user.id
            ? (
              <Button
                className=""
                variant="destructive"
                onClick={() => {
                  setTobeDeleted(row);
                }}
              >
                Hapus
              </Button>)
            : null}
        </>
      ),
      {
        header: 'Actions',
        meta  : { align: 'center', width: 140 }
      }
    ),
    columnHelper.actions<User>(
      'menu',
      (row) => (
        <Dropdown>
          <Dropdown.Trigger asChild={true}>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <ThreeDotsIcon className="mb-1" />
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content align="end">
            <Dropdown.Label>Actions</Dropdown.Label>

            <Dropdown.Item
              onClick={() => navigator.clipboard.writeText(row.id)}
            >
              Copy ID
            </Dropdown.Item>

            <Dropdown.Separator />
            <Dropdown.Item>Lock User (Ban)</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      ),
      {
        meta: { width: 30 }
      }
    )
  ], []);

  const handleDelete = async (user: User): Promise<void> => {
    setIsDeleting(true);
    await removeUser(user.id);

    setIsDeleting(false);
    setTobeDeleted(null);
    setUserData((prev) => prev.filter((u) => u.id !== user.id));
  };

  useEffect(() => {
    if (createState.success) {
      setAddUser(false);
      setUserData((prev) => [...prev, createState.data]);
    }
  }, [createState]);

  useEffect(() => {
    if (updateState.success) {
      const user = updateState.data;

      setTobeUpdated(null);
      setUserData((prev) => prev.map((usr: User) => {
        if (usr.id === user.id) { return { ...usr, ...user } }

        return usr;
      }));
    }
  }, [updateState]);

  return (
    <div className="container mx-auto py-12">
      <DataTable
        actions={
          <Button variant="default" onClick={() => { setAddUser(true) }}><PlusLgIcon /> Add User</Button>
        }
        columns={columns}
        data={userData}
        filter="email"
        initialState={initialState}
        session={session} />

      <Dialog
        open={addUser}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setAddUser(false);
        }}
      >
        <Dialog.Content className="sm:max-w-[425px]">
          <form action={createUserAction}>
            <Dialog.Header>
              <Dialog.Title>New User</Dialog.Title>

              <Dialog.Description>
                Buat user baru
              </Dialog.Description>
            </Dialog.Header>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name-1">Name</label>
                <input className="border rounded p-1" id="name-1" name="name" type="text" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="email-1">Email</label>
                <input className="border rounded p-1" id="email-1" name="email" type="email" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="password-1">Password</label>
                <input className="border rounded p-1" id="password-1" name="password" type="password" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="role-1">Role</label>

                <select id="role-1" name="role">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <Dialog.Footer>
              <Dialog.Close asChild={true}>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>

              <Button disabled={cratePending} type="submit">Kirim {cratePending ? <Spinner /> : null }</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog>

      <Dialog
        open={tobeUpdated !== null}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setTobeUpdated(null);
        }}
      >
        <Dialog.Content className="sm:max-w-[425px]">
          <form action={updateUserAction}>
            <Dialog.Header>
              <Dialog.Title>Edit User</Dialog.Title>

              <Dialog.Description>
                Ubah nama dan role user
              </Dialog.Description>
            </Dialog.Header>

            <div className="grid gap-4 ">
              <input defaultValue={tobeUpdated?.id} name="id" type="hidden" />

              <div className="grid gap-3">
                <label htmlFor="name-2">Name</label>
                <input defaultValue={tobeUpdated?.name} id="name-2" name="name" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="email-2">Email</label>
                <input className="border rounded p-1" defaultValue={tobeUpdated?.email} id="email-2" name="email" type="email" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="password-2">Password</label>
                <input className="border rounded p-1" id="password-2" name="password" type="password" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="role-2">Role</label>

                <select defaultValue={tobeUpdated?.role} id="role-2" name="role">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <Dialog.Footer>
              <Dialog.Close asChild={true}>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>

              <Button disabled={updatePending} type="submit">Kirim { updatePending ? <Spinner /> : null }</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog>

      <Dialog
        open={tobeDeleted !== null}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setTobeDeleted(null);
        }}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Yakin mau hapus user?</Dialog.Title>

            <Dialog.Description>
              Aksi ini tidak dapat di koreksi. User <strong>{tobeDeleted?.name}</strong> akan dihapus secara permanen dari server.
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.Footer>
            <Dialog.Close asChild={true}>
              <Button type="button" variant="secondary">Batal</Button>
            </Dialog.Close>

            <Button disabled={isDeleting} type="button" variant="default" onClick={() => handleDelete(tobeDeleted)}>Hapus { isDeleting ? <Spinner /> : null}</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

UserTable.displayName = 'UserTable';

export { UserTable };
