'use client';

import { useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';

import { Main } from '@/components/main';
import { groupTodos } from '@/services/todo';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import { setTitle } from '@/state/todo';
import { Todo } from '@/state/todo/types';
import { TodoList } from '@/ui/todo/list';

const Page = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();
  const items: Todo[] = useAppSelector((state)=> state.todos.items);
  const grouped = useMemo(() => {
    return groupTodos(items ?? []);
  }, [items]);

  useEffect(() => {
    dispatch(setTitle({ title: 'All Tasks' }))
  }, []);

  if (status === 'loading' || status !== 'authenticated') { return null }

  return (
    <Main className="gap-8" actions={
      <button className="button">New Task</button>
    }>
      { grouped.today.length > 0 ? <TodoList title="Today" items={grouped.today} /> : null }
      <div className="grid gap-8 xl:grid-cols-2">
        { grouped.tomorrow.length > 0 ? <TodoList className="self-start" title="Tomorrow" items={grouped.tomorrow} /> : null }
        { grouped['this-week'].length > 0 ? <TodoList className="self-start" title="This Week" items={grouped['this-week']} /> : null }
        { grouped.past.length > 0 ? <TodoList className="self-start" title="In the Past" items={grouped.past} /> : null }
        { grouped.later.length > 0 ? <TodoList className="self-start" title="Later" items={grouped.later} /> : null }
      </div>
    </Main>
  );
}

export default Page;
