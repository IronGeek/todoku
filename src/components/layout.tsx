'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';
import { Sidebar } from '@/ui/sidebar';
import { ArchivedIcon, CompletedIcon, PinIcon, PlusIcon, TaskIcon, TodayIcon, UpcomingIcon } from '@/ui/icons';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/state/hook';
import { Todo } from '@/state/todo/types';
import { isFuture, isToday } from 'date-fns';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const Layout = ({ className, footer, navbar, sidebar, children, ...props }: LayoutProps): ReactNode => {
  const pathname = usePathname();
  const items = useAppSelector((state) => state.todos.items);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapseSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const summary = useMemo(() => {
    console.log('summarizing');
    const sum = {
      upcoming: 0,
      today: 0,
      done: 0,
      pin: 0,
      all: items?.length ?? 0,
      archive: 0,
      list: {
        personal: 0,
        work: 0,
        health: 0,
        shopping: 0,
        misc: 0
      }
    };

    return items?.reduce((acc, item: Todo) => {
      if (item.due) {
        const date = new Date(item.due);
        if (isToday(date)) {
          acc.today++;
        } else if (isFuture(date)) {
          acc.upcoming++;
        }

        if (item.done) { acc.done++ }
        if (item.stared) { acc.pin++ }

        if (item.list === 'archive') {
          acc.archive++
        } else if (item.list === 'personal') {
          acc.list.personal++
        } else if (item.list === 'work') {
          acc.list.work++
        } else if (item.list === 'health') {
          acc.list.health++
        } else if (item.list === 'shopping') {
          acc.list.shopping++
        } else {
          acc.list.misc++
        }
      }
      return acc;
    }, sum) ?? sum;
  }, [items]);

  return (
    <div {...props} className={clsx(styles.layout, className)}>
      {sidebar !== false
        ? <Sidebar
            logo="Todoku"
            className="layout-sidebar"
            collapsed={sidebarCollapsed}
            toggleSidebar={collapseSidebar}>
            <Sidebar.Menu header="Tasks">
              <Sidebar.MenuItem
                active={pathname == '/'}
                icon={<TaskIcon />}
                badge={summary.all}
                href="/"
                text="All" />
              <Sidebar.MenuItem
                active={pathname == '/upcoming'}
                icon={<UpcomingIcon />}
                badge={summary.upcoming}
                href="/upcoming"
                text="Upcoming" />
              <Sidebar.MenuItem
                active={pathname == '/today'}
                icon={<TodayIcon />}
                badge={summary.today}
                href="/today"
                text="Today" />
              <Sidebar.MenuItem
                active={pathname == '/done'}
                icon={<CompletedIcon />}
                badge={summary.done}
                href="/done"
                text="Completed" />
              <Sidebar.MenuItem
                active={pathname == '/pin'}
                icon={<PinIcon />}
                badge={summary.pin}
                href="/pin"
                text="Pinned" />
              <Sidebar.MenuItem
                active={pathname == '/archive'}
                icon={<ArchivedIcon />}
                badge={summary.archive}
                href="/archive"
                text="Archived" />
            </Sidebar.Menu>
            <Sidebar.Menu header="List">
              <Sidebar.MenuItem badge={summary.list.personal } href="/personal" text="Personal" />
              <Sidebar.MenuItem badge={summary.list.work } href="/work" text="Work" />
              <Sidebar.MenuItem badge={summary.list.health } href="/health" text="Health" />
              <Sidebar.MenuItem badge={summary.list.shopping } href="/shopping" text="Shopping" />
              <Sidebar.MenuItem badge={summary.list.misc } href="/misc" text="Other" />
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
