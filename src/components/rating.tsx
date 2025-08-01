import { cx } from '@/ui/utils';
import type { ComponentProps } from 'react';

import styles from './rating.module.scss';
import { StarHalfIcon, StarIcon } from '@/ui/icons';

type RatingProps = ComponentProps<'div'> & {
  value: number
}

const Rating = ({ className, value, ...props }: RatingProps) => {
  const full = Math.floor(value / 2), half = value % 2;

  return (
    <div {...props} className={cx(styles.rating, className)}>
      { full ? new Array(full).fill(null).map((_, i) => (
        <StarIcon key={`full-${i}`} />
      )) : null }
      { half ? <StarHalfIcon key="half" /> : null }
    </div>
  )
};

export { Rating }
export type { RatingProps }
