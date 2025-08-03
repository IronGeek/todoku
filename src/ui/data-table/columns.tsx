import { Checkbox } from '@/ui/checkbox.tsx';

import type { CellContext, ColumnDef, HeaderContext, RowData } from '@tanstack/react-table';
import type { Session } from 'next-auth';
import type { JSX } from 'react';

type SessionCellContext<TData extends RowData, TValue> = CellContext<TData, TValue> & {
  session: Session
};

const selectColumn = <TData, TValue = unknown>(id: string, props?: Omit<ColumnDef<TData, TValue>, 'cell' | 'header' | 'id'>): ColumnDef<TData, TValue> => ({
  id,

  cell: ({ row }: CellContext<TData, TValue>): JSX.Element => (
    <Checkbox
      aria-label="Select row"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)} />
  ),
  enableHiding : false,
  enableSorting: false,
  header       : ({ table }: HeaderContext<TData, TValue>): JSX.Element => (
    <Checkbox
      aria-label="Select all"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
  ),
  meta: {
    align: 'center',
    width: 20
  },
  ...props
});

const actionsColumn = <TData, TValue = unknown>(
  id: string,
  actions: (data: TData, context: SessionCellContext<TData, TValue>) => JSX.Element,
  props?: Omit<ColumnDef<TData, TValue>, 'cell' | 'id'>
): ColumnDef<TData, TValue> => ({
  id,

  cell: (ctx: SessionCellContext<TData, TValue>): JSX.Element => {
    const data = ctx.row.original;

    return <div className="inline-flex items-center">{actions(data, ctx)}</div>;
  },
  enableHiding : false,
  enableSorting: false,
  ...props
});

const columnHelper = Object.freeze({
  actions: actionsColumn,
  select : selectColumn
});

export { columnHelper };
export type { SessionCellContext };
