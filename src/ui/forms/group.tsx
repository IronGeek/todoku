import clsx from 'clsx';

import styles from './group.module.scss';

import type { ComponentProps } from 'react';

type FormGroupProps = ComponentProps<'div'>;

const FormGroup = ({ children, className, ...props }: FormGroupProps) => (
  <div {...props} className={clsx(styles.group, 'form-group', className)}>
    {children}
  </div>
);

FormGroup.displayName = 'FormGroup';

export { FormGroup };
export type { FormGroupProps };
