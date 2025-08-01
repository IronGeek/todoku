'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAppSelector } from '@/state/hook';
import { Sidebar } from '@/ui/sidebar';
import { ArchivedIcon, CompletedIcon, PinIcon, PlusIcon, SettingsIcon, SignOutIcon, TaskIcon, TodayIcon, UpcomingIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './user-layout.module.scss';
import { signOut, useSession } from 'next-auth/react';

type UserLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const UserLayout = ({ className, footer, navbar, sidebar, children, ...props }: UserLayoutProps): ReactNode => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const summary = useAppSelector((state) => state.todos.summary);
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
            <Sidebar.Menu header="Tasks">
              <Sidebar.MenuItem
                active={pathname == '/home'}
                icon={<TaskIcon />}
                badge={summary?.all[1] ?? '...'}
                href="/home"
                text="Home" />
              <Sidebar.MenuItem
                active={pathname == '/upcoming'}
                icon={<UpcomingIcon />}
                badge={summary?.upcoming[1] ?? '...'}
                href="/upcoming"
                text="Upcoming" />
              <Sidebar.MenuItem
                active={pathname == '/today'}
                icon={<TodayIcon />}
                badge={summary?.today[1] ?? '...'}
                href="/today"
                text="Today" />
              <Sidebar.MenuItem
                active={pathname == '/done'}
                icon={<CompletedIcon />}
                badge={summary?.done[1] ?? '...'}
                href="/done"
                text="Completed" />
              <Sidebar.MenuItem
                active={pathname == '/pin'}
                icon={<PinIcon />}
                badge={summary?.pin[1] ?? '...'}
                href="/pin"
                text="Pinned" />
            </Sidebar.Menu>
            <Sidebar.Menu>
              <Sidebar.MenuItem
                active={pathname == '/archive'}
                icon={<ArchivedIcon />}
                badge={summary?.archive[1] ?? '...'}
                href="/archive"
                text="Archived" />
            </Sidebar.Menu>
            <Sidebar.Menu header="List">
              <Sidebar.MenuItem badge={summary?.list.personal[1] ?? '...'} href="/l/personal" text="Personal" />
              <Sidebar.MenuItem badge={summary?.list.work[1] ?? '...'} href="/l/work" text="Work" />
              <Sidebar.MenuItem badge={summary?.list.health[1] ?? '...'} href="/l/health" text="Health" />
              <Sidebar.MenuItem badge={summary?.list.shopping[1] ?? '...'} href="/l/shopping" text="Shopping" />
              <Sidebar.MenuItem badge={summary?.list.misc[1] ?? '...'} href="/l/misc" text="Other" />
              <Sidebar.MenuItem icon={<PlusIcon />} text="Add New List" />
            </Sidebar.Menu>
            <Sidebar.Menu header="Tags">
              <Sidebar.Tags>
                <Sidebar.Tag text="Foo" />
                <Sidebar.Tag text="Bar" />
                <Sidebar.Tag text="Baz" />
                <Sidebar.Tag text="What" />
                <Sidebar.Tag text="Who" />
                <Sidebar.Tag text="When" />
                <Sidebar.Tag text="Where" />
                <Sidebar.Tag text="Why" />
                <Sidebar.Tag text="How" />
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

export { UserLayout };
export type { UserLayoutProps };
