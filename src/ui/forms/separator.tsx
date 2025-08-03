import clsx from 'clsx';

import styles from './separator.module.scss';

import type { ComponentProps } from 'react';

type FormSeparatorProps = ComponentProps<'div'> & {
  readonly text?: string
};

const FormSeparator = ({ children, className, text, ...props }: FormSeparatorProps) => (
  <div {...props} className={clsx(styles.separator, 'form-separator', className)} data-text={text || ''}>
    {children}
  </div>
);

FormSeparator.displayName = 'FormSeparator';

export { FormSeparator };
export type { FormSeparatorProps };
