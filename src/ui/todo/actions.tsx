import { CheckBox, CheckBoxProps } from '@/ui/forms/checkbox';
import { PinnedIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';
import { useAppDispatch } from '@/state/hook';
import { setCompleted, setPinned } from '@/state/todo';

import type { ChangeEvent, ComponentProps } from "react";
import type { Todo } from '@/state/todo/types';

import styles from './actions.module.scss';

type TodoPinnerProps = Omit<CheckBoxProps, 'value'> & {
  readonly value: Todo
}

const TodoPinner = ({ className, children, value, ...props }: TodoPinnerProps) => {
  const dispatch = useAppDispatch();
  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    dispatch(setPinned({ id: value, stared: checked }));
  }

  return (
    <CheckBox
      {...props}
      className={cx("todo-item-action todo-item-pin", { pinned: value.stared })}
      checked={value.stared} value={value.id} onChange={handlePin}>
      <PinnedIcon size="1.1em" />
      </CheckBox>
  )
};


type TodoCompleterProps = Omit<CheckBoxProps, 'value'> & {
  readonly value: Todo
}

const TodoCompleter = ({ className, children, value, ...props }: TodoCompleterProps) => {
  const dispatch = useAppDispatch();
  const handleComplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    dispatch(setCompleted({ id: value, completed: checked }));
  }

  return (
    <CheckBox
      {...props}
      className={cx("todo-item-action todo-item-check", { completed: value.stared })}
      checked={value.done} value={value.id}
      onChange={handleComplete} />
  )
};

type TodoActionsProps = ComponentProps<'div'>

const TodoActions = ({ className, children, ...props }: TodoActionsProps) => {
  return (
    <div {...props} className={cx(styles.actions, "flex gap-1 items-center todo-item-actions", className)}>
      {children}
    </div>
  )
}

TodoActions.Completer = TodoCompleter;
TodoActions.Pinner = TodoPinner;

export { TodoActions, TodoPinner, TodoCompleter };
export type { TodoActionsProps, TodoPinnerProps, TodoCompleterProps };
