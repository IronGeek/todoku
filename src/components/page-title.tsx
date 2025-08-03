import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { titleCase } from 'title-case';

import { resolveSlug } from '@/services/todo.ts';
import { useAppSelector } from '@/state/hook.ts';
import { cx } from '@/ui/utils.ts';

import styles from './page-title.module.scss';

import type { ComponentProps, JSX } from 'react';

import type { TodoSummary } from '@/state/todo/types.ts';

type PageTitleProps = ComponentProps<'div'>;

const getProgress = (summary: TodoSummary, type = 'all'): [number, number] => {
  if (['upcoming', 'today', 'done', 'pin', 'all', 'archive'].includes(type)) {
    return summary[type] ?? [0, 0];
  }

  return summary.list[type] ?? [0, 0];
};

const PageTitle = ({ className, ...props }: PageTitleProps): JSX.Element => {
  const { slug } = useParams();
  const type = resolveSlug(slug);
  const { title, summary } = useAppSelector((state) => state.todos);
  const [completed, total] = useMemo(() => summary ? getProgress(summary, type) : [0, 0], [summary, type]);

  return (
    <div {...props} className={cx(styles.title, 'page-title', className)}>
      <div>{titleCase(title)}</div>
      { total > 0 ? <div className="count">{completed}<span className="page-title-separator">/</span>{total}</div> : null }
    </div>
  );
};

PageTitle.displayName = 'PageTitle';

export { PageTitle };
export type { PageTitleProps };
