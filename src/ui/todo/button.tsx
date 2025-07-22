import { cx } from '@/ui/utils';

import type { ComponentProps, MouseEvent } from 'react';
import type { Todo } from '@/state/todo/types';

import styles from './button.module.scss';

type TodoButtonProps = Omit<ComponentProps<'button'>, 'value'> & {
  value: Todo
  action?: (todo: Todo) => void
}

const TodoButton = ({ className, children, action, value, ...props }: TodoButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    action?.(value);
  }

  return (
    <button
      {...props}
      type="button"
      className={cx(styles.button, "button todo-item-button", className)}
      onClick={handleClick}
    >
      {children}
    </button>
  )
};

export { TodoButton };
