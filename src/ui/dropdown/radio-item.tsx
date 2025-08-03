import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';

import { CircleIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof RadioItem>): JSX.Element => (
  <RadioItem
    className={cx(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="dropdown-menu-radio-item"
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </ItemIndicator>
    </span>

    {children}
  </RadioItem>
);

DropdownRadioItem.displayName = 'DropdownRadioItem';

export { DropdownRadioItem };
