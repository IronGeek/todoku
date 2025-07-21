'use client';

import{ ChangeEvent, MouseEvent, useState, type ComponentProps } from "react";
import clsx from "clsx";
import { format } from "date-fns";

import { CalendarIcon, CollapsedIcon, ExpandedIcon, HashIcon, PinIcon, PinnedIcon, TagIcon } from "@/ui/icons";
import { useAppDispatch } from "@/state/hook";
import { setCompleted, setPinned } from "@/state/todo";

import type { Todo } from "@/state/todo/types";

import styles from './item.module.scss';
import { CheckBox } from "../forms/checkbox";

type TodoItemProps = ComponentProps<'div'> & {
  item: Todo
}

const TodoItem = ({ className, item, ...props }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    dispatch(setCompleted({ id: value, completed: checked }));
  }

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    dispatch(setPinned({ id: value, stared: checked }));
  }

  return (
    <div {...props} className={clsx(styles.item, "todo-item", { completed: item.done }, className)}>
      <CheckBox
        className={clsx("checkbutton todo-item-pin", { pinned: item.stared })}
        checked={item.stared} value={item.id} onChange={handlePin}>
        <PinnedIcon />
      </CheckBox>
      <CheckBox className="todo-item-check" checked={item.done} value={item.id} onChange={handleCheck} />
      <div className="todo-item-title">
        {item.title}
      </div>
      { expanded
        ? <>
            <div className="todo-item-desc">{item.description}</div>
            <div className="todo-item-meta">
              <div><CalendarIcon />{format(new Date(item.due), 'dd LLL yyyy')}</div>
              <div><HashIcon />{item.list}</div>
              <div><TagIcon />{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </>
        : null }
      <div className="todo-item-actions">
        <button type="button" className="todo-item-action" onClick={handleExpand}>
          { expanded ? <ExpandedIcon /> : <CollapsedIcon /> }
        </button>
      </div>
    </div>
  )
}

export { TodoItem };
export type { TodoItemProps };
