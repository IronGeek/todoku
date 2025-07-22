import { Portal } from '@radix-ui/react-dropdown-menu';

import type { ComponentProps } from 'react'

const DropdownPortal = ({
  ...props
}: ComponentProps<typeof Portal>) =>{
  return (
    <Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

export { DropdownPortal }
