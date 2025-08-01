'use client';

import { formatRelative } from "date-fns";
import { Main } from '@/components/main';
import { cx } from '@/ui/utils';

import styles from './page.module.css';
import { Table } from '@/ui/table';
import { Button } from "@/ui/forms/button";
import { CheckIcon, PlusIcon } from "@/ui/icons";
import { Dialog } from "@/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { User } from "@/lib/prisma/client";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [tobeUpdated, setTobeUpdated] = useState<User | null>(null);
  const [tobeDeleted, setTobeDeleted] = useState<User | null>(null);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const obj = Object.fromEntries(formData.entries());
    fetch('/api/user', { method: 'POST', body: JSON.stringify(obj) })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((user) => {
        if (user) {
          setUsers((users) => [...users, user]);
        }
      }).finally(() => { setAddUser(false) })
  }

  const handleDelete = (user: User) => {
    const { id } = user;
    fetch('/api/user', { method: 'DELETE', body: JSON.stringify({ id }) })
      .then((res) => {
        if (res.ok) { setUsers((users) => users.filter((user) => user.id !== id)); }
      }).finally(() => {
        setTobeDeleted(null);
      })

  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const obj = Object.fromEntries(formData.entries());
    fetch('/api/user', { method: 'PATCH', body: JSON.stringify(obj) })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((user) => {
        if (user) {
          setUsers((users) => users.map((usr) => {
            if (usr.id === user.id) { return { ...usr, ...user } }

            return usr;
          }));
        }
      }).finally(() => { setTobeUpdated(null) })

  }

  useEffect(() => {
    fetch('/api/user', { method: 'GET' })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((users) => {
        if (users) { setUsers(users); }
      })
  }, []);

  return (
    <Main className={cx(styles.main, "fullscreen")}>
      <div className="flex items-center justify-end mb-4">
        <Button variant="default" onClick={() => { setAddUser(true) }}><PlusIcon /> Add User</Button>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head hidden>ID</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Name</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Verified</Table.Head>
              <Table.Head>Created</Table.Head>
              <Table.Head>Updated</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell hidden>{user.id}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.verifiedAt ? <CheckIcon /> : null}</Table.Cell>
                <Table.Cell>{formatRelative(user.createdAt, new Date())}</Table.Cell>
                <Table.Cell>{formatRelative(user.updatedAt, new Date())}</Table.Cell>
                <Table.Cell>
                  {session?.user && user.id !== session?.user.id
                    ? <Button
                      className="me-2"
                      variant="outline"
                      onClick={() => {
                        setTobeUpdated(user);
                      }}
                    >
                      Edit
                    </Button>
                    : null}
                  {session?.user && user.id !== session?.user.id
                    ? <Button
                      className=""
                      variant="destructive"
                      onClick={() => {
                        setTobeDeleted(user);
                      }}
                    >
                      Hapus
                    </Button>
                    : null}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Dialog
        open={addUser}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setAddUser(false);
        }}
      >
        <Dialog.Content className="sm:max-w-[425px]">
          <form onSubmit={handleCreate}>
            <Dialog.Header>
              <Dialog.Title>New User</Dialog.Title>
              <Dialog.Description>
                Buat user baru
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name-1">Name</label>
                <input className="border rounded p-1" id="name-1" type="text" name="name" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="email-1">Email</label>
                <input className="border rounded p-1" id="email-1" type="email" name="email" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="password-1">Password</label>
                <input className="border rounded p-1" id="password-1" type="password" name="password" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="role-1">Role</label>
                <select name="role" id="role-1">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>
              <Button type="submit">Kirim</Button>
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
          <form onSubmit={handleUpdate}>
            <Dialog.Header>
              <Dialog.Title>Edit User</Dialog.Title>
              <Dialog.Description>
                Ubah nama dan role user
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4">
              <input type="hidden" name="id" defaultValue={tobeUpdated?.id} />
              <div className="grid gap-3">
                <label htmlFor="name-2">Name</label>
                <input id="name-2" name="name" defaultValue={tobeUpdated?.name} />
              </div>
              <div className="grid gap-3">
                <label htmlFor="email-2">Email</label>
                <input className="border rounded p-1" id="email-2" type="email" name="email" defaultValue={tobeUpdated?.email} />
              </div>
              <div className="grid gap-3">
                <label htmlFor="password-2">Password</label>
                <input className="border rounded p-1" id="password-2" type="password" name="password" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="role-2">Role</label>
                <select name="role" id="role-2">
                  <option value="USER" selected={tobeUpdated?.role === 'USER'}>USER</option>
                  <option value="ADMIN" selected={tobeUpdated?.role === 'ADMIN'}>ADMIN</option>
                </select>
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.Close>
              <Button type="submit">Kirim</Button>
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
            <Dialog.Close asChild>
              <Button type="button" variant="secondary">Batal</Button>
            </Dialog.Close>
            <Button type="button" variant="default" onClick={() => handleDelete(tobeDeleted)}>Hapus</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </Main>
  )
};

export default Page;
