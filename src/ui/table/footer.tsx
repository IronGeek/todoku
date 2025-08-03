import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableFooterProps = ComponentProps<'tfoot'>;

const TableFooter = ({ className, ...props }: TableFooterProps): JSX.Element => (
  <tfoot
    className={cx(
      'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
      className
    )}
    data-slot="table-footer"
    {...props} />
);

TableFooter.displayName = 'TableFooter';

export { TableFooter };
export type { TableFooterProps };
