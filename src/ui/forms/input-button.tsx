import { ComponentProps, ComponentType, FormEventHandler, MouseEventHandler, ReactNode } from "react"

import { cx } from "@/ui/utils";

import styles from './input-button.module.scss';

type InputButtonProps = Omit<ComponentProps<'input'>, 'onSubmit' | 'onClick' | 'form'> & {
  readonly as?: ComponentType<'form' | 'div'>
  readonly buttonType?: 'submit' | 'button'
  readonly label?: ReactNode
  readonly buttonText?: ReactNode
  readonly onSubmit?: FormEventHandler<HTMLFormElement | HTMLDivElement>
  readonly onClick?:MouseEventHandler<HTMLButtonElement>
  readonly form?: ComponentProps<'form'>
  readonly button?: ComponentProps<'button'>
  readonly variant?: 'primary' | 'secondary' | 'accent'
}

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
  ...props }: InputButtonProps) => {

  const children = (
    <>
      { label ? <label htmlFor={id}>{label}</label> : null }
      <div className="form-input-container">
        <input {...props} id={id} type={type} name={name} placeholder={placeholder} />
        <button
          {...button}
          className={cx({
            [variant]: !!variant
          })}
          type={buttonType}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </>
  );

  return (
    as === form
      ? <form {...form} className={styles.form} onSubmit={ onSubmit}>{children}</form>
      : <div className={styles.form}>{children}</div>
  )
}

export { InputButton }
export type { InputButtonProps }
