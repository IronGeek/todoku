'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {  useState } from 'react';

import { Button } from '@/ui/button.tsx';
import { DataTablePagination } from '@/ui/data-table/pagination.tsx';
import { Dropdown } from '@/ui/dropdown.tsx';
import { CrossHairIcon } from '@/ui/icons.ts';
import { Input } from '@/ui/input.tsx';
import { Table } from '@/ui/table.tsx';
import { cx } from '@/ui/utils.ts';

import type { Column, ColumnDef, ColumnFiltersState, InitialTableState, SortingState, VisibilityState } from '@tanstack/react-table';
import type { Session } from 'next-auth';
import type { JSX, ReactNode } from 'react';

interface DataTableProps<TData, TValue> {
  readonly actions?: ReactNode
  readonly columns: ColumnDef<TData, TValue>[]
  readonly data: TData[]
  readonly filter?: string
  readonly initialState?: InitialTableState
  readonly session: Session
}

const getColumnText = <TData, TValue>(column: Column<TData, TValue>): string => {
  const { columnDef: col } = column;

  if (typeof col.header === 'function') {
    return 'text' in col.header ? col.header.text as string : col.id;
  }

  return col.header || col.id;
};

const DataTable = <TData, TValue>({
  actions,
  columns,
  data,
  initialState,
  filter,
  session
  /*
   * Columns,
   * initialState
   */
}: DataTableProps<TData, TValue>): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialState?.columnFilters ?? []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialState?.columnVisibility ?? {});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    columns,
    data,
    initialState,
    getCoreRowModel         : getCoreRowModel(),
    getFilteredRowModel     : getFilteredRowModel(),
    getPaginationRowModel   : getPaginationRowModel(),
    getSortedRowModel       : getSortedRowModel(),
    onColumnFiltersChange   : setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange    : setRowSelection,
    onSortingChange         : setSorting,
    state                   : {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting
    }
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          className="max-w-sm"
          placeholder="Filter..."
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)} />

        <div className="flex gap-2 ml-auto">
          {actions}

          <Dropdown>
            <Dropdown.Trigger asChild={true}>
              <Button variant="outline">
                <CrossHairIcon className="-mb-0.5 me-0.5" /> View
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => (
                  <Dropdown.CheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {getColumnText(column)}
                  </Dropdown.CheckboxItem>
                ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const alignment = header.column.columnDef.meta?.align ?? 'left';

                  return (
                    <Table.Head
                      key={header.id}
                      className={cx({ 'text-center': alignment === 'center', 'text-right': alignment === 'right' })}
                      style={{ width: header.column.columnDef.meta?.width }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </Table.Head>
                  );
                })}
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
                    <Table.Cell key={cell.id} align={cell.column.columnDef.meta?.align} style={{ width: cell.column.columnDef.meta?.width }}>
                      {flexRender(cell.column.columnDef.cell, { ...cell.getContext(), session })}
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

      <DataTablePagination data={table} />
    </div>
  );
};

DataTable.displayName = 'DataTable';
DataTable.Pagination = DataTablePagination;

export { DataTable };
export type { DataTableProps };
