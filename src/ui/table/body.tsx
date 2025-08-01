import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableBodyProps = ComponentProps<"tbody">;

const TableBody = ({ className, ...props }: TableBodyProps) => {
  return (
    <tbody
      data-slot="table-body"
      className={cx("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

export { TableBody }
export type { TableBodyProps }
