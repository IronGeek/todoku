import { Trigger } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react';

type AccordionTriggerProps = ComponentProps<typeof Trigger>;

const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => {
  return (
    <Trigger
      data-slot="accordion-trigger"
      className={cx(
        "cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
    </Trigger>
  )
}

export { AccordionTrigger }
export type { AccordionTriggerProps }
