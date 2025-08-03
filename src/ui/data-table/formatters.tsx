import { formatRelative } from 'date-fns';

import { CheckLgIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { CellContext, Row } from '@tanstack/react-table';
import type { JSX } from 'react';

type CellFormatter<TData, TValue = unknown> = (ctx: CellContext<TData, TValue>) => JSX.Element;

// eslint-disable-next-line arrow-body-style
const formatDate = <TData, TValue = unknown>(col: string, base?: Date): CellFormatter<TData, TValue> => {
  // eslint-disable-next-line @react/display-name
  return ({ row, column }: CellContext<TData, TValue>): JSX.Element => {
    const { align, className } = column.columnDef.meta ?? {};
    const createdAt = row.getValue<Date | null>(col);

    const cls = cx(className, { 'text-center': align === 'center', 'text-right': align === 'right' });

    return <div className={cls}>{createdAt ? formatRelative(createdAt, base ?? new Date()) : null}</div>;
  };
};

// eslint-disable-next-line arrow-body-style
const formatCheck = <TData, TValue = unknown>(func: (row: Row<TData>) => boolean): CellFormatter<TData, TValue> => {
  // eslint-disable-next-line @react/display-name, arrow-body-style
  return ({ row }: CellContext<TData, TValue>): JSX.Element => {
    return <div className="flex items-center justify-center">{func(row) ? <CheckLgIcon /> : null}</div>;
  };
};

const formatters = Object.freeze({
  check: formatCheck,
  date : formatDate
});

export { formatters };
