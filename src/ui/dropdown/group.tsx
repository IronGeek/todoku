import { Group } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps, JSX } from 'react';

const DropdownGroup = ({
  ...props
}: ComponentProps<typeof Group>): JSX.Element => <Group data-slot="dropdown-menu-group" {...props} />;

DropdownGroup.displayName = 'DropdownGroup';

export { DropdownGroup };
