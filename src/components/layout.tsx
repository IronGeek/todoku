'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styles from './layout.module.scss';
import { Sidebar } from '@/ui/sidebar';
import { ArchivedIcon, CompletedIcon, PinIcon, PlusIcon, TaskIcon, TodayIcon, UpcomingIcon } from '@/ui/icons';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import { Todo, TodoSummary } from '@/state/todo/types';
import { isAfter, isToday, startOfDay } from 'date-fns';
import { setSummary } from '@/state/todo';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  readonly footer?: boolean
  readonly sidebar?: boolean
  readonly navbar?: boolean
};

const Layout = ({ className, footer, navbar, sidebar, children, ...props }: LayoutProps): ReactNode => {
  const pathname = usePathname();
  const items = useAppSelector((state) => state.todos.items);
  const dispatch = useAppDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapseSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const summary = useMemo(() => {
    const sum: TodoSummary = {
      upcoming: [0, 0],
      today: [0, 0],
      done: [0, 0],
      pin: [0, 0],
      all: [0, items?.length ?? 0],
      archive: [0, 0],
      list: {
        personal: [0, 0],
        work: [0, 0],
        health: [0, 0],
        shopping: [0, 0],
        misc: [0, 0]
      }
    };

    const now = new Date();
    return items?.reduce((acc, item: Todo) => {
      if (item.done) { acc.all[0]++ }

      if (item.due) {
        const date = new Date(item.due);
        if (isToday(date)) {
          if (item.done) { acc.today[0]++ }
          acc.today[1]++;
        }
        if (isAfter(date, startOfDay(now))) {
          if (item.done) { acc.upcoming[0]++ }
          acc.upcoming[1]++;
        }
      }

      if (item.done) {
        if (item.done) { acc.done[0]++ }
        acc.done[1]++;
      }
      if (item.stared) {
        if (item.done) { acc.pin[0]++ }
        acc.pin[1]++;
      }

      if (item.list === 'archive') {
        if (item.done) { acc.archive[0]++ }
        acc.archive[1]++;
      } else if (item.list === 'personal') {
        if (item.done) { acc.list.personal[0]++ }
        acc.list.personal[1]++;
      } else if (item.list === 'work') {
        if (item.done) { acc.list.work[0]++ }
        acc.list.work[1]++;
      } else if (item.list === 'health') {
        if (item.done) { acc.list.health[0]++ }
        acc.list.health[1]++;
      } else if (item.list === 'shopping') {
        if (item.done) { acc.list.shopping[0]++ }
        acc.list.shopping[1]++;
      } else {
        if (item.done) { acc.list.misc[0]++ }
        acc.list.misc[1]++;
      }

      return acc;
    }, sum) ?? sum;
  }, [items]);

  useEffect(() => {
    dispatch(setSummary({ summary }));
  }, [summary]);

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
                badge={summary.all[1]}
                href="/"
                text="All" />
              <Sidebar.MenuItem
                active={pathname == '/upcoming'}
                icon={<UpcomingIcon />}
                badge={summary.upcoming[1]}
                href="/upcoming"
                text="Upcoming" />
              <Sidebar.MenuItem
                active={pathname == '/today'}
                icon={<TodayIcon />}
                badge={summary.today[1]}
                href="/today"
                text="Today" />
              <Sidebar.MenuItem
                active={pathname == '/done'}
                icon={<CompletedIcon />}
                badge={summary.done[1]}
                href="/done"
                text="Completed" />
              <Sidebar.MenuItem
                active={pathname == '/pin'}
                icon={<PinIcon />}
                badge={summary.pin[1]}
                href="/pin"
                text="Pinned" />
              <Sidebar.MenuItem
                active={pathname == '/archive'}
                icon={<ArchivedIcon />}
                badge={summary.archive[1]}
                href="/archive"
                text="Archived" />
            </Sidebar.Menu>
            <Sidebar.Menu header="List">
              <Sidebar.MenuItem badge={summary.list.personal[1] } href="/personal" text="Personal" />
              <Sidebar.MenuItem badge={summary.list.work[1] } href="/work" text="Work" />
              <Sidebar.MenuItem badge={summary.list.health[1] } href="/health" text="Health" />
              <Sidebar.MenuItem badge={summary.list.shopping[1] } href="/shopping" text="Shopping" />
              <Sidebar.MenuItem badge={summary.list.misc[1] } href="/misc" text="Other" />
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
