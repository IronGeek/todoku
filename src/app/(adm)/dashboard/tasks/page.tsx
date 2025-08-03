import { Main } from '@/components/main.tsx';
import { getTasks } from '@/services/task.ts';
import { cx } from '@/ui/utils.ts';

import { auth } from '@/auth.ts';

import styles from './page.module.css';
import { TaskTable } from './task-table.tsx';

import type { JSX } from 'react';

const Page = async (): Promise<JSX.Element> => {
  const session = await auth();
  const tasks = await getTasks();

  return (
    <Main className={cx(styles.main, 'fullscreen')}>
      <TaskTable data={tasks} session={session} />
    </Main>
  );
};

Page.displayName = 'Page';

export default Page;
