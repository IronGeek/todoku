import { createElement, isValidElement, useState } from 'react';
import clsx from 'clsx';

import { HashIcon } from '@/ui/icons';

import styles from './tag.module.scss';

import type { ComponentProps, MouseEvent, ReactNode } from 'react';

const getRandomColor = (dark?: boolean): string => {
  let r: number, g: number, b: number;

  if (dark) {
    r = Math.floor(Math.random() * 100); // 0-99
    g = Math.floor(Math.random() * 100); // 0-99
    b = Math.floor(Math.random() * 100); // 0-99
  } else {
    r = Math.floor(Math.random() * 50) + 205; // 205-255
    g = Math.floor(Math.random() * 50) + 205; // 205-255
    b = Math.floor(Math.random() * 50) + 205; // 205-255
  }

  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

type SidebarTagProps = ComponentProps<'button'> & {
  active?: boolean
  dark?: boolean
  icon?: ReactNode
  color?: string
  text?: string
};


const SidebarTag = ({ className, children, active = false, dark = false, icon = false, text, color, ...props }: SidebarTagProps) => {
  const [isActive, setActive] = useState(active);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setActive((prev) => !prev);
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.tag, "sidebar-tag", { active: isActive, dark }, className)}
      data-color={color || getRandomColor(dark)}
      onClick={handleClick}
      suppressHydrationWarning
    >
      {isValidElement<HTMLElement>(icon)
        ? createElement(icon.type, { ...icon.props, className: clsx("sidebar-tag-icon", icon.props.className) })
        : icon !== false
          ? <HashIcon className="sidebar-tag-icon" />
          : null }
        {text
          ? <div className="sidebar-tag-text">{text}</div>
          : isValidElement<HTMLElement>(children)
            ? createElement(children.type, { ...children.props, className: clsx("sidebar-tag-text", children.props.className) })
            : typeof children === 'string'
              ? <div className="sidebar-tag-text">{children}</div>
              : null}
    </button>
  )
};

export { SidebarTag };
export type { SidebarTagProps };
