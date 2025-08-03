import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableHeadProps = ComponentProps<'th'>;

const TableHead = ({ className, ...props }: TableHeadProps): JSX.Element => (
  <th
    className={cx(
      'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    data-slot="table-head"
    {...props} />
);

TableHead.displayName = 'TableHead';

export { TableHead };
export type { TableHeadProps };
