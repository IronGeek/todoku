import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableCaptionProps = ComponentProps<'caption'>;

const TableCaption = ({ className, ...props }: TableCaptionProps): JSX.Element => (
  <caption
    className={cx('text-muted-foreground mt-4 text-sm', className)}
    data-slot="table-caption"
    {...props} />
);

TableCaption.displayName = 'TableCaption';

export { TableCaption };
export type { TableCaptionProps };
