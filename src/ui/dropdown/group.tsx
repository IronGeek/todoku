import { Group } from '@radix-ui/react-dropdown-menu'

import type { ComponentProps } from 'react'

const DropdownGroup = ({
  ...props
}: ComponentProps<typeof Group>) => {
  return (
    <Group data-slot="dropdown-menu-group" {...props} />
  )
}

export { DropdownGroup }
