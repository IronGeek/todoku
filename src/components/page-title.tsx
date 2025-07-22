import { ComponentProps, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { titleCase } from 'title-case';

import { useAppSelector } from '@/state/hook';
import { TodoSummary } from '@/state/todo/types';
import { cx } from '@/ui/utils';

import styles from './page-title.module.scss';

type PageTitleProps = ComponentProps<'div'>;

const getSummary = (summary: TodoSummary, type = 'all'): [number, number] => {
  if (['upcoming', 'today', 'done', 'pin', 'all', 'archive'].includes(type)) {
    return summary[type];
  }

  return summary.list[type] ?? [0,0];
}

const PageTitle = ({ className, ...props }: PageTitleProps) => {
  const params = useParams();
  const type = Array.isArray(params.type) ? params.type.join('/') : params.type;
  const { title, summary } = useAppSelector((state) => state.todos);
  const [completed, total] = useMemo(() => {
    return summary ? getSummary(summary, type) : [0,0];
  }, [summary, type]);

  return (
    <div {...props} className={cx(styles.title, "page-title", className)}>
      <div>{titleCase(title)}</div>
      { total > 0 ? <div className="count">{completed}<span className="page-title-separator">/</span>{total}</div> : null }
    </div>
  )
}

export { PageTitle };
export type { PageTitleProps };
