"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    eyebrow: "Rooted in Ayurveda",
    title: "Everyday wellness,",
    highlight: "thoughtfully made.",
    description:
      "A focused collection of Ayurvedic products for hair care, respiratory wellness, digestion and healthy ageing.",
    image: "/hero/hero-1.webp",
    primaryText: "Shop Products",
    primaryHref: "/products",
    secondaryText: "Discover Our Story",
    secondaryHref: "/about",
  },
  {
    eyebrow: "Hair Wellness",
    title: "Care for your hair,",
    highlight: "the Ayurvedic way.",
    description:
      "Discover our hair oil and serum designed for a simple, consistent hair-care routine.",
    image: "/hero/hero-2.webp",
    primaryText: "Shop Hair Care",
    primaryHref: "/products/hair-growth-oil",
    secondaryText: "View Collection",
    secondaryHref: "/products",
  },
  {
    eyebrow: "Seasonal Wellness",
    title: "Traditional care,",
    highlight: "for modern routines.",
    description:
      "Explore selected Ayurvedic formulations for respiratory, digestive and everyday seasonal wellness.",
    image: "/hero/hero-3.webp",
    primaryText: "Explore Products",
    primaryHref: "/products",
    secondaryText: "Our Ingredients",
    secondaryHref: "#ingredients",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const difference = touchStartX.current - endX;

    if (Math.abs(difference) > 45) {
      difference > 0 ? next() : previous();
    }

    touchStartX.current = null;
  };

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden bg-[var(--background)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#e6ebe3] blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#eee3ce] blur-3xl" />

      <div className="site-container relative grid items-center gap-8 pb-14 pt-10 md:min-h-[700px] md:grid-cols-2 md:gap-14 md:pb-20 md:pt-16">
        <div
          key={`content-${active}`}
          className="relative z-10 text-center animate-[heroFade_.55s_ease] md:text-left"
        >
          <span className="eyebrow justify-center md:justify-start">
            {slide.eyebrow}
          </span>

          <h1 className="editorial-heading mx-auto mt-5 max-w-[650px] text-[3rem] leading-[0.98] text-[var(--green-dark)] sm:text-6xl md:mx-0 lg:text-[4.8rem]">
            {slide.title}
            <span className="block italic text-[var(--gold)]">
              {slide.highlight}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-7 md:mx-0 md:text-[17px]">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-3 md:justify-start">
            <Link
              href={slide.primaryHref}
              className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white"
            >
              {slide.primaryText}
              <ArrowIcon />
            </Link>

            <Link
              href={slide.secondaryHref}
              className="btn-secondary inline-flex min-h-14 items-center justify-center rounded-full px-8 text-sm font-bold"
            >
              {slide.secondaryText}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-bold text-[var(--muted)] md:justify-start">
            {["Made in India", "Ayurvedic ingredients", "Pan-India delivery"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          key={`image-${active}`}
          className="relative mx-auto w-full max-w-[620px] animate-[heroFade_.55s_ease]"
        >
          <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[470px]">
            <div className="absolute inset-x-[12%] bottom-[8%] h-20 rounded-full bg-[var(--green)]/10 blur-3xl" />

            <img
              src={slide.image}
              alt={slide.title}
              className="relative z-10 max-h-[390px] w-full object-contain drop-shadow-[0_26px_26px_rgba(37,48,42,0.16)] sm:max-h-[520px]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to hero slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              active === index
                ? "w-7 bg-[var(--green)]"
                : "w-2 bg-[var(--border)]"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous hero slide"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/85 text-[var(--green)] shadow-sm backdrop-blur transition hover:bg-white md:flex"
      >
        ←
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next hero slide"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/85 text-[var(--green)] shadow-sm backdrop-blur transition hover:bg-white md:flex"
      >
        →
      </button>
    </section>
  );
}