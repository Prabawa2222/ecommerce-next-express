"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

type Props = {
  items: React.ReactNode[];
};

export default function Carousel({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const onSelect = React.useCallback((embla: typeof emblaApi) => {
    setCanScrollPrev(embla!.canScrollPrev());
    setCanScrollNext(embla!.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full min-w-[280px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="xl:flex-[0_0_20%] lg:flex-[0_0_33.33%] md:flex-[0_0_50%] flex-[0_0_100%]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {canScrollPrev && (
        <>
          <div className="absolute inset-y-0 w-32 left-0  bg-gradient-to-l from-transparent via-brand-black-900/30 to-brand-black-900" />
          <button
            className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-black-800/40 rounded-sm"
            onClick={() => {
              scrollPrev();
            }}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="size-10" />
          </button>
        </>
      )}
      {canScrollNext && (
        <>
          <div className="absolute inset-y-0 w-32 right-0  bg-gradient-to-r from-transparent via-brand-black-900/30 to-brand-black-900" />

          <button
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand-black-800/40 rounded-sm"
            onClick={() => {
              scrollNext();
            }}
            disabled={!canScrollNext}
          >
            <ChevronRight className="size-10" />
          </button>
        </>
      )}
    </div>
  );
}
