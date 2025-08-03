import { RadioGroup } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps, JSX } from 'react';

const DropdownRadioGroup = ({
  ...props
}: ComponentProps<typeof RadioGroup>): JSX.Element => (
  <RadioGroup
    data-slot="dropdown-menu-radio-group"
    {...props} />
);

DropdownRadioGroup.displayName = 'DropdownRadioGroup';

export { DropdownRadioGroup };
