import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';

import { CheckIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

const DropdownCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof CheckboxItem>): JSX.Element => (
  <CheckboxItem
    checked={checked}
    className={cx(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="dropdown-menu-checkbox-item"
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <CheckIcon className="size-4" />
      </ItemIndicator>
    </span>

    {children}
  </CheckboxItem>
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

export { DropdownCheckboxItem };
