import { cx } from '@/ui/utils';

import type { ComponentProps } from "react";

import styles from './header.module.scss';

type TodoHeaderProps = ComponentProps<'header'>;

const TodoHeader = ({ className, children, ...props }: TodoHeaderProps) => {
  return (
    <header {...props} className={cx(styles.header, "todo-list-header", className)}>
      {children}
    </header>
  )
}

export { TodoHeader };
export type { TodoHeaderProps };
