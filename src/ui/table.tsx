import { TableBody } from '@/ui/table/body.tsx';
import { TableCaption } from '@/ui/table/caption.tsx';
import { TableCell } from '@/ui/table/cell.tsx';
import { TableFooter } from '@/ui/table/footer.tsx';
import { TableHead } from '@/ui/table/head.tsx';
import { TableHeader } from '@/ui/table/header.tsx';
import { TableRow } from '@/ui/table/row.tsx';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type TableProps = ComponentProps<'table'>;

const Table = ({ className, ...props }: TableProps): JSX.Element => (
  <div
    className="relative w-full overflow-x-auto"
    data-slot="table-container"
  >
    <table
      className={cx('w-full caption-bottom text-sm', className)}
      data-slot="table"
      {...props} />
  </div>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
Table.displayName = 'Table';

export { Table };
export type { TableProps };
