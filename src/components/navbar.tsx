import { PageMenu } from '@/components/page-menu.tsx';
import { PageTitle } from '@/components/page-title.tsx';
import { Sidebar } from '@/ui/sidebar.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './navbar.module.scss';

import type { ComponentProps, JSX, MouseEventHandler } from 'react';

type NavbarProps = ComponentProps<'div'> & {
  readonly sidebarCollapsed?: boolean
  readonly toggleSidebar?: MouseEventHandler<HTMLButtonElement>
};

const Navbar = ({ className, toggleSidebar, sidebarCollapsed, ...props }: NavbarProps): JSX.Element => (
  <div
    {...props}
    className={cx(styles.navbar, 'navbar', className)}
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

Navbar.displayName = 'Navbar';

export { Navbar };
export type { NavbarProps };
