import { cx } from "@/ui/utils"

import { TableHeader } from '@/ui/table/header';
import { TableBody } from '@/ui/table/body';
import { TableFooter } from '@/ui/table/footer';
import { TableRow } from '@/ui/table/row';
import { TableHead } from '@/ui/table/head';
import { TableCell } from '@/ui/table/cell';
import { TableCaption } from '@/ui/table/caption';

import type { ComponentProps } from "react";

type TableProps = ComponentProps<"table">;

const Table = ({ className, ...props }: TableProps) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cx("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;

export { Table }
export type { TableProps }
