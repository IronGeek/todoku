import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableHeadProps = ComponentProps<"th">;

const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      data-slot="table-head"
      className={cx(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

export { TableHead }
export type { TableHeadProps }
