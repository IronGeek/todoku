import { Label } from '@radix-ui/react-dropdown-menu';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  readonly inset?: boolean
}): JSX.Element => (
  <Label
    className={cx(
      'px-2 py-1.5 font-bold data-[inset]:pl-8',
      className
    )}
    data-inset={inset}
    data-slot="dropdown-menu-label"
    {...props} />
);

DropdownLabel.displayName = 'DropdownLabel';

export { DropdownLabel };
