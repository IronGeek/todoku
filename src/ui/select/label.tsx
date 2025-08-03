import { Label } from '@radix-ui/react-select';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type SelectLabelProps = ComponentProps<typeof Label>;
const SelectLabel = ({
  className,
  ...props
}: SelectLabelProps): JSX.Element => (
  <Label
    className={cx('text-muted-foreground px-2 py-1.5 text-xs', className)}
    data-slot="select-label"
    {...props} />
);

SelectLabel.displayName = 'SelectLabel';

export { SelectLabel };
export type { SelectLabelProps };
