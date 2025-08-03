import { cx } from '@/ui/utils.ts';

import styles from './button.module.scss';

import type { ComponentProps, JSX, MouseEvent } from 'react';

import type { Todo } from '@/state/todo/types';

type TodoButtonProps = Omit<ComponentProps<'button'>, 'value'> & {
  readonly action?: (todo: Todo) => void
  readonly value: Todo
};

const TodoButton = ({ className, children, action, value, ...props }: TodoButtonProps): JSX.Element => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    action?.(value);
  };

  return (
    <button
      {...props}
      className={cx(styles.button, 'button todo-item-button', className)}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

TodoButton.displayName = 'TodoButton';

export { TodoButton };
