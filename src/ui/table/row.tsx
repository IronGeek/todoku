import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableRowProps = ComponentProps<"tr">;

const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      data-slot="table-row"
      className={cx(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

export { TableRow }
export type { TableRowProps }
