'use client';

import { columnHelper } from '@/ui/data-table/columns.tsx';
import { formatters } from '@/ui/data-table/formatters.tsx';
import { headers } from '@/ui/data-table/headers.tsx';

import type { ColumnDef, InitialTableState } from '@tanstack/react-table';

import type { User } from '@/lib/prisma/client';

const columns: ColumnDef<User>[] = [
  columnHelper.select('select'),
  {
    id: 'id',

    accessorKey: 'id',
    header     : 'ID'
  },
  {
    accessorKey: 'name',
    header     : headers.sortable('Name')
  },
  {
    accessorKey: 'email',
    header     : headers.sortable('Email')
  },
  {
    accessorKey: 'role',
    header     : headers.sortable('Role'),
    meta       : {
      align: 'center'
    }
  },
  {
    id: 'verifiedAt',

    accessorKey: 'verifiedAt',
    cell       : formatters.check((row) => row.getValue('verifiedAt')),
    header     : 'Verified',
    meta       : {
      align: 'center'
    }
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
