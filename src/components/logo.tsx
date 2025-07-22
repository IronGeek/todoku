import { cx } from '@/ui/utils';

import styles from './logo.module.css';

import type { ComponentProps } from 'react';

type LogoProps= ComponentProps<'div'>

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div {...props} className={cx(styles.logo, "logo", className)}>
      <div className="logo-symbol">todo<span className="logo-accent">ku</span></div>
    </div>
  )
};

export { Logo };
export type { LogoProps };
