'use client';

import { useEffect } from 'react';

import { getSummary } from '@/services/todo.ts';
import { useAppDispatch, useAppSelector } from '@/state/hook.ts';
import { resetTodos, setSummary, setTodos } from '@/state/todo/index.ts';

import type { PropsWithChildren, ReactNode } from 'react';

import type { Todo } from '@/state/todo/types';

type AppStateUpdaterProps = PropsWithChildren<{
  title: string
  todos: Todo[] | null
}>;

const AppStateUpdater = ({ children, todos }: AppStateUpdaterProps): ReactNode => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.todos.items);

  const fetchSummary = (values: Todo[]): (d: typeof dispatch) => Promise<void> => async (dispatcher): Promise<void> => {
    const summary = await getSummary(values);

    dispatcher(setSummary({ summary }));
  };

  useEffect(() => {
    dispatch(fetchSummary(items));
  }, [items]);

  useEffect(() => {
    dispatch(setTodos({ items: todos }));

    return (): void => { dispatch(resetTodos()) };
  }, []);

  return children;
};

export { AppStateUpdater };
export type { AppStateUpdaterProps };
