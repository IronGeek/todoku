'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { CarouselContent } from '@/ui/carousel/content.tsx';
import { CarouselItem } from '@/ui/carousel/item.tsx';
import { CarouselNext } from '@/ui/carousel/next.tsx';
import { CarouselPrevious } from '@/ui/carousel/previous.tsx';
import { CarouselContext, useCarouselCore } from '@/ui/carousel/provider.ts';
import { cx } from '@/ui/utils.ts';

import type { ComponentProps, JSX, KeyboardEvent } from 'react';

import type { CarouselApi, CarouselBaseProps } from '@/ui/carousel/provider';

type CarouselProps = ComponentProps<'div'> & CarouselBaseProps;

const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps): JSX.Element => {
  const [carouselRef, api] = useCarouselCore(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y'
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((carousel: CarouselApi) => {
    if (!carousel) return;
    setCanScrollPrev(carousel.canScrollPrev());
    setCanScrollNext(carousel.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const value = useMemo(() => ({
    api,
    canScrollNext,
    canScrollPrev,
    carouselRef,
    opts,
    scrollNext,
    scrollPrev,
    orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal')
  }), [api, canScrollNext, canScrollPrev, carouselRef, opts, orientation, scrollNext, scrollPrev]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) { return undefined }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return (): void => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider value={value}>
      <div
        aria-roledescription="carousel"
        className={cx('relative', className)}
        data-slot="carousel"
        role="region"
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;
Carousel.displayName = 'Carousel';

export { Carousel };
