'use client';

import { cx } from '@/ui/utils';
import { useCarousel } from '@/ui/carousel/provider';

import type { ComponentProps } from 'react';

type CarouselContentProps = ComponentProps<'div'>;

const CarouselContent = ({ className, ...props }: CarouselContentProps) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cx(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { CarouselContent }
export type { CarouselContentProps }
