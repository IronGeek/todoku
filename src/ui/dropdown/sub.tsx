import { Sub } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps, JSX } from 'react';

const DropdownSub = ({
  ...props
}: ComponentProps<typeof Sub>): JSX.Element => <Sub data-slot="dropdown-menu-sub" {...props} />;

DropdownSub.displayName = 'DropdownSub';

export { DropdownSub };
