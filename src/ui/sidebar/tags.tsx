import type { ComponentProps } from 'react';

import { cx } from '@/ui/utils';

import styles from './tags.module.scss';

type SidebarTagsProps = ComponentProps<'div'>

const SidebarTags = ({ className, children, ...props }: SidebarTagsProps) => {
  return (
    <div {...props} className={cx(styles.tags, "sidebar-tags", className)}>
      {children}
    </div>
  )
}

export { SidebarTags }
export type { SidebarTagsProps }
