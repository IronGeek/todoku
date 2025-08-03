import { Accordion } from '@/ui/accordion.tsx';
import { TodoContent } from '@/ui/todo/content.tsx';
import { TodoHeader } from '@/ui/todo/header.tsx';
import { TodoItem } from '@/ui/todo/item.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './list.module.scss';

import type { JSX, ReactNode } from 'react';

import type { Todo } from '@/state/todo/types';
import type { AccordionSingleProps } from '@/ui/accordion';

type TodoListProps = Omit<AccordionSingleProps, 'type'> & {
  readonly collapsible?: boolean
  readonly items?: Todo[]
  readonly title?: ReactNode
};

const TodoList = ({ className, collapsible = true, title, items, ...props }: TodoListProps): JSX.Element => (
  <Accordion {...props} className={cx(styles.list, 'todo-list', className)} collapsible={collapsible} type="single">
    <TodoHeader>
      <div className="todo-list-title">{title}</div>
      <div className="todo-list-badge">{items !== null ? items.length : 'loading'}</div>
    </TodoHeader>

    <TodoContent>
      { items?.map((item) => <TodoItem key={item.id} value={item} />) ?? null }
    </TodoContent>
  </Accordion>
);

TodoList.displayName = 'TodoList';

export { TodoList };
export type { TodoListProps };
