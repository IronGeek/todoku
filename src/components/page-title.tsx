import clsx from 'clsx';
import { ComponentProps, useMemo } from 'react';
import { titleCase } from 'title-case';

import { useAppSelector } from '@/state/hook';

import styles from './page-title.module.scss';

type PageTitleProps = ComponentProps<'div'>;

const PageTitle = ({ className, ...props }: PageTitleProps) => {
  const { title, items } = useAppSelector((state) => state.todos);
  const [count, completed] = useMemo(() => {
    const count = items?.length ?? 0;
    const completed = items?.reduce((total, item) => {
        if (item.done) { total++ }

        return total;
      }, 0) ?? 0;

    return [count, completed];
  }, [items]);

  return (
    <div {...props} className={clsx(styles.title, "page-title", className)}>
      <div>{titleCase(title)}</div>
      { count > 0 ? <div className="count">{completed} / {count}</div> : null }
    </div>
  )
}

export { PageTitle };
export type { PageTitleProps };
