"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  ShieldCheck,
  Leaf,
  Truck,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5EE] pt-20 pb-10 md:pt-28 md:pb-16">

      {/* Background Blur */}

      <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-[#DCE8DF] opacity-60 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#EFE5D8] opacity-60 blur-3xl" />

      <Container>

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* IMAGE */}

          <div className="order-1 flex justify-center lg:order-2">

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-[#DCE8DF] blur-3xl" />

              <Image
                src="/hero/hero-product.webp"
                alt="BD Ayurved"
                width={520}
                height={620}
                priority
                className="relative z-10 mx-auto w-[300px] sm:w-[380px] lg:w-[470px]"
              />

              {/* Floating Cards Desktop Only */}

              <div className="absolute left-0 top-8 hidden rounded-2xl bg-white px-4 py-3 shadow-xl lg:block">

                <p className="text-xs text-gray-500">
                  Best Seller
                </p>

                <p className="font-semibold text-[#315243]">
                  Hair Growth Oil
                </p>

              </div>

              <div className="absolute bottom-8 right-0 hidden rounded-2xl bg-white px-5 py-4 shadow-xl lg:block">

                <p className="text-2xl font-bold text-[#315243]">
                  ★ 4.9
                </p>

                <p className="text-xs text-gray-500">
                  Customer Rating
                </p>

              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="order-2 lg:order-1">

            <span className="inline-flex rounded-full bg-[#EEE5D4] px-4 py-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#B88A44]">

              Premium Ayurvedic Wellness

            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#25362D] md:text-6xl">

              Nature's Healing
              <br />
              For Modern Life

            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#666] md:text-lg">

              Premium Ayurvedic products crafted with authentic herbs,
              trusted formulations and modern manufacturing standards.

            </p>

            {/* Rating */}

            <div className="mt-5 flex items-center gap-3">

              <div className="flex text-[#F7B500]">

                {[1,2,3,4,5].map((i)=>(
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                  />
                ))}

              </div>

              <span className="text-sm text-gray-600">
                Trusted by 1,200+ Families
              </span>

            </div>

            {/* Buttons */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                href="#products"
                className="flex h-11 items-center justify-center rounded-full bg-[#315243] px-8 text-sm font-semibold text-white transition hover:bg-[#274337]"
              >
                Shop Now
              </Link>

              <Link
                href="#story"
                className="flex h-11 items-center justify-center rounded-full border border-[#315243] bg-white px-8 text-sm font-semibold text-[#315243]"
              >
                Learn More
              </Link>

            </div>

            {/* Trust Cards */}

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <Leaf
                  size={22}
                  className="mb-2 text-[#315243]"
                />

                <p className="text-xs font-semibold">
                  100% Ayurvedic
                </p>

              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <ShieldCheck
                  size={22}
                  className="mb-2 text-[#315243]"
                />

                <p className="text-xs font-semibold">
                  GMP Certified
                </p>

              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <Truck
                  size={22}
                  className="mb-2 text-[#315243]"
                />

                <p className="text-xs font-semibold">
                  Fast Delivery
                </p>

              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">

                <p className="text-xl">
                  🇮🇳
                </p>

                <p className="mt-2 text-xs font-semibold">
                  Made in India
                </p>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}