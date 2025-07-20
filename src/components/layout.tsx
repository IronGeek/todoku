import clsx from 'clsx';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const Layout = ({ className, footer, navbar, sidebar, children, ...props }: LayoutProps): ReactNode => {
  return (
    <div {...props} className={clsx(styles.layout, className)}>
      <div className="layout-content">
        {navbar !== false ? <Navbar /> : null }
        <div className="layout-main">
          {children}
          {footer !== false ? <Footer /> : null }
        </div>
      </div>
    </div>
  );
};

export { Layout };
export type { LayoutProps };
