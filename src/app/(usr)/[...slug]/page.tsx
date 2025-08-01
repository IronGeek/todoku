'use client';

import { useSession } from 'next-auth/react';

import { Main } from '@/components/main';
import { TodoList } from '@/ui/todo/list';
import { getTodosFilter, getTodosTitle, groupTodos, resolveSlug } from '@/services/todo';
import { Todo } from '@/state/todo/types';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { setTitle } from '@/state/todo';

const Page = () => {
  const { data: session, status } = useSession();

  const { slug } = useParams();
  const listOrCategory = resolveSlug(slug);
  const dispatch = useAppDispatch();
  const items: Todo[] = useAppSelector((state)=> state.todos.items);

  const grouped = useMemo(() => {
    const filtered = items?.filter(getTodosFilter(listOrCategory))
    return groupTodos(filtered ?? []);
  }, [items]);

  useEffect(() => {
    dispatch(setTitle({ title: getTodosTitle(listOrCategory) }))
  }, [slug]);

  if (status === 'loading' || status !== 'authenticated') { return null }

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
