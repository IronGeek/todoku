import { Root } from '@radix-ui/react-dropdown-menu';

import { DropdownCheckboxItem } from '@/ui/dropdown/checkbox-item';
import { DropdownContent } from '@/ui/dropdown/content';
import { DropdownGroup } from '@/ui/dropdown/group';
import { DropdownItem } from '@/ui/dropdown/item';
import { DropdownLabel } from '@/ui/dropdown/label';
import { DropdownPortal } from '@/ui/dropdown/portal';
import { DropdownSeparator } from '@/ui/dropdown/separator';
import { DropdownShortcut } from '@/ui/dropdown/shortcut';
import { DropdownSub } from '@/ui/dropdown/sub';
import { DropdownSubContent } from '@/ui/dropdown/sub-content';
import { DropdownSubTrigger } from '@/ui/dropdown/sub-trigger';
import { DropdownTrigger } from '@/ui/dropdown/trigger';

import type { ComponentProps } from 'react'

const Dropdown = ({
  ...props
}: ComponentProps<typeof Root>) => {
  return <Root data-slot="dropdown-menu" {...props} />
}

Dropdown.CheckboxItem = DropdownCheckboxItem;
Dropdown.Content = DropdownContent;
Dropdown.Group = DropdownGroup;
Dropdown.Item = DropdownItem;
Dropdown.Label = DropdownLabel;
Dropdown.Portal = DropdownPortal;
Dropdown.Separator = DropdownSeparator;
Dropdown.Shortcut = DropdownShortcut;
Dropdown.Sub = DropdownSub;
Dropdown.SubContent = DropdownSubContent;
Dropdown.SubTrigger = DropdownSubTrigger;
Dropdown.Trigger = DropdownTrigger;

export { Dropdown }
