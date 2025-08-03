import { ScrollDownButton, ScrollUpButton } from '@radix-ui/react-select';

import { ChevronDownIcon, ChevronUpIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type SelectScrollUpButtonProps = ComponentProps<typeof ScrollUpButton>;

const SelectScrollUpButton = ({
  className,
  ...props
}: SelectScrollUpButtonProps): JSX.Element => (
  <ScrollUpButton
    className={cx(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    data-slot="select-scroll-up-button"
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </ScrollUpButton>
);

type SelectScrollDownButtonProps = ComponentProps<typeof ScrollDownButton>;

const SelectScrollDownButton = ({
  className,
  ...props
}: SelectScrollDownButtonProps): JSX.Element => (
  <ScrollDownButton
    className={cx(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    data-slot="select-scroll-down-button"
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </ScrollDownButton>
);

SelectScrollUpButton.displayName = 'SelectScrollUpButton';
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

export { SelectScrollUpButton, SelectScrollDownButton };
export type { SelectScrollUpButtonProps, SelectScrollDownButtonProps };
