import { Content, Portal, Viewport } from '@radix-ui/react-select';

import { SelectScrollDownButton, SelectScrollUpButton } from '@/ui/select/scroll.tsx';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type SelectContentProps = ComponentProps<typeof Content>;
const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: SelectContentProps): JSX.Element => (
  <Portal>
    <Content
      className={cx(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
        position === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      data-slot="select-content"
      position={position}
      {...props}
    >
      <SelectScrollUpButton />

      <Viewport
        className={cx(
          'p-1',
          position === 'popper' &&
          'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
        )}
      >
        {children}
      </Viewport>

      <SelectScrollDownButton />
    </Content>
  </Portal>
);

SelectContent.displayName = 'SelectContent';

export { SelectContent };
export type { SelectContentProps };
