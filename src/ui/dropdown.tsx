import { Root } from '@radix-ui/react-dropdown-menu';

import { DropdownCheckboxItem } from '@/ui/dropdown/checkbox-item.tsx';
import { DropdownContent } from '@/ui/dropdown/content.tsx';
import { DropdownGroup } from '@/ui/dropdown/group.tsx';
import { DropdownItem } from '@/ui/dropdown/item.tsx';
import { DropdownLabel } from '@/ui/dropdown/label.tsx';
import { DropdownPortal } from '@/ui/dropdown/portal.tsx';
import { DropdownSeparator } from '@/ui/dropdown/separator.tsx';
import { DropdownShortcut } from '@/ui/dropdown/shortcut.tsx';
import { DropdownSubContent } from '@/ui/dropdown/sub-content.tsx';
import { DropdownSubTrigger } from '@/ui/dropdown/sub-trigger.tsx';
import { DropdownSub } from '@/ui/dropdown/sub.tsx';
import { DropdownTrigger } from '@/ui/dropdown/trigger.tsx';

import type { ComponentProps, JSX } from 'react';

type DropdownProps = ComponentProps<typeof Root>;

const Dropdown = ({
  ...props
}: DropdownProps): JSX.Element => <Root data-slot="dropdown-menu" {...props} />;

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
Dropdown.displayName = DropdownTrigger;

export { Dropdown };
export type { DropdownProps };
