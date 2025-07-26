'use client'

import { Link } from '@/components/link';
import { cx } from '@/ui/utils';
import { GitHubIcon } from '@/ui/icons';

import type { HTMLAttributes } from 'react';

import styles from './page-menu.module.scss';
import { signOut, signIn, useSession } from 'next-auth/react';
import { LinkButton } from '@/ui/forms/link-button';

type PageMenuProps = HTMLAttributes<HTMLOListElement> & {
};

const PageMenu = ({ className, ...props }: PageMenuProps) => {
  const { data: session, status } = useSession();

  return (
    <ol {...props} className={cx(styles.menu, "page-menu", className)}>
      { status === 'authenticated'
        ? <li className={cx('page-menu-item')}>
            <div className="flex flex-col gap-2s items-end">
              <span className="font-bold">{session.user?.name}</span>
              <span className="text-sm text-blue-600">{session.user?.email}</span>
            </div>
          </li>
        : null }
      <li className={styles.menu_item}>
        <Link title="Repository" target="_blank" href="https://github.com/IronGeek/todoku"><GitHubIcon size="1.5em" /></Link>
      </li>
      <li className={cx('page-menu-item')}>
      { status === 'authenticated'
        ? <LinkButton>
            <button className="primary" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
          </LinkButton>
        : null  }
        </li>
    </ol>
  );
};

export { PageMenu };
export type { PageMenuProps };
