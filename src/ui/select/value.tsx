import { Value } from '@radix-ui/react-select';

import type { ComponentProps, JSX } from 'react';

type SelectValueProps = ComponentProps<typeof Value>;
const SelectValue = ({
  ...props
}: SelectValueProps): JSX.Element => <Value data-slot="select-value" {...props} />;

SelectValue.displayName = 'SelectValue';

export { SelectValue };
export type { SelectValueProps };
