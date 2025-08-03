import { Logo } from '@/components/logo.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './landing-navbar.module.scss';

import type { ComponentProps, JSX } from 'react';

type LandingNavbarProps = ComponentProps<'div'>;

const LandingNavbar = ({ className, ...props }: LandingNavbarProps): JSX.Element => (
  <div
    {...props}
    className={cx(styles.navbar, 'navbar', className)}
  >
    <div className="navbar-left">
      <Logo />
    </div>

    <div className="navbar-right" />
  </div>
);

LandingNavbar.displayName = 'LandingNavbar';

export { LandingNavbar };
export type { LandingNavbarProps };
