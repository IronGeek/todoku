import { cx } from '@/ui/utils';
import { Logo } from '@/components/logo';

import type { ComponentProps } from 'react';

import styles from './landing-navbar.module.scss';

type LandingNavbarProps = ComponentProps<'div'>;

const LandingNavbar = ({ className, ...props }: LandingNavbarProps) => (
  <div
    {...props}
    className={cx(styles.navbar, "navbar", className)}
  >
    <div className="navbar-left">
      <Logo />
    </div>
    <div className="navbar-right">
    </div>
  </div>
);

export { LandingNavbar };
export type { LandingNavbarProps };
