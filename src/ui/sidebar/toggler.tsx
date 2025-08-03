import { ListIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './toggler.module.scss';

import type { ComponentProps, JSX } from 'react';

type SidebarTogglerProps = ComponentProps<'button'> & {
};

const SidebarToggler = ({ className, ...props }: SidebarTogglerProps): JSX.Element => (
  <button
    {...props}
    className={cx(styles.toggler, 'sidebar-toggler', className)}
    type="button"
  ><ListIcon />
  </button>
);

SidebarToggler.displayName = 'SidebarToggler';

export { SidebarToggler };
export type { SidebarTogglerProps };
