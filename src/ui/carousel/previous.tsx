import { useCarousel } from '@/ui/carousel/provider.ts';
import { Button } from '@/ui/forms/button.tsx';
import { ChevronLeftIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type CarouselPreviousProps = ComponentProps<typeof Button>;

const CarouselPrevious = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: CarouselPreviousProps): JSX.Element => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cx(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      size={size}
      variant={variant}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};

CarouselPrevious.displayName = 'CarouselPrevious';

export { CarouselPrevious };
export type { CarouselPreviousProps };
