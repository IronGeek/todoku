'use client';

import { AccordionContent } from '@/ui/accordion/content.tsx';
import { AccordionHeader } from '@/ui/accordion/header.tsx';
import { AccordionItem } from '@/ui/accordion/item.tsx';
import { AccordionTrigger } from '@/ui/accordion/trigger.tsx';
import { EditIcon } from '@/ui/icons.ts';
import { TodoActions, TodoCompleter, TodoPinner } from '@/ui/todo/actions.tsx';
import { TodoMenu } from '@/ui/todo/menu.tsx';
import { TodoMeta } from '@/ui/todo/meta.tsx';
import { cx } from '@/ui/utils.ts';

import { TodoButton } from './button.tsx';
import styles from './item.module.scss';

import type { JSX } from 'react';

import type { Todo } from '@/state/todo/types';
import type { AccordionItemProps } from '@/ui/accordion/item';

type TodoItemProps = Omit<AccordionItemProps, 'value'> & {
  readonly value: Todo
};

const TodoItem = ({ className, value, ...props }: TodoItemProps): JSX.Element => (
  <AccordionItem
    {...props}
    className={cx(styles.item, 'todo-list-item', { completed: value.done }, className)}
    value={value.id}
  >
    <AccordionHeader className="gap-2 [&[data-state=closed]>.todo-item-actions]:hidden">
      <TodoCompleter value={value} />
      <AccordionTrigger className="todo-item-title">{value.title}</AccordionTrigger>

      <TodoActions>
        <TodoPinner value={value} />
        <TodoButton value={value}><EditIcon size="1.1em" /></TodoButton>
      </TodoActions>

      <TodoMenu value={value} />
    </AccordionHeader>

    <AccordionContent className="flex flex-col gap-4 px-6">
      <div className="todo-item-desc">{value.description}</div>
      <TodoMeta value={value} />
    </AccordionContent>
  </AccordionItem>
);

TodoItem.displayName = 'TodoItem';

export { TodoItem };
export type { TodoItemProps };
