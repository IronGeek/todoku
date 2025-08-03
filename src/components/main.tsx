import { cx } from '@/ui/utils.ts';

import styles from './main.module.scss';

import type { ComponentProps, ReactNode } from 'react';

type MainProps = ComponentProps<'main'> & {
  readonly fullscreen?: boolean
};

const Main = ({
  className,
  children,
  fullscreen,
  ...props
}: MainProps): ReactNode => (
  <main {...props} className={cx(styles.main, { fullscreen }, className)}>
    {children}
  </main>
);

Main.displayName = 'Main';

export { Main };
