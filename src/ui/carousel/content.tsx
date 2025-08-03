'use client';

import { useCarousel } from '@/ui/carousel/provider.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type CarouselContentProps = ComponentProps<'div'>;

const CarouselContent = ({ className, ...props }: CarouselContentProps): JSX.Element => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cx(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props} />
    </div>
  );
};

CarouselContent.displayName = 'CarouselContent';

export { CarouselContent };
export type { CarouselContentProps };
