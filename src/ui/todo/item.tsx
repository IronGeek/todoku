'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import { format } from 'date-fns';

import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, EditIcon, HashIcon, ListIcon, PinnedIcon, TagIcon } from '@/ui/icons';
import { useAppDispatch } from '@/state/hook';
import { AccordionHeader } from '@/ui/accordion/header';
import { AccordionContent } from '@/ui/accordion/content';
import { AccordionItem } from '@/ui/accordion/item';
import { AccordionTrigger } from '@/ui/accordion/trigger';

import { TodoMenu } from '@/ui/todo/menu';
import { TodoActions, TodoCompleter, TodoPinner } from '@/ui/todo/actions';
import { TodoMeta } from '@/ui/todo/meta';

import { cx } from '@/ui/utils';
import type { Todo } from '@/state/todo/types';

import type { AccordionItemProps } from '@/ui/accordion/item';

import styles from './item.module.scss';
import { TodoButton } from './button';

type TodoItemProps = Omit<AccordionItemProps, 'value'> & {
  value: Todo
}

const TodoItem = ({ className, value, ...props }: TodoItemProps) => {
  return (
    <AccordionItem {...props}
      className={cx(styles.item, "todo-list-item", { completed: value.done }, className)}
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
  )
}

export { TodoItem };
export type { TodoItemProps };
