"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselOptions = NonNullable<React.ComponentProps<typeof useEmblaCarousel>[0]>
type CarouselPlugin = NonNullable<React.ComponentProps<typeof useEmblaCarousel>[1]>

type CarouselContextProps = {
  emblaApi: UseEmblaCarouselType[1]
  selectedIndex: number
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
} & React.ComponentPropsWithoutRef<"div">

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: UseEmblaCarouselType[1]) => void
} & React.ComponentPropsWithoutRef<"div">

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ opts, plugins, orientation = "horizontal", setApi, className, children, ...props }, ref) => {
    const [carouselRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const onSelect = React.useCallback((api: UseEmblaCarouselType[1]) => {
      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
      emblaApi?.scrollNext()
    }, [emblaApi])

    const scrollTo = React.useCallback(
      (index: number) => {
        emblaApi?.scrollTo(index)
      },
      [emblaApi],
    )

    React.useEffect(() => {
      if (!emblaApi) {
        return
      }

      setApi?.(emblaApi)
      emblaApi.on("reInit", onSelect)
      emblaApi.on("select", onSelect)

      return () => {
        emblaApi.off("reInit", onSelect)
        emblaApi.off("select", onSelect)
      }
    }, [emblaApi, onSelect, setApi])

    return (
      <CarouselContext.Provider
        value={{
          emblaApi,
          selectedIndex,
          canScrollPrev,
          canScrollNext,
          scrollPrev,
          scrollNext,
          scrollTo,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        }}
      >
        <div ref={ref} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          <div ref={carouselRef} className="overflow-hidden">
            <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col")}>{children}</div>
          </div>
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { emblaApi, selectedIndex, scrollTo } = useCarousel()
    const scrollSnaps = emblaApi ? emblaApi.scrollSnapList() : []

    return (
      <div ref={ref} className={cn("flex justify-center space-x-2 mt-4", className)} {...props}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full bg-gray-400 transition-colors",
              selectedIndex === index ? "bg-gray-800" : "hover:bg-gray-600",
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  },
)
CarouselDots.displayName = "CarouselDots"

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, useCarousel }
