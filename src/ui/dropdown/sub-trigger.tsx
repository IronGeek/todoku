import { SubTrigger } from '@radix-ui/react-dropdown-menu';

import { ChevronRightIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof SubTrigger> & {
  readonly inset?: boolean
}): JSX.Element => (
  <SubTrigger
    className={cx(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 outline-hidden select-none data-[inset]:pl-8',
      className
    )}
    data-inset={inset}
    data-slot="dropdown-menu-sub-trigger"
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </SubTrigger>
);

DropdownSubTrigger.displayName = 'DropdownSubTrigger';

export { DropdownSubTrigger };
