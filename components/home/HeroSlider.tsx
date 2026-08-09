"use client";

import Image from "next/image";
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
    eyebrow: "Seasonal Wellness",
    title: "Traditional care,",
    highlight: "for modern routines.",
    description:
      "Explore selected Ayurvedic formulations for respiratory, digestive and everyday seasonal wellness.",
    image: "/hero/hero-5.webp",
    primaryText: "Explore Products",
    primaryHref: "/products",
    secondaryText: "Our Ingredients",
    secondaryHref: "#ingredients",
  },

  {
    eyebrow: "Digestive Wellness",
    title: "Ayurvedic support,",
    highlight: "for everyday comfort.",
    description:
      "Discover Arshavinashak Syrup, a thoughtfully prepared Ayurvedic formulation for digestive wellness and daily care.",
    image: "/hero/hero-9.webp",
    primaryText: "Shop Arshavinashak",
    primaryHref: "/products/arshvinashak",
    secondaryText: "Explore All Products",
    secondaryHref: "/products",
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
    }, 4000);

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

  const handleTouchStart = (
    event: React.TouchEvent<HTMLElement>,
  ) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLElement>,
  ) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;

    const difference =
      touchStartX.current - endX;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
  };

  const slide = slides[active];

  return (
    <section
      className="relative w-full max-w-full overflow-hidden bg-[var(--background)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative background */}

      <div className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-[var(--green-soft)]/45 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[var(--gold-soft)]/35 blur-3xl sm:h-96 sm:w-96" />

      {/* Main hero */}

      <div className="site-container relative grid items-center gap-7 pb-14 pt-9 sm:gap-10 sm:pb-16 sm:pt-14 md:min-h-[680px] md:grid-cols-2 md:gap-14 md:pb-20 md:pt-16">
        {/* Text */}

        <div
          key={`content-${active}`}
          className="relative z-10 text-center animate-[heroFade_.55s_ease] md:text-left"
        >
          <span className="eyebrow justify-center md:justify-start">
            {slide.eyebrow}
          </span>

          <h1 className="editorial-heading mx-auto mt-4 max-w-[650px] text-[2.65rem] leading-[1] text-[var(--green-dark)] sm:mt-5 sm:text-6xl md:mx-0 lg:text-[4.7rem]">
            {slide.title}

            <span className="block italic text-[var(--gold)]">
              {slide.highlight}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[14px] leading-6 sm:mt-6 sm:text-[15px] sm:leading-7 md:mx-0 md:text-[17px]">
            {slide.description}
          </p>

          {/* CTA */}

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href={slide.primaryHref}
              className="btn-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-white sm:min-h-14 sm:px-8"
            >
              {slide.primaryText}

              <ArrowIcon />
            </Link>

            <Link
              href={slide.secondaryHref}
              className="btn-secondary inline-flex min-h-13 items-center justify-center rounded-full px-7 text-sm font-bold sm:min-h-14 sm:px-8"
            >
              {slide.secondaryText}
            </Link>
          </div>

          {/* Trust points */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[10px] font-bold text-[var(--muted)] sm:mt-8 sm:text-[11px] md:justify-start">
            {[
              "Made in India",
              "Ayurvedic ingredients",
              "Pan-India delivery",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />

                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero image */}

        <div
  key={`image-${active}`}
  className="relative w-full animate-[heroFade_.55s_ease]"
>
  <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5] md:aspect-[4/5]">
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      priority={active === 0}
      quality={75}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
      className="object-contain"
    />
  </div>
</div>
      </div>

      {/* Dots */}

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to hero slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === index
                ? "w-7 bg-[var(--green)]"
                : "w-2 bg-[var(--border)]"
            }`}
          />
        ))}
      </div>

      {/* Desktop arrows */}

      <button
        type="button"
        onClick={previous}
        aria-label="Previous hero slide"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/90 text-[var(--green)] shadow-sm backdrop-blur transition duration-200 hover:-translate-y-[52%] hover:bg-white hover:shadow-md md:flex"
      >
        ←
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next hero slide"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/90 text-[var(--green)] shadow-sm backdrop-blur transition duration-200 hover:-translate-y-[52%] hover:bg-white hover:shadow-md md:flex"
      >
        →
      </button>
    </section>
  );
}