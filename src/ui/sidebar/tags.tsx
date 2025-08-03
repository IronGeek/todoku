import { cx } from '@/ui/utils.ts';

import styles from './tags.module.scss';

import type { ComponentProps, JSX } from 'react';

type SidebarTagsProps = ComponentProps<'div'>;

const SidebarTags = ({ className, children, ...props }: SidebarTagsProps): JSX.Element => (
  <div {...props} className={cx(styles.tags, 'sidebar-tags', className)}>
    {children}
  </div>
);

SidebarTags.displayName = 'SidebarTags';

export { SidebarTags };
export type { SidebarTagsProps };
