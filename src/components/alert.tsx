import type { ComponentProps, JSX } from 'react';

type AlertProps = ComponentProps<'div'> & {
  readonly message: string
  readonly type: string
};
interface VariantClass {
  bg: string
  border: string
  text: string
}

const getVariantClasses = (type: string): VariantClass => {
  switch (type) {
    case 'info':
      return {
        bg    : 'bg-blue-50',
        border: 'border-blue-300',
        text  : 'text-blue-800'
      };
    case 'success':
      return {
        bg    : 'bg-green-50',
        border: 'border-green-300',
        text  : 'text-green-800'
      };
    case 'warning':
      return {
        bg    : 'bg-yellow-50',
        border: 'border-yellow-300',
        text  : 'text-yellow-800'
      };
    case 'error':
      return {
        bg    : 'bg-red-50',
        border: 'border-red-300',
        text  : 'text-red-800'
      };

    default:
      return {
        bg    : 'bg-gray-50',
        border: 'border-gray-300',
        text  : 'text-gray-800'
      };
  }
};

const Alert = ({ type, message, ...props }: AlertProps): JSX.Element => {
  const variantClasses = getVariantClasses(type);

  return (
    <div {...props} className={`flex items-center p-4 mb-4 ${variantClasses.text} ${variantClasses.border} rounded-lg ${variantClasses.bg}`} role="alert">
      <svg aria-hidden="true" className="shrink-0 inline w-4 h-4 me-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>

      <span className="sr-only">Info</span>

      <div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';

export { Alert };
export type { AlertProps };
