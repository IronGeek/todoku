import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './page-title.module.scss';

type PageTitleProps = ComponentProps<'div'> & {
}

const PageTitle = ({ className, ...props }: PageTitleProps) => {
  return (
    <div {...props} className={clsx(styles.title, "page-title", className)}>
      <div>Title</div>
      <div className="badge"></div>
    </div>
  )
}

export { PageTitle };
export type { PageTitleProps };
