'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

import { Main } from '@/components/main.tsx';
import { getTodosFilter, getTodosTitle, groupTodos, resolveSlug } from '@/services/todo.ts';
import { useAppDispatch, useAppSelector } from '@/state/hook.ts';
import { setTitle } from '@/state/todo/index.ts';
import { TodoList } from '@/ui/todo/list.tsx';

import type { JSX } from 'react';

import type { Todo } from '@/state/todo/types';

const Page = (): JSX.Element => {
  const { status } = useSession();

  const { slug } = useParams();
  const listOrCategory = resolveSlug(slug);
  const dispatch = useAppDispatch();
  const items: Todo[] = useAppSelector((state) => state.todos.items);

  const grouped = useMemo(() => {
    const filtered = items?.filter(getTodosFilter(listOrCategory));

    return groupTodos(filtered ?? []);
  }, [items, listOrCategory]);

  useEffect(() => {
    dispatch(setTitle({ title: getTodosTitle(listOrCategory) }));
  }, [slug, listOrCategory, dispatch]);

  if (status === 'loading' || status !== 'authenticated') { return null }

  return (
    <Main className="gap-8">
      { grouped.today.length > 0 ? <TodoList items={grouped.today} title="Today" /> : null }

      <div className="grid gap-8 xl:grid-cols-2">
        { grouped.tomorrow.length > 0 ? <TodoList className="self-start" items={grouped.tomorrow} title="Tomorrow" /> : null }
        { grouped['this-week'].length > 0 ? <TodoList className="self-start" items={grouped['this-week']} title="This Week" /> : null }
        { grouped.past.length > 0 ? <TodoList className="self-start" items={grouped.past} title="In the Past" /> : null }
        { grouped.later.length > 0 ? <TodoList className="self-start" items={grouped.later} title="Later" /> : null }
      </div>
    </Main>
  );
};

Page.displayName = 'Page';

export default Page;
