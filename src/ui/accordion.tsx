import { Root } from '@radix-ui/react-accordion';

import { AccordionContent } from '@/ui/accordion/content.tsx';
import { AccordionHeader } from '@/ui/accordion/header.tsx';
import { AccordionItem } from '@/ui/accordion/item.tsx';
import { AccordionTrigger } from '@/ui/accordion/trigger.tsx';

import type { AccordionMultipleProps, AccordionSingleProps } from '@radix-ui/react-accordion';
import type { ComponentProps, JSX  } from 'react';

type AccordionProps = ComponentProps<typeof Root>;

const Accordion = ({
  ...props
}: AccordionProps): JSX.Element => <Root data-slot="accordion" {...props} />;

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.displayName = 'Accordion';

export { Accordion };
export type { AccordionProps, AccordionSingleProps, AccordionMultipleProps };
