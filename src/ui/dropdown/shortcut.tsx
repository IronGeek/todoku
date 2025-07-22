import clsx from 'clsx'

import type { ComponentProps } from 'react'

const DropdownShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={clsx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}
export { DropdownShortcut }
