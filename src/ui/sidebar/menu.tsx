import clsx from 'clsx';

import { createElement, isValidElement, type ComponentProps, type ReactNode } from 'react';

import styles from './menu.module.scss';

type SidebarMenuProps = ComponentProps<'div'> & {
  inline?: boolean
  header?: ReactNode
};

const SidebarMenu = ({ className, children, header, inline, ...props }: SidebarMenuProps) => {
  return (
    <div {...props} className={clsx(styles.menu, "sidebar-menu", { "sidebar-menu-inline": inline }, className)}>
      { isValidElement<HTMLElement>(header)
        ? createElement(header.type, { ...header.props, className: clsx("sidebar-menu-header", header.props.className) })
        : <header className="sidebar-menu-header">{header}</header>}
      <ol className="sidebar-menu-list">
        {children}
      </ol>
    </div>
  )
};

export { SidebarMenu };
export type { SidebarMenuProps };
