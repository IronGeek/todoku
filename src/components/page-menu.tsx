'use client'

import { usePathname } from 'next/navigation'

import { Link } from '@/components/link';
import { cx } from '@/ui/utils';
import { GitHubIcon } from '@/ui/icons';

import type { HTMLAttributes } from 'react';

import styles from './page-menu.module.scss';

type PageMenuProps = HTMLAttributes<HTMLOListElement> & {
};

const PageMenu = ({ className, ...props }: PageMenuProps) => {
  const pathname = usePathname()

  return (
    <ol {...props} className={cx(styles.menu, "page-menu", className)}>
      <li className={cx('page-menu-item', { active: pathname === '/' })}>
        <Link title="Home" href="/">Home</Link>
      </li>
      <li className={styles.menu_item}>
        <Link title="Repository" target="_blank" href="https://github.com/IronGeek/todoku"><GitHubIcon size="1.5em" /></Link>
      </li>
    </ol>
  );
};

export { PageMenu };
export type { PageMenuProps };
