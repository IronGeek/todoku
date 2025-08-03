import {  createElement, isValidElement  } from 'react';

import { cx } from '@/ui/utils.ts';

import styles from './menu.module.scss';

import type { ComponentProps, JSX, ReactNode } from 'react';

type SidebarMenuProps = ComponentProps<'div'> & {
  readonly header?: ReactNode
  readonly inline?: boolean
};

const SidebarMenu = ({ className, children, header, inline, ...props }: SidebarMenuProps): JSX.Element => (
  <div {...props} className={cx(styles.menu, 'sidebar-menu', { 'sidebar-menu-inline': inline }, className)}>
    { isValidElement<HTMLElement>(header)
      ? createElement(header.type, { ...header.props, className: cx('sidebar-menu-header', header.props.className) })
      : <header className="sidebar-menu-header">{header}</header>}

    <ol className="sidebar-menu-list">
      {children}
    </ol>
  </div>
);

SidebarMenu.displayName = 'SidebarMenu';

export { SidebarMenu };
export type { SidebarMenuProps };
