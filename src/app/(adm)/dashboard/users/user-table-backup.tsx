'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import {  Table } from '@/ui/table.tsx';

import type { ColumnDef } from '@tanstack/react-table';
import type { JSX } from 'react';

interface DataTableProps<TData, TValue> {
  readonly columns: ColumnDef<TData, TValue>[]
  readonly data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>): JSX.Element => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} align={cell.column.columnDef.meta.align}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
            : (
              <Table.Row>
                <Table.Cell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>
    </div>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };
export type { DataTableProps };
