import clsx from 'clsx'
import { Label } from '@radix-ui/react-dropdown-menu'

import type { ComponentProps } from 'react'

const DropdownLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean
}) => {
  return (
    <Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={clsx(
        "px-2 py-1.5 text-sm font-bold data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

export { DropdownLabel }
