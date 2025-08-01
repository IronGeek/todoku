'use client';

import { cx } from '@/ui/utils';
import { useCarousel } from '@/ui/carousel/provider';

import type { ComponentProps } from 'react';

type CarouselItemProps = ComponentProps<'div'>;

function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cx(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

export { CarouselItem }
export type { CarouselItemProps }
