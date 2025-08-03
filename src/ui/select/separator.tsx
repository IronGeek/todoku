import { Separator } from '@radix-ui/react-select';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type SelectSeparatorProps = ComponentProps<typeof Separator>;

const SelectSeparator = ({
  className,
  ...props
}: SelectSeparatorProps): JSX.Element => (
  <Separator
    className={cx('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
    data-slot="select-separator"
    {...props} />
);

SelectSeparator.displayName = 'SelectSeparator';

export { SelectSeparator };
export type { SelectSeparatorProps };
