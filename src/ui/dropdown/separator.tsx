import { Separator } from '@radix-ui/react-dropdown-menu'
import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react'

const DropdownSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cx("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export { DropdownSeparator }
