import type { PayloadAction } from '@reduxjs/toolkit';

type Writable<T> = { -readonly [P in keyof T]: T[P] };

type TodoCutoff = 'past' | 'today' | 'tomorrow' | 'this-week' | 'later';
type TodoCategory = 'all' | 'upcoming' | 'today' | 'done' |'pin' | 'archive';

interface Todo {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly due: number
  readonly list: string
  readonly tags: string[]
  readonly stared: boolean
  readonly done: boolean
}

type GroupedTodos = Record<TodoCutoff, Todo[]>;

type TodosFilter = (item: Todo) => boolean;

type TodoSummary = Record<TodoCategory, [number, number]> & {
  readonly list: Record<string, [number, number]>
};

interface Todos {
  readonly title: string
  readonly items: Todo[]
  readonly summary: TodoSummary
}

type SetTodosAction = PayloadAction<{
  readonly items: Todo[]
}>;

type SetTitleAction = PayloadAction<{
  readonly title: string
}>;

type SetSummaryAction = PayloadAction<{
  readonly summary: TodoSummary
}>;

type SetCompletedAction = PayloadAction<{
  readonly id: string
  readonly completed: boolean
}>;

type SetPinnedAction = PayloadAction<{
  readonly id: string
  readonly stared: boolean
}>;

export type {
  Writable, TodoCutoff, TodoCategory, Todo, Todos, GroupedTodos, TodoSummary, TodosFilter,
  SetTodosAction, SetTitleAction, SetSummaryAction, SetCompletedAction, SetPinnedAction
};
