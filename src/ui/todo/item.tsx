'use client';

import{ ChangeEvent, MouseEvent, useState, type ComponentProps } from "react";
import clsx from "clsx";
import { format } from "date-fns";

import { CalendarIcon, CollapsedIcon, ExpandedIcon, HashIcon, PinIcon, PinnedIcon, TagIcon } from "@/ui/icons";
import { useAppDispatch } from "@/state/hook";
import { setItemCompleted, toggleItemPinned } from "@/state/todo/slice";

import type { Todo } from "@/state/todo/types";

import styles from './item.module.scss';

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

    dispatch(setItemCompleted({ id: value, completed: checked }));
  }

  const handlePin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { value } = e.currentTarget;

    dispatch(toggleItemPinned({ id: value }));
  }

  return (
    <div {...props} className={clsx(styles.item, "todo-item", { completed: item.done }, className)}>
      <button type="button" className={clsx("todo-item-pin", { pinned: item.stared })} value={item.id} onClick={handlePin} >
        { item.stared ? <PinnedIcon /> : <PinIcon /> }
      </button>
      <input type="checkbox" className="todo-item-check" checked={item.done} value={item.id} onChange={handleCheck} />
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
