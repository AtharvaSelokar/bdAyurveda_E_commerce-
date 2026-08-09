"use client";

import { useRef, useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const selectImage = (index: number) => {
    setActiveIndex(index);

    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollTo({
      left: scroller.clientWidth * index,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;

    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), images.length - 1));
  };

  return (
    <div className="min-w-0">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="horizontal-scroll flex snap-x snap-mandatory overflow-x-auto rounded-[24px] border border-[var(--border)] bg-[#f2eee5]"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className="relative aspect-square min-w-full snap-center overflow-hidden p-4 sm:p-8"
          >
            <img
              src={image}
              alt={`${productName} product image ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2 sm:hidden">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => selectImage(index)}
            aria-label={`View product image ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index
                ? "w-6 bg-[var(--green)]"
                : "w-2 bg-[var(--border)]"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 hidden grid-cols-5 gap-3 sm:grid">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => selectImage(index)}
            aria-label={`View product image ${index + 1}`}
            className={`aspect-square overflow-hidden rounded-[14px] border bg-[#f5f1e8] p-1.5 transition ${
              activeIndex === index
                ? "border-[var(--green)] shadow-sm"
                : "border-[var(--border)] hover:border-[var(--green)]/50"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
