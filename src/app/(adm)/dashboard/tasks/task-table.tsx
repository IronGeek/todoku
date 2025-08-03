'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';

import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/button.tsx';
import { columnHelper } from '@/ui/data-table/columns.tsx';
import { DataTable } from '@/ui/data-table.tsx';
import { Dialog } from '@/ui/dialog.tsx';
import { PlusLgIcon } from '@/ui/icons.ts';

import { addNewTask, editTask, removeTask } from './task-actions.ts';
import { initialState, columns as taskColumns } from './task-columns.ts';

import type { Session } from 'next-auth';
import type { JSX } from 'react';

import type { Task } from '@/lib/prisma/client.ts';

interface TaskTableProps {
  readonly data: User[]
  readonly session: Session
}

const TaskTable = ({ data, session }: TaskTableProps): JSX.Element => {
  const [taskData, setTaskData] = useState(data);
  const [isDeleting, setIsDeleting] = useState(false);
  const [createState, createTaskAction, cratePending] = useActionState(addNewTask, { success: false });
  const [updateState, updateTaskAction, updatePending] = useActionState(editTask, { success: false });

  const [addTask, setAddTask] = useState(false);
  const [tobeUpdated, setTobeUpdated] = useState<Task | null>(null);
  const [tobeDeleted, setTobeDeleted] = useState<Task | null>(null);

  const columns = useMemo(() => [
    ...taskColumns,
    columnHelper.actions<Task>(
      'actions',
      (row, context) => (
        <>

          <Button
            className="me-2"
            variant="outline"
            onClick={() => {
              setTobeUpdated(row);
            }}
          >
            Edit
          </Button>

          <Button
            className=""
            variant="destructive"
            onClick={() => {
              setTobeDeleted(row);
            }}
          >
            Hapus
          </Button>
        </>
      ),
      {
        header: 'Actions',
        meta  : { align: 'center', width: 140 }
      }
    )
  ], []);

  const handleDelete = async (task: Task): Promise<void> => {
    setIsDeleting(true);
    await removeTask(task.id);

    setIsDeleting(false);
    setTobeDeleted(null);
    setTaskData((prev) => prev.filter((u) => u.id !== task.id));
  };

  useEffect(() => {
    if (createState.success) {
      setAddTask(false);
      setTaskData((prev) => [...prev, createState.data]);
    }
  }, [createState]);

  useEffect(() => {
    if (updateState.success) {
      const task = updateState.data;

      setTobeUpdated(null);
      setTaskData((prev) => prev.map((t: Task) => {
        if (t.id === task.id) { return { ...t, ...task } }

        return t;
      }));
    }
  }, [updateState]);

  return (
    <div className="container mx-auto py-12">
      <DataTable
        actions={
          <Button variant="default" onClick={() => { setAddTask(true) }}><PlusLgIcon /> Add Task</Button>
        }
        columns={columns}
        data={taskData}
        filter="title"
        initialState={initialState}
        session={session} />

      <Dialog
        open={addTask}
        onOpenChange={(isOpen) => {
          if (isOpen === true) { return }

          setAddTask(false);
        }}
      >
        <Dialog.Content className="sm:max-w-[425px]">
          <form action={createTaskAction}>
            <Dialog.Header>
              <Dialog.Title>New Task</Dialog.Title>

              <Dialog.Description>
                Buat task baru
              </Dialog.Description>
            </Dialog.Header>

            <div className="grid gap-4 mb-8">
              <div className="grid gap-3">
                <label htmlFor="title-1">Title</label>
                <input className="border rounded p-1" id="title-1" name="title" type="text" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="description-1">Description</label>
                <input className="border rounded p-1" id="description-1" name="description" type="text" />
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
          <form action={updateTaskAction}>
            <Dialog.Header>
              <Dialog.Title>Edit Task</Dialog.Title>

              <Dialog.Description>
                Ubah Task
              </Dialog.Description>
            </Dialog.Header>

            <div className="grid gap-4 mb-8">
              <input defaultValue={tobeUpdated?.id} name="id" type="hidden" />

              <div className="grid gap-3">
                <label htmlFor="title-2">Title</label>
                <input defaultValue={tobeUpdated?.title} id="title-2" name="title" />
              </div>

              <div className="grid gap-3">
                <label htmlFor="description-2">Description</label>
                <input className="border rounded p-1" defaultValue={tobeUpdated?.description} id="description-2" name="description" type="text" />
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
            <Dialog.Title>Yakin mau hapus task?</Dialog.Title>

            <Dialog.Description>
              Aksi ini tidak dapat di koreksi. Task <strong>{tobeDeleted?.title}</strong> akan dihapus secara permanen dari server.
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

TaskTable.displayName = 'TaskTable';

export { TaskTable };
