import { format } from 'date-fns';

import { CalendarIcon, HashIcon, TagIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { ComponentProps } from "react";
import type { Todo } from '@/state/todo/types';

import styles from './meta.module.scss';

type TodoMetaProps = ComponentProps<'div'> & {
  readonly value: Todo
};

const TodoMeta = ({ className, children, value, ...props }: TodoMetaProps) => {
  return (
    <div {...props} className={cx(styles.meta, "todo-item-meta", className)}>
      <div><CalendarIcon />{format(new Date(value.due), 'dd LLL yyyy')}</div>
      <div><HashIcon />{value.list}</div>
      <div><TagIcon />{value.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
  )
}

export { TodoMeta };
export type { TodoMetaProps };
