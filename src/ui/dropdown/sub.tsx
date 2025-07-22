import { Sub } from '@radix-ui/react-dropdown-menu'

import type { ComponentProps } from 'react'

const DropdownSub = ({
  ...props
}: ComponentProps<typeof Sub>) => {
  return <Sub data-slot="dropdown-menu-sub" {...props} />
}

export { DropdownSub }
