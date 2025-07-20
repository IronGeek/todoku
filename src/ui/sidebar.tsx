import clsx from 'clsx';

import { SidebarMenu } from '@/ui/sidebar/menu';
import { SidebarToggler } from '@/ui/sidebar/toggler';
import { SidebarMenuItem } from '@/ui/sidebar/menu-item';
import { SidebarTags } from '@/ui/sidebar/tags';
import { SidebarTag } from '@/ui/sidebar/tag';
import { SettingsIcon, SignOutIcon } from '@/ui/icons';

import { createElement, isValidElement, type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';

import styles from './sidebar.module.scss';

type SidebarProps = ComponentProps<'div'> & {
  logo?: ReactNode
  collapsed?: boolean
  toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Sidebar = ({ className, logo, toggleSidebar, collapsed, children, ...props }: SidebarProps) => {
  return (
    <div
      {...props}
      className={clsx(styles.sidebar, { 'sidebar-hidden': collapsed }, className)}
    >
      <header className="sidebar-header">
        { isValidElement<HTMLElement>(logo)
          ? createElement(logo.type, { ...logo.props, className: clsx('sidebar-logo', logo.props.className) })
          : <div>{logo}</div> }
        <SidebarToggler onClick={toggleSidebar} />
      </header>
      <div className="sidebar-content">
        {children}
      </div>
      <div className="sidebar-footer">
        <SidebarMenu>
          <SidebarMenuItem icon={<SettingsIcon />} text="Settings" />
          <SidebarMenuItem icon={<SignOutIcon />} text="Sign out" />
        </SidebarMenu>
      </div>
    </div>
  )
};

Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.Tags = SidebarTags;
Sidebar.Tag = SidebarTag;
Sidebar.Toggler = SidebarToggler;

export { Sidebar };
export type { SidebarProps };
