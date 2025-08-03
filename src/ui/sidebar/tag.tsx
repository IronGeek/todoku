/* eslint-disable @ts/no-magic-numbers */

import { createElement, isValidElement, useState } from 'react';

import { HashIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './tag.module.scss';

import type { ComponentProps, JSX, MouseEvent, ReactNode } from 'react';

const getRandomColor = (dark?: boolean): string => {
  let g = 0; // eslint-disable-line no-useless-assignment
  let b = 0; // eslint-disable-line no-useless-assignment
  let r = 0; // eslint-disable-line no-useless-assignment

  if (dark) {
    r = Math.floor(Math.random() * 100); // 0-99
    g = Math.floor(Math.random() * 100); // 0-99
    b = Math.floor(Math.random() * 100); // 0-99
  } else {
    r = Math.floor(Math.random() * 50) + 205; // 205-255
    g = Math.floor(Math.random() * 50) + 205; // 205-255
    b = Math.floor(Math.random() * 50) + 205; // 205-255
  }

  const toHex = (c: number): string => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

type SidebarTagProps = ComponentProps<'button'> & {
  readonly active?: boolean
  readonly color?: string
  readonly dark?: boolean
  readonly icon?: ReactNode
  readonly text?: string
};

const SidebarTag = ({ className, children, active = false, dark = false, icon = false, text, color, ...props }: SidebarTagProps): JSX.Element => {
  const [isActive, setIsActive] = useState(active);
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    setIsActive((prev) => !prev);
  };

  return (
    <button
      {...props}
      className={cx(styles.tag, 'sidebar-tag', { dark, active: isActive }, className)}
      data-color={color || getRandomColor(dark)}
      suppressHydrationWarning={true}
      type="button"
      onClick={handleClick}
    >
      {isValidElement<HTMLElement>(icon)
        ? createElement(icon.type, { ...icon.props, className: cx('sidebar-tag-icon', icon.props.className) })
        : icon !== false
          ? <HashIcon className="sidebar-tag-icon" />
          : null }

      {text
        ? <div className="sidebar-tag-text">{text}</div>
        : isValidElement<HTMLElement>(children)
          ? createElement(children.type, { ...children.props, className: cx('sidebar-tag-text', children.props.className) })
          : typeof children === 'string'
            ? <div className="sidebar-tag-text">{children}</div>
            : null}
    </button>
  );
};

SidebarTag.displayName = 'SidebarTag';

export { SidebarTag };
export type { SidebarTagProps };
