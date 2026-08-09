"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { products } from "@/data/products";

const categories = [
  "All",
  "Hair Wellness",
  "Respiratory Care",
  "Digestive Wellness",
  "Healthy Ageing",
  "Seasonal Wellness",
];

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const normalizedQuery = searchQuery.trim().toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.shortName.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Free delivery on selected orders across India
      </div>

      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#f8f5ed]/95 backdrop-blur-xl">
        <div className="site-container flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src="/logos/logo.png"
                alt="BD Ayurveda"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="font-[var(--font-serif)] text-[18px] font-bold leading-none text-[var(--green-dark)]">
                BD Ayurveda
              </p>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                Ancient care, modern life
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[var(--text)] md:flex">
            <Link href="/" className="transition hover:text-[var(--green)]">
              Home
            </Link>
            <Link
              href="/products"
              className="text-[var(--green)]"
              aria-current="page"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="transition hover:text-[var(--green)]"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-[var(--green)]"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/"
            className="btn-secondary inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-bold sm:px-5 sm:text-sm"
          >
            Back Home
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] py-14 sm:py-20">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[var(--surface-sage)] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[var(--gold-soft)]/40 blur-3xl" />

        <div className="site-container relative">
          <span className="eyebrow">Our complete collection</span>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h1 className="editorial-heading max-w-3xl text-[2.8rem] leading-[1.02] text-[var(--green-dark)] sm:text-6xl">
                Six focused Ayurvedic formulations.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 sm:text-base">
                Explore thoughtfully presented products for hair care,
                respiratory wellness, digestive support, healthy ageing and
                seasonal routines.
              </p>
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                Simple by design
              </p>
              <p className="mt-2 text-sm leading-6">
                A focused six-product range makes it easier to understand what
                each formulation is designed for.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-white py-5">
        <div className="site-container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="horizontal-scroll -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-11 shrink-0 rounded-full border px-5 text-xs font-bold transition ${
                      isActive
                        ? "border-[var(--green)] bg-[var(--green)] text-white shadow-sm"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--green-dark)] hover:border-[var(--green)] hover:text-[var(--green)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="relative block w-full lg:max-w-[320px]">
              <span className="sr-only">Search products</span>

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                <SearchIcon />
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-12 pr-5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:bg-white focus:shadow-sm"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f6f3ec]">
        <div className="site-container">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                {activeCategory === "All" ? "All products" : activeCategory}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {(activeCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="btn-text text-xs font-bold"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const saving = product.originalPrice - product.price;

                return (
                  <article
                    key={product.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--green)]/30 hover:shadow-[0_18px_42px_rgba(37,48,42,0.10)]"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex h-full flex-col"
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#f1eee6] p-2 sm:p-4">
                        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.09em] text-[var(--green)] backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[9px]">
                          {product.badge}
                        </span>

                        <img
                          src={product.cover}
                          alt={product.name}
                          className="h-full w-full scale-[1.04] object-contain transition duration-500 group-hover:scale-[1.10]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-[var(--gold)] sm:text-[10px]">
                          {product.category}
                        </p>

                        <h2 className="mt-1.5 min-h-[40px] text-[14px] font-bold leading-[1.35] text-[var(--green-dark)] sm:min-h-[52px] sm:text-xl">
                          {product.shortName}
                        </h2>

                        <p className="mt-3 hidden text-xs leading-6 text-[var(--muted)] sm:line-clamp-2 sm:block">
                          {product.shortDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-[16px] font-extrabold text-[var(--green-dark)] sm:text-xl">
                            ₹{product.price}
                          </span>

                          <span className="text-[10px] text-[var(--muted)] line-through sm:text-xs">
                            ₹{product.originalPrice}
                          </span>

                          <span className="rounded-full bg-[var(--green-soft)] px-2 py-1 text-[8px] font-bold text-[var(--green)] sm:text-[9px]">
                            Save ₹{saving}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4">
                          <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--green)] transition group-hover:translate-x-1 sm:text-xs">
                            View Details
                          </span>

                          <span className="text-[var(--green)] transition group-hover:translate-x-1">
                            <ArrowIcon size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[24px] border border-[var(--border)] bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)]">
                <SearchIcon />
              </div>

              <h2 className="editorial-heading mt-5 text-3xl text-[var(--green-dark)]">
                No products found.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm">
                Try another search term or clear the current category filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="btn-primary mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold text-white"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="grid overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface-sage)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px]">
              <img
                src="/banners/brand-story.webp"
                alt="BD Ayurveda ingredients and wellness philosophy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center px-6 py-10 sm:p-12 lg:p-16">
              <div>
                <span className="eyebrow">Need help choosing?</span>

                <h2 className="editorial-heading mt-4 text-[2.3rem] text-[var(--green-dark)] sm:text-5xl">
                  Start with your wellness concern.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 sm:text-base">
                  Explore each product page for benefits, ingredients and usage
                  information, or contact the BD Ayurveda team for assistance.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://wa.me/919921678539?text=Hello%20BD%20Ayurveda%2C%20I%20need%20help%20choosing%20a%20product."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-bold text-white"
                  >
                    Ask on WhatsApp
                  </a>

                  <Link
                    href="/contact"
                    className="btn-secondary inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-bold"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--green-dark)] text-white">
        <div className="site-container grid gap-8 py-11 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
                <img
                  src="/logo/logo.png"
                  alt="BD Ayurveda"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              <div>
                <p className="font-[var(--font-serif)] text-lg font-bold text-white">
                  BD Ayurveda
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#d7bd86]">
                  Ancient care, modern life
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm text-white/55">
              A focused collection of Ayurvedic wellness products for modern
              Indian families.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#d7bd86]">
              Shop
            </p>

            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/65">
              <Link href="/products">All Products</Link>
              <Link href="/products/hair-growth-oil">Hair Care Oil</Link>
              <Link href="/products/hair-growth-serum">Hair Care Serum</Link>
              <Link href="/products/cough-syrup">Tulsipreet Syrup</Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#d7bd86]">
              Information
            </p>

            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/65">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms and Conditions</Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#d7bd86]">
              Contact
            </p>

            <div className="mt-4 space-y-2.5 text-sm text-white/65">
              <p className="text-white/65">Nagpur, Maharashtra, India</p>
              <p className="text-white/65">support@bdayurveda.com</p>
              <p className="text-white/65">
                Monday–Saturday, 10 AM–7 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="site-container flex flex-col gap-2 py-5 text-center text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-white/40">
              © {new Date().getFullYear()} BD Ayurveda. All rights reserved.
            </p>

            <p className="text-white/40">
              Products are not intended to diagnose, treat, cure or prevent
              disease.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}