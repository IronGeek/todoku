import clsx from 'clsx';

import { SidebarMenu } from '@/ui/sidebar/menu';
import { SidebarToggler } from '@/ui/sidebar/toggler';
import { SidebarMenuItem } from '@/ui/sidebar/menu-item';
import { SidebarTags } from '@/ui/sidebar/tags';
import { SidebarTag } from '@/ui/sidebar/tag';
import { SettingsIcon, SignOutIcon } from '@/ui/icons';

import type { ComponentProps, MouseEventHandler } from 'react';

import styles from './sidebar.module.scss';

type SidebarProps = ComponentProps<'div'> & {
  collapsed?: boolean
  toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Sidebar = ({ className, toggleSidebar, collapsed, children, ...props }: SidebarProps) => {
  return (
    <div
      {...props}
      className={clsx(styles.sidebar, { 'sidebar-hidden': collapsed }, className)}
    >
      <header className="sidebar-header">
        <div>AppName</div>
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
