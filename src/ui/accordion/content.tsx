import { Content } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils';

import type { ComponentProps } from 'react';

type AccordionContentProps = ComponentProps<typeof Content>;

const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => {
  return (
    <Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cx("pt-0 pb-4", className)}>{children}</div>
    </Content>
  )
}

export { AccordionContent }
export type { AccordionContentProps }
