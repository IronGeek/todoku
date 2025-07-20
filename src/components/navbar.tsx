import clsx from 'clsx';

import { PageTitle } from '@/components/page-title';
import { PageMenu } from '@/components/page-menu';

import type { ComponentProps } from 'react';

import styles from './navbar.module.scss';

type NavbarProps = ComponentProps<'div'>;

const Navbar = ({ className, ...props }: NavbarProps) => (
  <div
    {...props}
    className={clsx(styles.navbar, "navbar", className)}
  >
    <div className="navbar-left">
      <PageTitle />
    </div>
    <div className="navbar-right">
      <PageMenu />
    </div>
  </div>
);

export { Navbar };
export type { NavbarProps };
