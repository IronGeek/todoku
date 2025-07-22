'use client';

import { ChangeEvent, MouseEvent, useState, type ComponentProps } from "react";
import clsx from "clsx";
import { format } from "date-fns";

import { CalendarIcon, CollapsedIcon, ExpandedIcon, HashIcon, ListIcon, PinnedIcon, TagIcon } from "@/ui/icons";
import { useAppDispatch } from "@/state/hook";
import { setCompleted, setPinned } from "@/state/todo";
import { CheckBox } from "@/ui/forms/checkbox";
import { Dropdown } from "@/ui/dropdown";

import type { Todo } from "@/state/todo/types";

import styles from './item.module.scss';

type TodoItemProps = ComponentProps<'div'> & {
  item: Todo
}

const TodoItem = ({ className, item, ...props }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setExpanded((prev) => !prev);
  };

  const toggleCompleted = (id: string, completed: boolean) => {
    dispatch(setCompleted({ id, completed }));
  }

  const handleComplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    toggleCompleted(value, checked);
  }

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    dispatch(setPinned({ id: value, stared: checked }));
  }

  return (
    <div {...props} className={clsx(styles.item, "todo-item", { completed: item.done }, className)}>
      <div className="todo-item-actions">
        <Dropdown>
          <Dropdown.Trigger className="todo-item-action todo-item-menu"><ListIcon /></Dropdown.Trigger>
          <Dropdown.Content side="right" align="start">
            <Dropdown.Label>Status</Dropdown.Label>
            <Dropdown.Group>
              <Dropdown.CheckboxItem
                checked={item.done}
                onCheckedChange={(completed) => toggleCompleted(item.id, completed)}>
                Completed
              </Dropdown.CheckboxItem>
              <Dropdown.CheckboxItem
                checked={item.stared}
                onCheckedChange={(completed) => toggleCompleted(item.id, completed)}>
                Pinned
              </Dropdown.CheckboxItem>
              <Dropdown.CheckboxItem
                checked={item.list === 'archive'}
                onCheckedChange={(completed) => toggleCompleted(item.id, completed)}>
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
        <CheckBox
          className={clsx("todo-item-action todo-item-pin", { pinned: item.stared })}
          checked={item.stared} value={item.id} onChange={handlePin}>
          <PinnedIcon />
        </CheckBox>
        <CheckBox className="todo-item-action todo-item-check" checked={item.done} value={item.id} onChange={handleComplete} />
      </div>
      <div className="todo-item-title bg-popover" onClick={handleExpand}>
        {item.title}
      </div>
      {expanded
        ? <>
          <div className="todo-item-desc">{item.description}</div>
          <div className="todo-item-meta">
            <div><CalendarIcon />{format(new Date(item.due), 'dd LLL yyyy')}</div>
            <div><HashIcon />{item.list}</div>
            <div><TagIcon />{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </>
        : null}
      <div className="todo-item-expander">
        <button type="button" className="todo-item-action todo-item-expand" onClick={handleExpand}>
          {expanded ? <ExpandedIcon /> : <CollapsedIcon />}
        </button>
      </div>
    </div>
  )
}

export { TodoItem };
export type { TodoItemProps };
