import { Content } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type AccordionContentProps = ComponentProps<typeof Content>;

const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps): JSX.Element => (
  <Content
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
    data-slot="accordion-content"
    {...props}
  >
    <div className={cx('pt-0 pb-4', className)}>{children}</div>
  </Content>
);

AccordionContent.displayName = 'AccordionContent';

export { AccordionContent };
export type { AccordionContentProps };
