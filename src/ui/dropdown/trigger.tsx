import { Trigger } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps, JSX } from 'react';

const DropdownTrigger = ({
  ...props
}: ComponentProps<typeof Trigger>): JSX.Element => (
  <Trigger
    data-slot="dropdown-menu-trigger"
    {...props} />
);

DropdownTrigger.displayName = 'DropdownTrigger';

export { DropdownTrigger };
