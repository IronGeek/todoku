import { cx } from '@/ui/utils.ts';

import styles from './logo.module.css';

import type { ComponentProps, JSX } from 'react';

type LogoProps = ComponentProps<'div'>;

const Logo = ({ className, ...props }: LogoProps): JSX.Element => (
  <div {...props} className={cx(styles.logo, 'logo', className)}>
    <div className="logo-symbol">todo<span className="logo-accent">ku</span></div>
  </div>
);

Logo.displayName = Logo;

export { Logo };
export type { LogoProps };
