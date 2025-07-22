import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react'

const DropdownShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}
export { DropdownShortcut }
