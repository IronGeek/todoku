'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/ui/sidebar';
import { PersonArmsUpIcon, SettingsIcon, SignOutIcon, TaskIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './admin-layout.module.scss';
import { signOut, useSession } from 'next-auth/react';

type AdminLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const AdminLayout = ({ className, footer, navbar, sidebar, children, ...props }: AdminLayoutProps): ReactNode => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapseSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div {...props} className={cx(styles.layout, className)}>
      {sidebar !== false
        ? <Sidebar
            logo={<Logo className="layout-logo" />}
            footer={
              <Sidebar.Menu>
                <Sidebar.MenuItem icon={<SettingsIcon />} text="Settings" />
                { status === 'authenticated'
                  ? <Sidebar.MenuItem icon={<SignOutIcon />} text="Sign out" onClick={() => { signOut({ redirect: false }).then(() => { router.push('/') }) }} />
                  : null }
              </Sidebar.Menu>
            }
            className="layout-sidebar"
            collapsed={sidebarCollapsed}
            toggleSidebar={collapseSidebar}>
            <Sidebar.Menu header="Master Data">
              <Sidebar.MenuItem
                active={pathname == '/dashboard'}
                icon={<TaskIcon />}
                href="/dashboard"
                text="Dashboard" />
              <Sidebar.MenuItem
                active={pathname == '/dashboard/users'}
                icon={<PersonArmsUpIcon />}
                href="/dashboard/users"
                text="Users" />
              <Sidebar.MenuItem
                active={pathname == '/dashboard/taks'}
                icon={<TaskIcon />}
                href="/dashboard/tasks"
                text="Tasks" />
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

export { AdminLayout };
export type { AdminLayoutProps };
