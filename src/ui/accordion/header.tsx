import { Header, Trigger } from '@radix-ui/react-accordion';

import { ChevronDownIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react';

type AccordionHeaderProps = ComponentProps<typeof Header> & {
  indicator?: boolean
}

const AccordionHeader = ({
  className,
  children,
  indicator = true,
  ...props
}: AccordionHeaderProps) => {
  return (
    <Header className={cx("flex items-center", className)} {...props}>
      {children}
      { indicator
        ? <Trigger className="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex items-start justify-between gap-4 rounded-md py-4 transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180">
            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
          </Trigger>
        : null }
    </Header>
  )
}

export { AccordionHeader }
export type { AccordionHeaderProps }
