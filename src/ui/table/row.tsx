import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableRowProps = ComponentProps<'tr'>;

const TableRow = ({ className, ...props }: TableRowProps): JSX.Element => (
  <tr
    className={cx(
      'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
      className
    )}
    data-slot="table-row"
    {...props} />
);

TableRow.displayName = 'TableRow';

export { TableRow };
export type { TableRowProps };
