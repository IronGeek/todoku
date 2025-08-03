import { cx } from '@/ui/utils.ts';

import styles from './list.module.scss';

import type { ComponentProps, JSX } from 'react';

type TodoContentProps = ComponentProps<'ol'>;

const TodoContent = ({ className, children, ...props }: TodoContentProps): JSX.Element => (
  <ol {...props} className={cx(styles.content, className)}>
    {children}
  </ol>
);

TodoContent.displayName = 'TodoContent';

export { TodoContent };
export type { TodoContentProps };
