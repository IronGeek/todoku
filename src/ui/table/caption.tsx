import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableCaptionProps = ComponentProps<"caption">;

const TableCaption = ({ className, ...props}: TableCaptionProps) => {
  return (
    <caption
      data-slot="table-caption"
      className={cx("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export { TableCaption }
export type { TableCaptionProps }
