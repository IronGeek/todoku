'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { Link } from '@/components/link.tsx';
import { LinkButton } from '@/ui/forms/link-button.tsx';
import { GithubIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './page-menu.module.scss';

import type { HTMLAttributes, JSX } from 'react';

type PageMenuProps = HTMLAttributes<HTMLOListElement> & {
};

const PageMenu = ({ className, ...props }: PageMenuProps): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <ol {...props} className={cx(styles.menu, 'page-menu', className)}>
      { status === 'authenticated'
        ? (
          <li className={cx('page-menu-item')}>
            <div className="flex flex-col gap-2s items-end">
              <span className="font-bold">{session.user?.name}</span>
              <span className="text-sm text-blue-600">{session.user?.email}</span>
            </div>
          </li>
        )
        : null }

      <li className={styles.menu_item}>
        <Link href="https://github.com/IronGeek/todoku" target="_blank" title="Repository"><GithubIcon size="1.5em" /></Link>
      </li>

      <li className={cx('page-menu-item')}>
        { status === 'authenticated'
          ? (
            <LinkButton>
              <button className="primary" type="button" onClick={() => signOut({ redirect: false }).then(() => { router.push('/') })}>Sign Out</button>
            </LinkButton>)
          : null }
      </li>
    </ol>
  );
};

PageMenu.displayName = 'PageMenu';

export { PageMenu };
export type { PageMenuProps };
