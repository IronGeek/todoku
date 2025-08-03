import { Trigger } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type AccordionTriggerProps = ComponentProps<typeof Trigger>;

const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps): JSX.Element => (
  <Trigger
    className={cx(
      'cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
      className
    )}
    data-slot="accordion-trigger"
    {...props}
  >
    {children}
  </Trigger>
);

AccordionTrigger.displayName = 'AccordionTrigger';

export { AccordionTrigger };
export type { AccordionTriggerProps };
