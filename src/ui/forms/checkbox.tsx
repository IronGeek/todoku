import clsx from 'clsx'
import { ComponentProps } from 'react'

import styles from './checkbox.module.scss';

type CheckBoxProps = Omit<ComponentProps<'input'>, 'type'> & {
}

const CheckBox = ({ className, children, ...props }: CheckBoxProps) => {
  return (
    children
      ? <label
          className={clsx(styles.label, "form-checkbox", className)}
        >
          <input {...props} type="checkbox" />
          {children}
        </label>
      : <input {...props}
          type="checkbox"
          className={clsx(styles.input, "form-checkbox", className)} />
  )
}

export { CheckBox }
export type { CheckBoxProps }
