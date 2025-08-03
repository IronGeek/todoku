import { cx } from '@/ui/utils.ts';

import styles from './input-button.module.scss';

import type { ComponentProps, ComponentType, FormEventHandler, JSX, MouseEventHandler, ReactNode } from 'react';

type InputButtonProps = Omit<ComponentProps<'input'>, 'onSubmit' | 'onClick' | 'form'> & {
  readonly as?: ComponentType<'form' | 'div'>
  readonly button?: ComponentProps<'button'>
  readonly buttonText?: ReactNode
  readonly buttonType?: 'submit' | 'button'
  readonly form?: ComponentProps<'form'>
  readonly label?: ReactNode
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
  readonly onSubmit?: FormEventHandler<HTMLFormElement | HTMLDivElement>
  readonly variant?: 'primary' | 'secondary' | 'accent'
};

const InputButton = ({
  as,
  id,
  label,
  type,
  name,
  buttonType = 'button',
  buttonText = 'Button',
  placeholder,
  form,
  button,
  variant,
  onSubmit,
  onClick,
  ...props
}: InputButtonProps): JSX.Element => {
  const children = (
    <>
      { label ? <label htmlFor={id}>{label}</label> : null }

      <div className="form-input-container">
        <input {...props} id={id} name={name} placeholder={placeholder} type={type} />

        <button
          {...button}
          className={cx({
            [variant]: !!variant
          })}
          type={buttonType === 'submit' ? 'submit' : 'button'}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </>
  );

  return (
    as === form
      ? <form {...form} className={styles.form} onSubmit={onSubmit}>{children}</form>
      : <div className={styles.form}>{children}</div>
  );
};

InputButton.displayName = 'InputButton';

export { InputButton };
export type { InputButtonProps };
