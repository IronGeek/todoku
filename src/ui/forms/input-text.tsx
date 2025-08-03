import { Fragment, isValidElement, useId } from 'react';

import { LockIcon, RequiredIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, ReactNode } from 'react';

/*
 * TODO:
 * | "button"
 * | "checkbox"
 * | "color"
 * | "file"
 * | "hidden"
 * | "image"
 * | "radio"
 * | "range"
 * | "reset"
 * | "submit"
 * | "date"
 * | "datetime-local"
 * | "month"
 * | "time"
 * | "week"
 */

type FormInputTextTypeAttribute = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

type FormInputTextProps = Omit<ComponentProps<'input'>, 'type'> & {
  readonly label?: ReactNode
  readonly type?: FormInputTextTypeAttribute
};

const FormInputText = ({ className, label, type = 'text', ...props }: FormInputTextProps) => {
  const id = useId();

  return (
    <>
      { isValidElement<HTMLLabelElement>(label)
        ? label
        : (
          <label htmlFor={id}><span>{label || props.name}</span>
            { props.readOnly ? <LockIcon className="form-input-indicator" /> : null }
            { props.required ? <RequiredIcon className="form-input-indicator" /> : null }
          </label>) }

      <input {...props} className={cx('form-input', className)} id={id} type={type} />
    </>
  );
};

FormInputText.displayName = 'FormInputText';

export { FormInputText };
export type { FormInputTextTypeAttribute, FormInputTextProps };
