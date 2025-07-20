'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';
import { Sidebar } from '@/ui/sidebar';
import { PlusIcon } from '@/ui/icons';
import { usePathname } from 'next/navigation';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const Layout = ({ className, footer, navbar, sidebar, children, ...props }: LayoutProps): ReactNode => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const collapseSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div {...props} className={clsx(styles.layout, className)}>
      {sidebar !== false
        ? <Sidebar className="layout-sidebar" collapsed={sidebarCollapsed} toggleSidebar={collapseSidebar}>
            <Sidebar.Menu header="Tasks">
            </Sidebar.Menu>
            <Sidebar.Menu header="List">
              <Sidebar.MenuItem icon={<PlusIcon />} text="Add New List" />
            </Sidebar.Menu>
            <Sidebar.Menu header="Tags">
              <Sidebar.Tags>
              </Sidebar.Tags>
              <Sidebar.MenuItem icon={<PlusIcon />} text="Add New Tag" />
            </Sidebar.Menu>
          </Sidebar>
        : null }
      <div className="layout-content">
        {navbar !== false ? <Navbar sidebarCollapsed={sidebarCollapsed} toggleSidebar={collapseSidebar} /> : null }
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
