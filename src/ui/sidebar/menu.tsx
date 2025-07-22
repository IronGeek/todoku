import { createElement, isValidElement, type ComponentProps, type ReactNode } from 'react';

import { cx } from '@/ui/utils';

import styles from './menu.module.scss';

type SidebarMenuProps = ComponentProps<'div'> & {
  inline?: boolean
  header?: ReactNode
};

const SidebarMenu = ({ className, children, header, inline, ...props }: SidebarMenuProps) => {
  return (
    <div {...props} className={cx(styles.menu, "sidebar-menu", { "sidebar-menu-inline": inline }, className)}>
      { isValidElement<HTMLElement>(header)
        ? createElement(header.type, { ...header.props, className: cx("sidebar-menu-header", header.props.className) })
        : <header className="sidebar-menu-header">{header}</header>}
      <ol className="sidebar-menu-list">
        {children}
      </ol>
    </div>
  )
};

export { SidebarMenu };
export type { SidebarMenuProps };
