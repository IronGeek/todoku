'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { Footer } from '@/components/footer.tsx';
import { Logo } from '@/components/logo.tsx';
import { Navbar } from '@/components/navbar.tsx';
import { useAppSelector } from '@/state/hook.ts';
import { ArchivedIcon, CompletedIcon, PinIcon, PlusIcon, SettingsIcon, SignOutIcon, TaskIcon, TodayIcon, UpcomingIcon } from '@/ui/icons.ts';
import { Sidebar } from '@/ui/sidebar.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './user-layout.module.scss';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

type UserLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly navbar?: boolean
  readonly sidebar?: boolean
};

// eslint-disable-next-line complexity
const UserLayout = ({ className, footer, navbar, sidebar, children, ...props }: UserLayoutProps): ReactNode => {
  const { status } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const summary = useAppSelector((state) => state.todos.summary);
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
            <Sidebar.Menu header="Tasks">
              <Sidebar.MenuItem
                active={pathname === '/home'}
                badge={summary?.all[1] ?? '...'}
                href="/home"
                icon={<TaskIcon />}
                text="Home" />

              <Sidebar.MenuItem
                active={pathname === '/upcoming'}
                badge={summary?.upcoming[1] ?? '...'}
                href="/upcoming"
                icon={<UpcomingIcon />}
                text="Upcoming" />

              <Sidebar.MenuItem
                active={pathname === '/today'}
                badge={summary?.today[1] ?? '...'}
                href="/today"
                icon={<TodayIcon />}
                text="Today" />

              <Sidebar.MenuItem
                active={pathname === '/done'}
                badge={summary?.done[1] ?? '...'}
                href="/done"
                icon={<CompletedIcon />}
                text="Completed" />

              <Sidebar.MenuItem
                active={pathname === '/pin'}
                badge={summary?.pin[1] ?? '...'}
                href="/pin"
                icon={<PinIcon />}
                text="Pinned" />
            </Sidebar.Menu>

            <Sidebar.Menu>
              <Sidebar.MenuItem
                active={pathname === '/archive'}
                badge={summary?.archive[1] ?? '...'}
                href="/archive"
                icon={<ArchivedIcon />}
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

UserLayout.displayName = 'UserLayout';

export { UserLayout };
export type { UserLayoutProps };
