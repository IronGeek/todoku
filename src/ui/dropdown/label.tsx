import { Label } from '@radix-ui/react-dropdown-menu'
import { cx } from '@/ui/utils';

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
      className={cx(
        "px-2 py-1.5 font-bold data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

export { DropdownLabel }
