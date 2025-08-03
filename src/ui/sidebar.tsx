import {  createElement, isValidElement   } from 'react';

import { SidebarMenuItem } from '@/ui/sidebar/menu-item.tsx';
import { SidebarMenu } from '@/ui/sidebar/menu.tsx';
import { SidebarTag } from '@/ui/sidebar/tag.tsx';
import { SidebarTags } from '@/ui/sidebar/tags.tsx';
import { SidebarToggler } from '@/ui/sidebar/toggler.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './sidebar.module.scss';

import type { ComponentProps, JSX, MouseEventHandler, ReactNode } from 'react';

type SidebarProps = ComponentProps<'div'> & {
  readonly collapsed?: boolean
  readonly footer?: ReactNode
  readonly logo?: ReactNode
  readonly toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Sidebar = ({ className, logo, footer, toggleSidebar, collapsed, children, ...props }: SidebarProps): JSX.Element => (
  <div
    {...props}
    className={cx(styles.sidebar, { 'sidebar-hidden': collapsed }, className)}
  >
    <header className="sidebar-header">
      { isValidElement<HTMLElement>(logo)
        ? createElement(logo.type, { ...logo.props, className: cx('sidebar-logo', logo.props.className) })
        : <div>{logo}</div> }

      <SidebarToggler onClick={toggleSidebar} />
    </header>

    <div className="sidebar-content">
      {children}
    </div>

    { isValidElement<HTMLElement>(footer)
      ? createElement(footer.type, { ...footer.props, className: cx('sidebar-footer', footer.props.className) })
      : <div className="sidebar-footer">{footer}</div> }
  </div>
);

Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.Tags = SidebarTags;
Sidebar.Tag = SidebarTag;
Sidebar.Toggler = SidebarToggler;
Sidebar.displayName = 'Sidebar';

export { Sidebar };
export type { SidebarProps };
