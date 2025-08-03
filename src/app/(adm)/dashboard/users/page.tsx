import { Main } from '@/components/main.tsx';
import { getUsers } from '@/services/user.ts';
import { cx } from '@/ui/utils.ts';

import { auth } from '@/auth.ts';

import styles from './page.module.css';
import { UserTable } from './user-table.tsx';

import type { JSX } from 'react';

const Page = async (): Promise<JSX.Element> => {
  const session = await auth();
  const users = await getUsers();

  return (
    <Main className={cx(styles.main, 'fullscreen')}>
      <UserTable data={users} session={session} />
    </Main>
  );
};

Page.displayName = 'Page';

export default Page;
