import { Separator } from '@radix-ui/react-dropdown-menu';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>): JSX.Element => (
  <Separator
    className={cx('bg-border -mx-1 my-1 h-px', className)}
    data-slot="dropdown-menu-separator"
    {...props} />
);

DropdownSeparator.displayName = 'DropdownSeparator';

export { DropdownSeparator };
