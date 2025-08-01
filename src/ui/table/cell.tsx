import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableCellProps = ComponentProps<"td">;

const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      data-slot="table-cell"
      className={cx(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

export { TableCell }
export type { TableCellProps }
