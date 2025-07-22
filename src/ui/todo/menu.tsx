import { Dropdown, DropdownProps } from '@/ui/dropdown';
import { ListIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import { useAppDispatch } from '@/state/hook';
import { setCompleted } from '@/state/todo';

import type { Todo } from '@/state/todo/types';

import styles from './menu.module.scss';

type TodoMenuProps = Omit<DropdownProps, 'children'> & {
  readonly value: Todo
}

const TodoMenu = ({ value, ...props }: TodoMenuProps) => {
  const dispatch = useAppDispatch();
  const toggleCompleted = (id: string, completed: boolean) => {
    dispatch(setCompleted({ id, completed }));
  }

  return (
    <Dropdown {...props}>
      <Dropdown.Trigger className={cx(styles.menu, "todo-item-action todo-item-menu")}><ListIcon size="1.1em"/></Dropdown.Trigger>
      <Dropdown.Content className="w-40" side="right" align="start">
        <Dropdown.Label>Status</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.CheckboxItem
            checked={value.done}
            onCheckedChange={(completed) => toggleCompleted(value.id, completed)}>
            Completed
          </Dropdown.CheckboxItem>
          <Dropdown.CheckboxItem
            checked={value.stared}
            onCheckedChange={(completed) => toggleCompleted(value.id, completed)}>
            Pinned
          </Dropdown.CheckboxItem>
          <Dropdown.CheckboxItem
            checked={value.list === 'archive'}
            onCheckedChange={(completed) => toggleCompleted(value.id, completed)}>
            Archived
          </Dropdown.CheckboxItem>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          <Dropdown.Label>Actions</Dropdown.Label>
          <Dropdown.Sub>
            <Dropdown.SubTrigger className="pl-8">Move To</Dropdown.SubTrigger>
            <Dropdown.Portal>
              <Dropdown.SubContent>
                <Dropdown.Item>Personal</Dropdown.Item>
                <Dropdown.Item>Work</Dropdown.Item>
                <Dropdown.Item>Health</Dropdown.Item>
                <Dropdown.Item>Shopping</Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item>More...</Dropdown.Item>
              </Dropdown.SubContent>
            </Dropdown.Portal>
          </Dropdown.Sub>
          <Dropdown.Item className="pl-8">Edit...</Dropdown.Item>
          <Dropdown.Item className="pl-8">Delete</Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown>
  )
}

export { TodoMenu };
export type { TodoMenuProps };
