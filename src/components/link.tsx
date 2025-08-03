import NextLink from 'next/link';

import { UpRightIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './link.module.scss';

import type { LinkProps as NextLinkProps } from 'next/link';
import type { ComponentProps, JSX } from 'react';

type LinkProps = NextLinkProps & Omit<ComponentProps<'a'>, 'href'> & {
  readonly external?: boolean
};

const Link = ({ className, external, children, ...props }: LinkProps): JSX.Element => (
  <NextLink {...props} className={cx(styles.link, 'link', className)}>
    {children}
    { external ? <UpRightIcon className="link-icon" /> : null }
  </NextLink>
);

Link.displayName = 'Link';

export { Link };
export type { LinkProps };
