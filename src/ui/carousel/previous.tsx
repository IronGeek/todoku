import { ComponentProps } from 'react';

import { Button } from '@/ui/forms/button';
import { ChevronLeftIcon } from '@/ui//icons';
import { useCarousel } from '@/ui/carousel/provider';
import { cx } from '@/ui/utils';

type CarouselPreviousProps = ComponentProps<typeof Button>;

const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: CarouselPreviousProps) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cx(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

export { CarouselPrevious }
export type { CarouselPreviousProps }
