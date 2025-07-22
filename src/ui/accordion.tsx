import { Root } from '@radix-ui/react-accordion'

import { AccordionHeader } from '@/ui/accordion/header';
import { AccordionContent } from '@/ui/accordion/content';
import { AccordionItem } from '@/ui/accordion/item';
import { AccordionTrigger } from '@/ui/accordion/trigger';

import type { ComponentProps  } from 'react';
import type { AccordionSingleProps, AccordionMultipleProps } from '@radix-ui/react-accordion';

type AccordionProps = ComponentProps<typeof Root>;
const Accordion = ({
  ...props
}: AccordionProps) => {
  return <Root data-slot="accordion" {...props} />
};

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;

export { Accordion }
export type { AccordionProps, AccordionSingleProps, AccordionMultipleProps }
