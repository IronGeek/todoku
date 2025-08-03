import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableCellProps = ComponentProps<'td'>;

const TableCell = ({ className, ...props }: TableCellProps): JSX.Element => (
  <td
    className={cx(
      'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    data-slot="table-cell"
    {...props} />
);

TableCell.displayName = 'TableCell';

export { TableCell };
export type { TableCellProps };
