import { Group } from '@radix-ui/react-select';

import type { ComponentProps, JSX } from 'react';

type SelectGroupProps = ComponentProps<typeof Group>;

const SelectGroup = ({
  ...props
}: SelectGroupProps): JSX.Element => <Group data-slot="select-group" {...props} />;

SelectGroup.displayName = 'SelectGroup';

export { SelectGroup };
export type { SelectGroupProps };
