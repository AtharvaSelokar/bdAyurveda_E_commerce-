"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import { products } from "@/data/products";

export default function ProductCarousel() {
  return (
    <section className="bg-[var(--background)] py-14 sm:py-20">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--gold)] sm:text-xs">
            Our Collection
          </p>

          <h2 className="editorial-heading mt-3 text-[2.25rem] leading-tight text-[var(--green-dark)] sm:text-5xl">
            Premium Ayurvedic Products
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Thoughtfully crafted Ayurvedic formulations made for modern
            everyday wellness.
          </p>
        </div>

        {/* Products */}
        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="interactive-card group flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)]"
            >
              {/* Product image */}
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-square overflow-hidden bg-[var(--surface-soft)] p-2 sm:p-4"
              >
                {product.slug === "hair-growth-oil" && (
                  <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[var(--green)] px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.1em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">
                    Bestseller
                  </span>
                )}

                <Image
                  src={product.cover}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="mx-auto h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                />
              </Link>

              {/* Product content */}
              <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-[var(--gold)] sm:text-[10px]">
                  {product.category}
                </p>

                <h3 className="mt-1.5 min-h-[38px] text-[14px] font-bold leading-[1.2] text-[var(--green-dark)] sm:min-h-[48px] sm:text-xl">
                  {product.name}
                </h3>

                {/* Benefits */}
                <div className="mt-3 hidden space-y-2 sm:block">
                  {product.benefits.slice(0, 3).map((benefit) => (
                    <p
                      key={benefit}
                      className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]"
                    >
                      <span className="mt-[2px] text-[var(--green)]">
                        ✓
                      </span>

                      <span>{benefit}</span>
                    </p>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-4">
                  <span className="text-[17px] font-extrabold text-[var(--green-dark)] sm:text-xl">
                    ₹{product.price}
                  </span>

                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <>
                        <span className="text-[10px] text-[var(--muted)] line-through sm:text-xs">
                          ₹{product.originalPrice}
                        </span>

                        <span className="rounded-full bg-[var(--green-soft)] px-2 py-1 text-[8px] font-bold text-[var(--green)] sm:text-[9px]">
                          Save ₹{product.originalPrice - product.price}
                        </span>
                      </>
                    )}
                </div>

                {/* Button */}
                <Link
                  href={`/products/${product.slug}`}
                  className="btn-primary mt-4 inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[11px] font-bold text-white sm:mt-5 sm:min-h-12 sm:text-sm"
                >
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}