'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { Footer } from '@/components/footer.tsx';
import { Logo } from '@/components/logo.tsx';
import { Navbar } from '@/components/navbar.tsx';
import { PersonArmsUpIcon, SettingsIcon, SignOutIcon, TaskIcon } from '@/ui/icons.ts';
import { Sidebar } from '@/ui/sidebar.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './admin-layout.module.scss';

import type { HTMLAttributes, JSX, PropsWithChildren } from 'react';

type AdminLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly navbar?: boolean
  readonly sidebar?: boolean
};

const AdminLayout = ({ className, footer, navbar, sidebar, children, ...props }: AdminLayoutProps): JSX.Element => {
  const { status } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapseSidebar = (): void => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div {...props} className={cx(styles.layout, className)}>
      {sidebar !== false
        ? (
          <Sidebar
            className="layout-sidebar"
            collapsed={sidebarCollapsed}
            footer={
              <Sidebar.Menu>
                <Sidebar.MenuItem icon={<SettingsIcon />} text="Settings" />

                { status === 'authenticated'
                  ? <Sidebar.MenuItem icon={<SignOutIcon />} text="Sign out" onClick={() => { signOut({ redirect: false }).then(() => { router.push('/') }) }} />
                  : null }
              </Sidebar.Menu>
            }
            logo={<Logo className="layout-logo" />}
            toggleSidebar={collapseSidebar}
          >
            <Sidebar.Menu header="Master Data">
              <Sidebar.MenuItem
                active={pathname === '/dashboard'}
                href="/dashboard"
                icon={<TaskIcon />}
                text="Dashboard" />

              <Sidebar.MenuItem
                active={pathname === '/dashboard/users'}
                href="/dashboard/users"
                icon={<PersonArmsUpIcon />}
                text="Users" />

              <Sidebar.MenuItem
                active={pathname === '/dashboard/taks'}
                href="/dashboard/tasks"
                icon={<TaskIcon />}
                text="Tasks" />
            </Sidebar.Menu>
          </Sidebar>)
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

AdminLayout.displayName = 'AdminLayout';

export { AdminLayout };
export type { AdminLayoutProps };
