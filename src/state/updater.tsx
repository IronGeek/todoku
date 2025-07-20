'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/state/hook';
import { resetTodos, setTodos } from '@/state/todo/slice';

import type { Todo } from '@/state/todo/types';

interface AppStateUpdaterProps {
  title: string,
  todos: Todo[]
}

const  AppStateUpdater = ({ title, todos }: AppStateUpdaterProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodos({ title, items: todos }));

    return () => { dispatch(resetTodos()) }
  }, []);

  return null;
};

export { AppStateUpdater };
export type  { AppStateUpdaterProps };
