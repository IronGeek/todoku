import { Button } from '@/ui/button.tsx';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/ui/icons.ts';
import { Select } from '@/ui/select.tsx';

import type { Table } from '@tanstack/react-table';
import type { ComponentProps, JSX } from 'react';

type DataTablePaginationProps<TData> = ComponentProps<'div'> & {
  readonly data: Table<TData>
};

const DataTablePagination = <TData,>({
  data,
  ...props
}: DataTablePaginationProps<TData>): JSX.Element => {
  const paging = data.getState().pagination;

  return (
    <div {...props} className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 me-auto">
        {data.getFilteredSelectedRowModel().rows.length} of {data.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center gap-2">
        Rows per page

        <Select
          value={`${paging.pageSize}`}
          onValueChange={(value) => {
            data.setPageSize(Number(value));
          }}
        >
          <Select.Trigger className="h-8 w-[70px]">
            <Select.Value placeholder={paging.pageSize} />
          </Select.Trigger>

          <Select.Content side="top">
            {
              // eslint-disable-next-line @ts/no-magic-numbers
              [1, 10, 20, 25, 30, 40, 50].map((pageSize) => (
                <Select.Item key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </Select.Item>
              ))
            }
          </Select.Content>
        </Select>
      </div>

      <Button
        className="border rounded p-1"
        disabled={!data.getCanPreviousPage()}
        size="icon"
        variant="outline"
        onClick={() => data.firstPage()}
      >
        <ChevronDoubleLeftIcon />
      </Button>

      <Button
        disabled={!data.getCanPreviousPage()}
        size="icon"
        variant="outline"
        onClick={() => data.previousPage()}
      >
        <ChevronLeftIcon />
      </Button>

      <div>Page {(paging?.pageIndex ?? 0) + 1} of {data.getPageCount()}</div>

      <Button
        disabled={!data.getCanNextPage()}
        size="icon"
        variant="outline"
        onClick={() => data.nextPage()}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={!data.getCanNextPage()}
        size="icon"
        variant="outline"
        onClick={() => data.lastPage()}
      >
        <ChevronDoubleRightIcon />
      </Button>

    </div>
  );
};

DataTablePagination.displayName = 'DataTablePagination';

export { DataTablePagination };
