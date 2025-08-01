import { cx } from "@/ui/utils"
import type { ComponentProps } from "react";

type TableHeaderProps = ComponentProps<"thead">;

const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return (
    <thead
      data-slot="table-header"
      className={cx("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

export { TableHeader }
export type { TableHeaderProps }
