import clsx from 'clsx';

import { ListIcon } from '@/ui/icons';

import type { ComponentProps } from 'react';

import styles from './toggler.module.scss';

type SidebarTogglerProps = ComponentProps<'button'> & {
};

const SidebarToggler = ({ className, ...props }: SidebarTogglerProps) => {
  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.toggler, "sidebar-toggler", className)}
    ><ListIcon /></button>
  )
};

export { SidebarToggler };
export type { SidebarTogglerProps };
