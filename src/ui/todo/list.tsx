import type { ComponentProps, ReactNode } from "react";

import type{ Todo } from "@/state/todo/types";
import { cx } from '@/ui/utils';
import { TodoItem } from "@/ui/todo/item";

import styles from './list.module.scss';

type TodoListProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly title?: ReactNode
  readonly items?: Todo[]
}

const TodoList = ({ className, title, items, ...props }: TodoListProps) => {
  return (
    <div {...props} className={cx(styles.list, "todo-list", className)}>
      <header className="todo-list-header">
        <div className="todo-list-title">{title}</div>
        <div className="todo-list-badge">{items !== null ? items.length : 'loading'}</div>
      </header>
      <ol>
        { items?.map((item) => (
          <TodoItem key={item.id} item={item} />
        )) ?? null }
      </ol>
    </div>
  )
}

export { TodoList };
export type { TodoListProps };
