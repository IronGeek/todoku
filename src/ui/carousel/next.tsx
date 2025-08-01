import { ComponentProps } from 'react';

import { Button } from '@/ui/forms/button';
import { ChevronRightIcon } from '@/ui//icons';
import { useCarousel } from '@/ui/carousel/provider';
import { cx } from '@/ui/utils';

type CarouselNextProps = ComponentProps<typeof Button>;

const CarouselNext = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: CarouselNextProps) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cx(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">Next</span>
    </Button>
  )
}

export { CarouselNext }
export type { CarouselNextProps }
