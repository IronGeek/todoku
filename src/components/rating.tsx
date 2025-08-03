import { StarHalfIcon, StarIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './rating.module.scss';

import type { ComponentProps, JSX } from 'react';

type RatingProps = ComponentProps<'div'> & {
  readonly value: number
};

const Rating = ({ className, value, ...props }: RatingProps): JSX.Element => {
  const full = Math.floor(value / 2),
    half = value % 2;

  return (
    <div {...props} className={cx(styles.rating, className)}>
      { full
        // eslint-disable-next-line @react/no-array-index-key
        ? new Array(full).fill(null).map((_, i) => <StarIcon key={`full-${i}`} />)
        : null }

      { half ? <StarHalfIcon key="half" /> : null }
    </div>
  );
};

Rating.displayName = 'Rating';

export { Rating };
export type { RatingProps };
