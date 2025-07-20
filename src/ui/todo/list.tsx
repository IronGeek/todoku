'use client';

import clsx from "clsx";
import { isToday } from "date-fns";

import { useAppSelector } from "@/state/hook";
import { TodoItem } from "@/ui/todo/item";

import type { ComponentProps, ReactNode } from "react";
import type{ Todo } from "@/state/todo/types";

import styles from './list.module.scss';

const TodoFilters = Object.freeze({
  today: (todo: Todo): boolean => {
    return todo.due ? isToday(new Date(todo.due)) : false
  }
});

type TodoListProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly title?: ReactNode
  readonly filter?: keyof typeof TodoFilters
}

const TodoList = ({ className, title, filter, ...props }: TodoListProps) => {
  const items = useAppSelector((state) => state.todos.items);
  const filterFn = filter in TodoFilters ? TodoFilters[filter] : null;
  const filtered = items && filterFn ? items.filter(filterFn) : items;

  return (
    <div {...props} className={clsx(styles.list, "todo-list", className)}>
      <header className="todo-list-header">
        <div className="todo-list-title">{title}</div>
        <div className="todo-list-badge">{filtered !== null ? filtered.length : 'loading'}</div>
      </header>
      <ol>
        { filtered?.map((item) => (
          <TodoItem key={item.id} item={item} />
        )) ?? null }
      </ol>
    </div>
  )
}

export { TodoList, TodoFilters };
export type { TodoListProps };
