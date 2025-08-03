import { useAppDispatch } from '@/state/hook.ts';
import { setCompleted, setPinned } from '@/state/todo/index.ts';
import { CheckBox } from '@/ui/forms/checkbox.tsx';
import { PinnedIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './actions.module.scss';

import type { ChangeEvent, ComponentProps, JSX } from 'react';

import type { Todo } from '@/state/todo/types';
import type { CheckBoxProps } from '@/ui/forms/checkbox';

type TodoPinnerProps = Omit<CheckBoxProps, 'value'> & {
  readonly value: Todo
};

const TodoPinner = ({ className, children, value, ...props }: TodoPinnerProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const handlePin = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: id, checked } = e.currentTarget;

    dispatch(setPinned({ id, stared: checked }));
  };

  return (
    <CheckBox
      {...props}
      checked={value.stared}
      className={cx('todo-item-action todo-item-pin', { pinned: value.stared })}
      value={value.id}
      onChange={handlePin}
    >
      <PinnedIcon size="1.1em" />
    </CheckBox>
  );
};

type TodoCompleterProps = Omit<CheckBoxProps, 'value'> & {
  readonly value: Todo
};

const TodoCompleter = ({ className, children, value, ...props }: TodoCompleterProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleComplete = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: id, checked } = e.currentTarget;

    dispatch(setCompleted({ id, completed: checked }));
  };

  return (
    <CheckBox
      {...props}
      checked={value.done}
      className={cx('todo-item-action todo-item-check', { completed: value.stared })}
      value={value.id}
      onChange={handleComplete} />
  );
};

type TodoActionsProps = ComponentProps<'div'>;

const TodoActions = ({ className, children, ...props }: TodoActionsProps): JSX.Element => (
  <div {...props} className={cx(styles.actions, 'flex gap-1 items-center todo-item-actions', className)}>
    {children}
  </div>
);

TodoActions.Completer = TodoCompleter;
TodoCompleter.displayName = 'TodoCompleter';

TodoActions.Pinner = TodoPinner;
TodoPinner.displayName = 'TodoPinner';

TodoActions.displayName = 'TodoActions';

export { TodoActions, TodoPinner, TodoCompleter };
export type { TodoActionsProps, TodoPinnerProps, TodoCompleterProps };
