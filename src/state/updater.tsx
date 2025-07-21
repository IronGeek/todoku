'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@/state/hook';
import { resetTodos, setTodos } from '@/state/todo';

import type { Todo } from '@/state/todo/types';

type AppStateUpdaterProps = PropsWithChildren<{
  title: string,
  todos: Todo[] | null
}>

const  AppStateUpdater = ({ children, todos }: AppStateUpdaterProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodos({ items: todos }));

    return () => { dispatch(resetTodos()) }
  }, []);

  return children;
};

export { AppStateUpdater };
export type  { AppStateUpdaterProps };
