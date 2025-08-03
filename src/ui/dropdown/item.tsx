import { Item } from '@radix-ui/react-dropdown-menu';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof Item> & {
  readonly inset?: boolean
  readonly variant?: 'default' | 'destructive'
}): JSX.Element => (
  <Item
    className={cx(
      "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-inset={inset}
    data-slot="dropdown-menu-item"
    data-variant={variant}
    {...props} />
);

DropdownItem.displayName = 'DropdownItem';

export { DropdownItem };
