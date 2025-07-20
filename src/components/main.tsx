import clsx from 'clsx';

import { type ComponentProps, createElement, isValidElement, type ReactNode } from 'react';

import styles from './main.module.scss';

type MainProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly fullscreen?: boolean
  readonly title?: ReactNode
  readonly actions?: ReactNode
};

const Main = ({ className, children, fullscreen, title, actions, ...props }: MainProps): ReactNode => (
  <main {...props} className={clsx(styles.main, { [styles.fullscreen]: fullscreen }, className)}>
    <div className={styles.main_toolbar}>
      { isValidElement(title) ? title : title ? <h1 className={styles.main_title}>{title}</h1> : <div></div> }
      { isValidElement<ComponentProps<'div'>>(actions)
        ? createElement(actions.type, { ...actions.props, className: clsx(styles.main_actions, actions.props.className) })
        : actions
          ? <div className={styles.main_actions}>{actions}</div>
          : <div></div> }
    </div>
    {children}
  </main>
);

export { Main };
