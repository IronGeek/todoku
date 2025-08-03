'use client';

import { columnHelper } from '@/ui/data-table/columns.tsx';
import { formatters } from '@/ui/data-table/formatters.tsx';
import { headers } from '@/ui/data-table/headers.tsx';

import type { ColumnDef, InitialTableState } from '@tanstack/react-table';

import type { Task } from '@/lib/prisma/client';

const columns: ColumnDef<Task>[] = [
  columnHelper.select('select'),
  {
    id: 'id',

    accessorKey: 'id',
    header     : 'ID'
  },
  {
    accessorKey: 'title',
    header     : headers.sortable('Title')
  },
  {
    accessorKey: 'description',
    header     : headers.sortable('Description')
  },
  {
    id: 'createdAt',

    accessorKey: 'createdAt',
    cell       : formatters.date('createdAt'),
    header     : 'Created'
  },
  {
    id: 'updatedAt',

    accessorKey: 'updatedAt',
    cell       : formatters.date('createdAt'),
    header     : 'Updated'
  }
];

const initialState: InitialTableState = {
  columnVisibility: {
    createdAt: false,
    id       : false,
    updatedAt: false
  }
};

export { columns, initialState };
