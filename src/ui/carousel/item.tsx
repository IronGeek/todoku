'use client';

import { useCarousel } from '@/ui/carousel/provider.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type CarouselItemProps = ComponentProps<'div'>;

const CarouselItem = ({ className, ...props }: CarouselItemProps): JSX.Element => {
  const { orientation } = useCarousel();

  return (
    <div
      aria-roledescription="slide"
      className={cx(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      data-slot="carousel-item"
      role="group"
      {...props} />
  );
};

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
export type { CarouselItemProps };
