import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableFooterProps = ComponentProps<"tfoot">;

const TableFooter = ({ className, ...props }: TableFooterProps) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cx(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

export { TableFooter }
export type { TableFooterProps }
