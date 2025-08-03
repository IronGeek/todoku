'use client';

import { Indicator, Root } from '@radix-ui/react-checkbox';

import { CheckIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps } from 'react';

type CheckboxProps = ComponentProps<typeof Root>;
const Checkbox = ({
  className,
  ...props
}: CheckboxProps) => (
  <Root
    className={cx(
      'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    data-slot="checkbox"
    {...props}
  >
    <Indicator
      className="flex items-center justify-center text-current transition-none"
      data-slot="checkbox-indicator"
    >
      <CheckIcon className="size-3.5" />
    </Indicator>
  </Root>
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
