'use client';

import { Main } from '@/components/main';
import { TodoList } from '@/ui/todo/list';
import { getTodosFilter, getTodosTitle, groupTodos } from '@/services/todo';
import { Todo } from '@/state/todo/types';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { setTitle } from '@/state/todo';

const Page = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const items: Todo[] = useAppSelector((state)=> state.todos.items);

  const grouped = useMemo(() => {
    const filtered = items?.filter(getTodosFilter(type.toString()))
    return groupTodos(filtered ?? []);
  }, [items]);

  useEffect(() => {
    dispatch(setTitle({ title: getTodosTitle(type.toString()) }))
  }, [type]);

  return (
    <Main className="gap-8">
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
