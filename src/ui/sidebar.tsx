import { cx } from '@/ui/utils';
import { SidebarMenu } from '@/ui/sidebar/menu';
import { SidebarToggler } from '@/ui/sidebar/toggler';
import { SidebarMenuItem } from '@/ui/sidebar/menu-item';
import { SidebarTags } from '@/ui/sidebar/tags';
import { SidebarTag } from '@/ui/sidebar/tag';

import { createElement, isValidElement, type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';

import styles from './sidebar.module.scss';

type SidebarProps = ComponentProps<'div'> & {
  logo?: ReactNode
  footer?: ReactNode
  collapsed?: boolean
  toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Sidebar = ({ className, logo, footer, toggleSidebar, collapsed, children, ...props }: SidebarProps) => {
  return (
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
        ? createElement(footer.type, { ... footer.props, className: cx('sidebar-footer', footer.props.className) })
        : <div className="sidebar-footer">{footer}</div> }
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
