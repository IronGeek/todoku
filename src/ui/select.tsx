import { Root } from '@radix-ui/react-select';

import { SelectContent } from '@/ui/select/content.tsx';
import { SelectGroup } from '@/ui/select/group.tsx';
import { SelectItem } from '@/ui/select/item.tsx';
import { SelectLabel } from '@/ui/select/label.tsx';
import { SelectScrollDownButton, SelectScrollUpButton } from '@/ui/select/scroll.tsx';
import { SelectSeparator } from '@/ui/select/separator.tsx';
import { SelectTrigger } from '@/ui/select/trigger.tsx';
import { SelectValue } from '@/ui/select/value.tsx';

import type { ComponentProps, JSX } from 'react';

type SelectProps = ComponentProps<typeof Root>;

const Select = ({
  ...props
}: SelectProps): JSX.Element => <Root data-slot="select" {...props} />;

Select.displayName = 'Select';
Select.Content = SelectContent;
Select.Group = SelectGroup;
Select.Item = SelectItem;
Select.Label = SelectLabel;
Select.ScrollDownButton = SelectScrollDownButton;
Select.ScrollUpButton = SelectScrollUpButton;
Select.Separator = SelectSeparator;
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;

export { Select };
export type { SelectProps };
