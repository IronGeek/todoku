import NextLink from 'next/link';

import { UpRightIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { LinkProps as NextLinkProps } from 'next/link';
import type { ComponentProps } from 'react';

import styles from './link.module.scss';

type LinkProps = NextLinkProps & Omit<ComponentProps<'a'>, 'href'> & {
  external?: boolean
}

const Link = ({ className, external, children, ...props }: LinkProps) => {
  return (
    <NextLink {...props} className={cx(styles.link, "link", className)}>
      {children}
      { external ? <UpRightIcon className="link-icon" /> : null }
    </NextLink>
  )
}

export { Link }
export type { LinkProps }
