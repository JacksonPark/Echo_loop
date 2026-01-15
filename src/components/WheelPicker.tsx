'use client';

import { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface WheelPickerProps {
  values: number[];
  selectedValue: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  label?: string;
}

export function WheelPicker({
  values,
  selectedValue,
  onChange,
  formatValue = (v) => v.toString().padStart(2, '0'),
  label,
}: WheelPickerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true,
    dragFree: false,
    containScroll: false,
    align: 'center',
  });

  const isScrollingRef = useRef(false);

  const scrollToValue = useCallback((value: number) => {
    if (!emblaApi) return;
    const index = values.indexOf(value);
    if (index !== -1) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, values]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      const value = values[index];
      if (value !== selectedValue && !isScrollingRef.current) {
        onChange(value);
      }
    };

    const onSettle = () => {
      isScrollingRef.current = false;
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);

    // Initial scroll to selected value
    scrollToValue(selectedValue);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, values, selectedValue, onChange, scrollToValue]);

  // Sync external changes
  useEffect(() => {
    if (emblaApi && !isScrollingRef.current) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const currentValue = values[currentIndex];
      if (currentValue !== selectedValue) {
        isScrollingRef.current = true;
        scrollToValue(selectedValue);
      }
    }
  }, [selectedValue, emblaApi, values, scrollToValue]);

  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-xs text-zinc-500 mb-1">{label}</span>
      )}
      <div className="relative h-[150px] w-[60px] overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-[55px] bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />

        {/* Selection indicator */}
        <div className="absolute top-1/2 left-0 right-0 h-[40px] -translate-y-1/2 border-y border-zinc-700 pointer-events-none z-0" />

        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex flex-col h-full">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex-none h-[40px] flex items-center justify-center text-2xl font-mono"
                style={{
                  minHeight: '40px',
                  paddingTop: index === 0 ? '55px' : '0',
                  paddingBottom: index === values.length - 1 ? '55px' : '0',
                }}
              >
                <span className={value === selectedValue ? 'text-white' : 'text-zinc-500'}>
                  {formatValue(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
