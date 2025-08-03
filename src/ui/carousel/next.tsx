import { Button } from '@/ui/button.tsx';
import { useCarousel } from '@/ui/carousel/provider.ts';
import { ChevronRightIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX } from 'react';

type CarouselNextProps = ComponentProps<typeof Button>;

const CarouselNext = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: CarouselNextProps): JSX.Element => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      className={cx(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      size={size}
      variant={variant}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon />
      <span className="sr-only">Next</span>
    </Button>
  );
};

CarouselNext.displayName = 'CarouselNext';

export { CarouselNext };
export type { CarouselNextProps };
