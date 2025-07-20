'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';
import { Sidebar } from '@/ui/sidebar';
import { ArchivedIcon, CompletedIcon, PinIcon, PlusIcon, TaskIcon, TodayIcon, UpcomingIcon } from '@/ui/icons';
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
        ? <Sidebar
            logo="Todoku"
            className="layout-sidebar"
            collapsed={sidebarCollapsed}
            toggleSidebar={collapseSidebar}>
            <Sidebar.Menu header="Tasks">
              <Sidebar.MenuItem active={pathname == '/'} icon={<TaskIcon />}  href="/" text="All" />
              <Sidebar.MenuItem active={pathname == '/upcoming'} icon={<UpcomingIcon />}  href="/upcoming" text="Upcoming" />
              <Sidebar.MenuItem active={pathname == '/today'} icon={<TodayIcon />} href="/today" text="Today" />
              <Sidebar.MenuItem active={pathname == '/done'} icon={<CompletedIcon />} href="/done" text="Completed" />
              <Sidebar.MenuItem active={pathname == '/pin'} icon={<PinIcon />} href="/pin" text="Pinned" />
              <Sidebar.MenuItem active={pathname == '/archive'} icon={<ArchivedIcon />} href="/archive" text="Archived" />
            </Sidebar.Menu>
            <Sidebar.Menu header="List">
              <Sidebar.MenuItem href="/personal" text="Personal" />
              <Sidebar.MenuItem href="/work" text="Work" />
              <Sidebar.MenuItem href="/health" text="Health" />
              <Sidebar.MenuItem href="/shopping" text="Shopping" />
              <Sidebar.MenuItem href="/misc" text="Other" />
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

export { Layout };
export type { LayoutProps };
