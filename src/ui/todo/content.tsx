import { cx } from '@/ui/utils';

import type { ComponentProps } from "react";

import styles from './list.module.scss';

type TodoContentProps = ComponentProps<'ol'>;

const TodoContent = ({ className, children, ...props }: TodoContentProps) => {
  return (
    <ol {...props} className={cx(styles.content, className)}>
      {children}
    </ol>
  )
}

export { TodoContent };
export type { TodoContentProps };
