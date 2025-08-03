import { cx } from '@/ui/utils.ts';

import styles from './header.module.scss';

import type { ComponentProps, JSX } from 'react';

type TodoHeaderProps = ComponentProps<'header'>;

const TodoHeader = ({ className, children, ...props }: TodoHeaderProps): JSX.Element => (
  <header {...props} className={cx(styles.header, 'todo-list-header', className)}>
    {children}
  </header>
);

TodoHeader.displayName = 'TodoHeader';

export { TodoHeader };
export type { TodoHeaderProps };
