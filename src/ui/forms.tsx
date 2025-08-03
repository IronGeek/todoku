import { createElement, Fragment, isValidElement } from 'react';

import { FormGrid } from '@/ui/forms/grid.tsx';
import { FormGroup } from '@/ui/forms/group.tsx';
import { FormInputText } from '@/ui/forms/input-text.tsx';
import { FormSeparator } from '@/ui/forms/separator.tsx';

/*
 * Import { FormFileInput } from '@/ui/forms/file-input';
 *
 *
 * import { FormImageInput } from '@/ui/forms/image-input';
 *
 * import { FormTextArea } from '@/ui/forms/textarea';
 */
import { cx } from '@/ui/utils.ts';

import styles from './forms.module.scss';

import type { ComponentProps, JSX, ReactNode } from 'react';

type FormProps<T = unknown> = Omit<ComponentProps<'form'>, 'title'> & {
  readonly actions?: ReactNode | ((form: HTMLFormElement | null) => ReactNode)
  readonly bordered?: boolean
  readonly data?: Partial<T>
  readonly description?: ReactNode
  readonly disabled?: boolean
  readonly loader?: ReactNode
  readonly loading?: boolean
  readonly pending?: boolean
  readonly title?: ReactNode
};

const Form = ({
  children, className,
  disabled, pending, loading, bordered,
  title, description, loader, actions, data,
  ...props
}: FormProps): JSX.Element => (
  <form {...props} className={cx(styles.form, { 'form-bordered': bordered }, className)}>
    <fieldset disabled={disabled || loading}>
      <div className="form-header">
        <div>
          { isValidElement<HTMLElement>(title) && title.type !== Fragment
            ? createElement(title.type, { ...title.props, className: cx('form-title', title.props.className) })
            : <div className="form-title">{title ?? null}</div> }

          { isValidElement<HTMLElement>(description)
            ? createElement(description.type, { ...description.props, className: cx('form-description', description.props.className) })
            : <div className="form-description">{description ?? null}</div> }
        </div>

        <div className="form-actions flex gap-2 items-center justify-center mt-8 sm:mt-0 sm:justify-end sm:row-span-2">
          { pending
            ? <div className="form-loader animate-pulse">(Submitting...)</div>
            : loading
              ? isValidElement<HTMLElement>(loader)
                ? createElement(loader.type, { ...loader.props, className: cx('form-loader animate-pulse', loader.props.className) })
                : (
                  <div className="form-loader animate-pulse">
                    {loader ?? '(Loading)' }
                  </div>)
              : isValidElement<HTMLElement>(actions)
                ? actions
                : null }
        </div>
      </div>

      <div className="form-content">
        {children}
      </div>
    </fieldset>
  </form>
);

Form.displayName = 'Form';

Form.Grid = FormGrid;
Form.Group = FormGroup;
Form.Separator = FormSeparator;
Form.InputText = FormInputText;

/*
 *
 *
 * Form.TextInput = FormTextInput;
 * Form.TextArea = FormTextArea;
 * Form.FileInput = FormFileInput;
 * Form.ImageInput = FormImageInput;
 */

export { Form };
export type { FormProps };
