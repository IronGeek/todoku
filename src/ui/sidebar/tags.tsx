import clsx from 'clsx';
import type { ComponentProps } from 'react';

import styles from './tags.module.scss';

type SidebarTagsProps = ComponentProps<'div'>

const SidebarTags = ({ className, children, ...props }: SidebarTagsProps) => {
  return (
    <div {...props} className={clsx(styles.tags, "sidebar-tags", className)}>
      {children}
    </div>
  )
}

export { SidebarTags }
export type { SidebarTagsProps }
