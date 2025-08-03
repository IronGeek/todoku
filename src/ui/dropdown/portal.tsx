import { Portal } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps, JSX } from 'react';

const DropdownPortal = ({
  ...props
}: ComponentProps<typeof Portal>): JSX.Element => <Portal data-slot="dropdown-menu-portal" {...props} />;

DropdownPortal.displayName = 'DropdownPortal';

export { DropdownPortal };
