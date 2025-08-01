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
import { Todo } from "@/lib/prisma/client";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [tobeUpdated, setTobeUpdated] = useState<Todo | null>(null);
  const [tobeDeleted, setTobeDeleted] = useState<Todo | null>(null);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const obj = Object.fromEntries(formData.entries());
    fetch('/api/todo', { method: 'POST', body: JSON.stringify(obj) })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((todo) => {
        if (todo) {
          setTasks((todos) => [...todos, todo]);
        }
      }).finally(() => { setAddTask(false) })
  }

  const handleDelete = (todo: Todo) => {
    const { id } = todo;
    fetch('/api/todo', { method: 'DELETE', body: JSON.stringify({ id }) })
      .then((res) => {
        if (res.ok) { setTasks((todos) => todos.filter((todo) => todo.id !== id)); }
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
    fetch('/api/todo', { method: 'PATCH', body: JSON.stringify(obj) })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((todo) => {
        if (todo) {
          setTasks((todos) => todos.map((usr) => {
            if (usr.id === todo.id) { return { ...usr, ...todo } }

            return usr;
          }));
        }
      }).finally(() => { setTobeUpdated(null) })

  }

  useEffect(() => {
    fetch('/api/todo', { method: 'GET' })
      .then((res) => res.ok ? res.json() : Promise.resolve(null))
      .then((todos) => {
        if (todos) { setTasks(todos); }
      })
  }, []);

  return (
    <Main className={cx(styles.main, "fullscreen")}>
      <div className="flex items-center justify-end mb-4">
        <Button variant="default" onClick={() => { setAddTask(true) }}><PlusIcon /> Add Task</Button>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head hidden>ID</Table.Head>
              <Table.Head>Title</Table.Head>
              <Table.Head>Description</Table.Head>
              <Table.Head>Due</Table.Head>
              <Table.Head>List</Table.Head>
              <Table.Head>Tags</Table.Head>
              <Table.Head>Stared</Table.Head>
              <Table.Head>Done</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell hidden>{task.id}</Table.Cell>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.due ? formatRelative(task.due, new Date()) : ''}</Table.Cell>
                <Table.Cell>{task.list ? <CheckIcon /> : null}</Table.Cell>
                <Table.Cell>{task.tags}</Table.Cell>
                <Table.Cell>{task.stared}</Table.Cell>
                <Table.Cell>{task.done}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="me-2"
                    variant="outline"
                    onClick={() => {
                      setTobeUpdated(task);
                    }}
                  >
                    Edit
                  </Button>
                    <Button
                      className=""
                      variant="destructive"
                      onClick={() => {
                        setTobeDeleted(task);
                      }}
                    >
                      Hapus
                    </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Dialog
        open={addTask}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setAddTask(false);
        }}
      >
        <Dialog.Content className="sm:max-w-[425px]">
          <form onSubmit={handleCreate}>
            <Dialog.Header>
              <Dialog.Title>New Task</Dialog.Title>
              <Dialog.Description>
                Buat task baru
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="title-1">Title</label>
                <input className="border rounded p-1" id="title-1" type="text" name="title" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="description-1">Description</label>
                <input className="border rounded p-1" id="description-1" type="description" name="description" />
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
              <Dialog.Title>Edit Task</Dialog.Title>
              <Dialog.Description>
                Ubah task
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4">
              <input type="hidden" name="id" defaultValue={tobeUpdated?.id} />
              <div className="grid gap-3">
                <label htmlFor="name-2">Title</label>
                <input id="title-2" name="title" defaultValue={tobeUpdated?.title} />
              </div>
              <div className="grid gap-3">
                <label htmlFor="description-2">Description</label>
                <input className="border rounded p-1" id="description-2" type="text" name="description" defaultValue={tobeUpdated?.description} />
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
            <Dialog.Title>Yakin mau hapus task?</Dialog.Title>
            <Dialog.Description>
              Aksi ini tidak dapat di koreksi. Task <strong>{tobeDeleted?.title}</strong> akan dihapus secara permanen dari server.
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
