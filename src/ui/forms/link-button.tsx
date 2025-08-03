import { createElement, isValidElement } from 'react';

import { cx } from '@/ui/utils.ts';

import styles from './link-button.module.scss';

import type { ComponentProps, ComponentType, HTMLAttributes, ReactNode } from 'react';

type LinkButtonProps<T extends ComponentProps<'a'>> = T & {
  readonly as?: ComponentType<HTMLAttributes<HTMLAnchorElement>>
  readonly children?: ReactNode
  readonly className?: string
};

// eslint-disable-next-line @react/function-component-definition
function LinkButton<T>({ as, className, children, ...props }: LinkButtonProps<T>): ReactNode {
  const As = as;

  return As
    ? <As {...props} className={cx(styles.button, 'form-link-button', className)}>{children}</As>
    : isValidElement<HTMLAnchorElement>(children)
      ? createElement(children.type, { ...children.props, className: cx(styles.button, 'form-link-button', children.props.className) })
      : children;
}

LinkButton.displayName = 'LinkButton';

export { LinkButton };
export type { LinkButtonProps };
