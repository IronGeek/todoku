import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownShortcut = ({
  className,
  ...props
}: ComponentProps<'span'>): JSX.Element => (
  <span
    className={cx(
      'text-muted-foreground ml-auto text-sm tracking-widest',
      className
    )}
    data-slot="dropdown-menu-shortcut"
    {...props} />
);

DropdownShortcut.displayName = 'DropdownShortcut';

export { DropdownShortcut };
