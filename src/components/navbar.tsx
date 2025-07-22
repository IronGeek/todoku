import { PageTitle } from '@/components/page-title';
import { PageMenu } from '@/components/page-menu';
import { Sidebar } from '@/ui/sidebar';
import { cx } from '@/ui/utils';

import type { ComponentProps, MouseEventHandler } from 'react';

import styles from './navbar.module.scss';

type NavbarProps = ComponentProps<'div'> & {
  sidebarCollapsed?: boolean
  toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Navbar = ({ className, toggleSidebar, sidebarCollapsed, ...props }: NavbarProps) => (
  <div
    {...props}
    className={cx(styles.navbar, "navbar", className)}
  >
    <div className="navbar-left">
      {sidebarCollapsed ? <Sidebar.Toggler onClick={toggleSidebar} /> : null }
      <PageTitle />
    </div>
    <div className="navbar-right">
      <PageMenu />
    </div>
  </div>
);

export { Navbar };
export type { NavbarProps };
