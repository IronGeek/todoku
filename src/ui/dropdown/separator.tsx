import clsx from 'clsx'
import { Separator } from '@radix-ui/react-dropdown-menu'

import type { ComponentProps } from 'react'

const DropdownSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={clsx("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export { DropdownSeparator }
