import { format } from 'date-fns';

import { CalendarIcon, HashIcon, TagIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './meta.module.scss';

import type { ComponentProps, JSX } from 'react';

import type { Todo } from '@/state/todo/types';

type TodoMetaProps = ComponentProps<'div'> & {
  readonly value: Todo
};

const TodoMeta = ({ className, children, value, ...props }: TodoMetaProps): JSX.Element => (
  <div {...props} className={cx(styles.meta, 'todo-item-meta', className)}>
    <div><CalendarIcon />{format(new Date(value.due), 'dd LLL yyyy')}</div>
    <div><HashIcon />{value.list}</div>
    <div><TagIcon />{value.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
  </div>
);

TodoMeta.displayName = 'TodoMeta';

export { TodoMeta };
export type { TodoMetaProps };
