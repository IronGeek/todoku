'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import { resetTodos, setSummary, setTodos } from '@/state/todo';

import { getSummary } from '@/services/todo';

import type { Todo } from '@/state/todo/types';

type AppStateUpdaterProps = PropsWithChildren<{
  title: string,
  todos: Todo[] | null
}>

const  AppStateUpdater = ({ children, todos }: AppStateUpdaterProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.todos.items);

  const fetchSummary = (items: Todo[]) => async (dispatch) => {
    const summary = await getSummary(items);
    dispatch(setSummary( { summary }))
  }

  useEffect(() => {
    dispatch(fetchSummary(items));
  }, [items]);

  useEffect(() => {
    dispatch(setTodos({ items: todos }));

    return () => { dispatch(resetTodos()) }
  }, []);

  return children;
};

export { AppStateUpdater };
export type  { AppStateUpdaterProps };
