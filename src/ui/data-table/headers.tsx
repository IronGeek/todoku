import { Button } from '@/ui/button.tsx';
import { SortAscIcon, SortDescIcon } from '@/ui/icons.ts';

import type { HeaderContext } from '@tanstack/react-table';
import type { JSX } from 'react';

type HeaderFormatter<TData, TValue = unknown> = (ctx: HeaderContext<TData, TValue>) => JSX.Element;

const sortableHeader = <TData, TValue = unknown>(text: string): HeaderFormatter<TData, TValue> => {
  const sorter = ({ column }: HeaderContext<TData, TValue>): JSX.Element => (
    <Button
      size="none"
      variant="text"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {text}

      { column.getSortIndex() === 0
        ? column.getIsSorted() === 'asc'
          ? <SortAscIcon className="ml-2 h-4 w-4" />
          : <SortDescIcon className="ml-2 h-4 w-4" />
        : null}
    </Button>
  );

  return Object.assign(sorter, { text });
};

const headers = Object.freeze({
  sortable: sortableHeader
});

export { headers };
