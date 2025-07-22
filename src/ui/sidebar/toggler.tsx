import { ListIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react';

import styles from './toggler.module.scss';

type SidebarTogglerProps = ComponentProps<'button'> & {
};

const SidebarToggler = ({ className, ...props }: SidebarTogglerProps) => {
  return (
    <button
      {...props}
      type="button"
      className={cx(styles.toggler, "sidebar-toggler", className)}
    ><ListIcon /></button>
  )
};

export { SidebarToggler };
export type { SidebarTogglerProps };
