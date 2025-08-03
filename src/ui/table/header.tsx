import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableHeaderProps = ComponentProps<'thead'>;

const TableHeader = ({ className, ...props }: TableHeaderProps): JSX.Element => (
  <thead
    className={cx('[&_tr]:border-b', className)}
    data-slot="table-header"
    {...props} />
);

TableHeader.displayName = 'TableHeader';

export { TableHeader };
export type { TableHeaderProps };
