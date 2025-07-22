import { Accordion } from '@/ui/accordion';

import { TodoHeader } from '@/ui/todo/header';
import { TodoItem } from "@/ui/todo/item";
import { TodoContent } from '@/ui/todo/content';
import { cx } from '@/ui/utils';

import type { ReactNode } from "react";
import type{ Todo } from "@/state/todo/types";
import type { AccordionSingleProps } from '@/ui/accordion';

import styles from './list.module.scss';

type TodoListProps = Omit<AccordionSingleProps, 'type'> & {
  readonly collapsible?: boolean
  readonly title?: ReactNode
  readonly items?: Todo[]
}

const TodoList = ({ className, collapsible = true, title, items, ...props }: TodoListProps) => {
  return (
    <Accordion {...props} type="single" collapsible={collapsible} className={cx(styles.list, "todo-list", className)}>
      <TodoHeader>
        <div className="todo-list-title">{title}</div>
        <div className="todo-list-badge">{items !== null ? items.length : 'loading'}</div>
      </TodoHeader>
      <TodoContent>
        { items?.map((item) => (
          <TodoItem key={item.id} value={item} />
        )) ?? null }
      </TodoContent>
    </Accordion>
  )
}

export { TodoList };
export type { TodoListProps };
