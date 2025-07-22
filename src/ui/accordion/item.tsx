import { Item } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils'
import type { ComponentProps } from "react"

type AccordionItemProps = ComponentProps<typeof Item>;

const AccordionItem = ({
  className,
  ...props
}: AccordionItemProps) => {
  return (
    <Item
      data-slot="accordion-item"
      className={cx("border-b border-dashed last:border-b-0", className)}
      {...props}
    />
  )
}

export { AccordionItem }
export type { AccordionItemProps }
