import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';

import { XIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type DialogProps = ComponentProps<typeof Root>;
type DialogTriggerProps = ComponentProps<typeof Trigger>;
type DialogPortalProps = ComponentProps<typeof Portal>;
type DialogCloseProps = ComponentProps<typeof Close>;
type DialogOverlayProps = ComponentProps<typeof Overlay>;
type DialogContentProps = ComponentProps<typeof Content> & { readonly showCloseButton?: boolean };
type DialogHeaderProps = ComponentProps<'div'>;
type DialogFooterProps = ComponentProps<'div'>;
type DialogTitleProps = ComponentProps<typeof Title>;
type DialogDescriptionProps = ComponentProps<typeof Description>;

const Dialog = ({
  ...props
}: DialogProps): JSX.Element => <Root data-slot="dialog" {...props} />;

const DialogTrigger = ({
  ...props
}: DialogTriggerProps): JSX.Element => <Trigger data-slot="dialog-trigger" {...props} />;

const DialogPortal = ({
  ...props
}: DialogPortalProps): JSX.Element => <Portal data-slot="dialog-portal" {...props} />;

const DialogClose = ({
  ...props
}: DialogCloseProps): JSX.Element => <Close data-slot="dialog-close" {...props} />;

const DialogOverlay = ({
  className,
  ...props
}: DialogOverlayProps): JSX.Element => (
  <Overlay
    className={cx(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      className
    )}
    data-slot="dialog-overlay"
    {...props} />
);

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps): JSX.Element => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />

    <Content
      className={cx(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
        className
      )}
      data-slot="dialog-content"
      {...props}
    >
      {children}

      {showCloseButton
        ? (
          <Close
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            data-slot="dialog-close"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Close>)
        : null}
    </Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: DialogHeaderProps): JSX.Element => (
  <div
    className={cx('flex flex-col gap-2 text-center sm:text-left', className)}
    data-slot="dialog-header"
    {...props} />
);

const DialogFooter = ({ className, ...props }: DialogFooterProps): JSX.Element => (
  <div
    className={cx(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    data-slot="dialog-footer"
    {...props} />
);

const DialogTitle = ({
  className,
  ...props
}: DialogTitleProps): JSX.Element => (
  <Title
    className={cx('text-lg leading-none font-semibold', className)}
    data-slot="dialog-title"
    {...props} />
);

const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps): JSX.Element => (
  <Description
    className={cx('text-muted-foreground text-sm', className)}
    data-slot="dialog-description"
    {...props} />
);

Dialog.Trigger = DialogTrigger;
DialogTrigger.displayName = 'DialogTrigger';
Dialog.Portal = DialogPortal;
DialogPortal.displayName = 'DialogPortal';
Dialog.Close = DialogClose;
DialogClose.displayName = 'DialogClose';
Dialog.Overlay = DialogOverlay;
DialogOverlay.displayName = 'DialogOverlay';
Dialog.Content = DialogContent;
DialogContent.displayName = 'DialogContent';
Dialog.Header = DialogHeader;
DialogHeader.displayName = 'DialogHeader';
Dialog.Footer = DialogFooter;
DialogFooter.displayName = 'DialogFooter';
Dialog.Title = DialogTitle;
DialogTitle.displayName = DialogTitle;

Dialog.Description = DialogDescription;
DialogDescription.displayName = DialogDescription;

Dialog.displayName = 'Dialog';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
