import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableBodyProps = ComponentProps<'tbody'>;

const TableBody = ({ className, ...props }: TableBodyProps): JSX.Element => (
  <tbody
    className={cx('[&_tr:last-child]:border-0', className)}
    data-slot="table-body"
    {...props} />
);

TableBody.displayName = 'TableBody';

export { TableBody };
export type { TableBodyProps };
