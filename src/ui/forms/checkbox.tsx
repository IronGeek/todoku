import { cx } from '@/ui/utils.ts';

import styles from './checkbox.module.scss';

import type { ComponentProps, JSX } from 'react';

type CheckBoxProps = Omit<ComponentProps<'input'>, 'type'> & {
};

const CheckBox = ({ className, children, ...props }: CheckBoxProps): JSX.Element => (
  children
    ? (
      <label
        className={cx(styles.label, 'form-checkbox', className)}
      >
        <input {...props} type="checkbox" />
        {children}
      </label>)
    : (<input
      {...props}
      className={cx(styles.input, 'form-checkbox', className)}
      type="checkbox" />)
);

CheckBox.displayName = 'CheckBox';

export { CheckBox };
export type { CheckBoxProps };
