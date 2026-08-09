"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { products } from "@/data/products";

export default function ProductCarousel() {
  return (
    <section
      id="products"
      className="bg-white py-14 md:py-20"
    >
      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B88A44]">
            OUR COLLECTION
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#1F3527] md:text-5xl">
            Premium Ayurvedic Products
          </h2>

          <p className="mt-4 text-gray-600">
            Crafted with authentic Ayurvedic herbs and modern manufacturing
            standards.
          </p>

        </div>

        {/* Products */}

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-[#ECE5DA] bg-[#FBF9F4] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative bg-[#F6F3EC] p-5">

                {product.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#315243] px-3 py-1 text-[10px] font-semibold uppercase text-white">
                    Bestseller
                  </span>
                )}

                <Image
                  src={product.cover}
                  alt={product.name}
                  width={320}
                  height={320}
                  className="mx-auto h-44 w-auto object-contain transition duration-500 group-hover:scale-105 md:h-60"
                />

              </div>

              {/* Content */}

              <div className="p-5">

                <p className="text-xs uppercase tracking-[3px] text-[#B88A44]">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-[#1F3527] md:text-2xl">
                  {product.name}
                </h3>

                <div className="mt-4 space-y-2">

                  {product.benefits.slice(0, 3).map((benefit) => (
                    <p
                      key={benefit}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      ✅ {benefit}
                    </p>
                  ))}

                </div>

                <p className="mt-5 text-2xl font-bold text-[#315243]">
                  ₹{product.price}
                </p>

                <Link
                  href={`/product/${product.slug}`}
                  className="mt-6 flex h-11 items-center justify-center rounded-full bg-[#315243] text-sm font-semibold text-white transition hover:bg-[#274337]"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
}