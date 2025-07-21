import clsx from 'clsx';

import { type ComponentProps, createElement, isValidElement, type ReactNode } from 'react';

import styles from './main.module.scss';

type MainProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly fullscreen?: boolean
  readonly title?: ReactNode
  readonly actions?: ReactNode
};

const Main = ({ className, children, fullscreen, title, actions, ...props }: MainProps): ReactNode => (
  <main {...props} className={clsx(styles.main, { fullscreen }, className)}>
    <div className="main-toolbar">
      { isValidElement(title) ? title : title ? <h1 className="main-title">{title}</h1> : null }
      { isValidElement<ComponentProps<'div'>>(actions)
        ? createElement(actions.type, { ...actions.props, className: clsx("main-actions", actions.props.className) })
        : actions
          ? <div className="main-actions">{actions}</div>
          : null }
    </div>
    {children}
  </main>
);

export { Main };
