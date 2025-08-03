'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { createContext, useContext } from 'react';

import type { UseEmblaCarouselType } from 'embla-carousel-react';

const useCarouselCore = useEmblaCarousel;

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useCarouselCore>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselBaseProps {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  api: ReturnType<typeof useCarouselCore>[1]
  canScrollNext: boolean
  canScrollPrev: boolean
  carouselRef: ReturnType<typeof useCarouselCore>[0]
  scrollNext: () => void
  scrollPrev: () => void
} & CarouselBaseProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = (): CarouselContextProps => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

export { CarouselContext, useCarouselCore, useCarousel };
export type { CarouselBaseProps, CarouselContextProps, CarouselApi };
