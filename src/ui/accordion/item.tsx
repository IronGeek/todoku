import { Item } from '@radix-ui/react-accordion';

import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type AccordionItemProps = ComponentProps<typeof Item>;

const AccordionItem = ({
  className,
  ...props
}: AccordionItemProps): JSX.Element => (
  <Item
    className={cx('border-b border-dashed last:border-b-0', className)}
    data-slot="accordion-item"
    {...props} />
);

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem };
export type { AccordionItemProps };
