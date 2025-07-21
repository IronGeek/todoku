import clsx from 'clsx';
import { ComponentProps, ComponentType, createElement, HTMLAttributes, isValidElement, PropsWithChildren, ReactNode } from 'react';

import styles from './link-button.module.scss';

type LinkButtonProps<T extends ComponentProps<'a'>> = T & {
  as?: ComponentType<HTMLAttributes<HTMLAnchorElement>>
  className?: string
  children?: ReactNode
};

function LinkButton<T>({ as, className, children, ...props }: LinkButtonProps<T>) {
  const As = as;
  return As
    ? <As { ...props } className={clsx(styles.button, "form-link-button", className)}>{children}</As>
      : isValidElement<HTMLAnchorElement>(children)
      ? createElement(children.type, { ...children.props, className: clsx(styles.button, "form-link-button", children.props.className) })
    : children;
}

export { LinkButton }
