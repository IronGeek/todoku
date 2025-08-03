import clsx from 'clsx';

import styles from './grid.module.scss';

import type { ComponentProps } from 'react';

type FormGridProps = ComponentProps<'div'>;

const FormGrid = ({ children, className, ...props }: FormGridProps) => (
  <div {...props} className={clsx(styles.grid, 'form-grid', className)}>
    {children}
  </div>
);

FormGrid.displayName = 'FormGrid';

export { FormGrid };
export type { FormGridProps };
