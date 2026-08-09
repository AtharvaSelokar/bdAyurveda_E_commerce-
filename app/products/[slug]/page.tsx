import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/product/ProductGallery";
import { getProductBySlug, products } from "@/data/products";
import AddToCartButton from "@/components/cart/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | BD Ayurveda",
    };
  }

  return {
    title: `${product.name} | BD Ayurveda`,
    description: product.shortDescription,
  };
}

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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L3 9.4l6.2-.9L12 2.8Z" />
    </svg>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const saving = product.originalPrice - product.price;
  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello BD Ayurveda, I want to know more about ${product.name}.`,
  );

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20 md:pb-0">
      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Free delivery on selected orders across India
      </div>

      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#f8f5ed]/95 backdrop-blur-xl">
        <div className="site-container flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src="/logo/logo.png"
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

          <Link
            href="/products"
            className="btn-secondary inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-bold sm:px-5 sm:text-sm"
          >
            All Products
          </Link>
        </div>
      </header>

      <div className="site-container py-5 sm:py-7">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[var(--muted)] sm:text-xs"
        >
          <Link href="/" className="transition hover:text-[var(--green)]">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="transition hover:text-[var(--green)]"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-[var(--green-dark)]">{product.shortName}</span>
        </nav>
      </div>

      <section className="pb-14 pt-2 sm:pb-20">
        <div className="site-container grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <ProductGallery
            images={product.gallery}
            productName={product.name}
          />

          <div className="lg:sticky lg:top-[105px]">
            <span className="eyebrow">{product.category}</span>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--green-soft)] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[var(--green)]">
                {product.badge}
              </span>

              <div className="flex items-center gap-1 text-[var(--gold)]">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>

              <span className="text-[11px] font-semibold text-[var(--muted)]">
                Customer favourite
              </span>
            </div>

            <h1 className="editorial-heading mt-5 text-[2.65rem] leading-[1.02] text-[var(--green-dark)] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 sm:text-base">
              {product.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-[var(--border)] py-5">
              <span className="text-3xl font-extrabold text-[var(--green-dark)]">
                ₹{product.price}
              </span>

              <span className="text-sm text-[var(--muted)] line-through">
                ₹{product.originalPrice}
              </span>

              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[var(--green)] shadow-sm">
                Save ₹{saving}
              </span>
            </div>

            <p className="mt-3 text-[11px]">
              Inclusive of applicable taxes. Shipping calculated at checkout.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <AddToCartButton product={product} />

              <Link
                href="/cart"
                className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-white"
              >
                View Cart
                <ArrowIcon />
              </Link>

              <a
                href={`https://wa.me/919921678539?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-bold sm:col-span-2"
              >
                Ask on WhatsApp
              </a>
            </div>

            <div className="mt-7 grid grid-cols-3 border-y border-[var(--border)] py-5 text-center">
              {[
                ["Ayurvedic", "Focused formulation"],
                ["Made in India", "Created with care"],
                ["Support", "WhatsApp assistance"],
              ].map(([title, subtitle], index) => (
                <div
                  key={title}
                  className={index < 2 ? "border-r border-[var(--border)]" : ""}
                >
                  <p className="text-[11px] font-bold text-[var(--green-dark)] sm:text-xs">
                    {title}
                  </p>
                  <p className="mt-1 px-1 text-[8px] leading-4 sm:text-[9px]">
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow">Product overview</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Designed for a simpler wellness routine.
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 sm:text-base">
              {product.description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 border-b border-[var(--border)] py-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)]">
                    <CheckIcon />
                  </span>
                  <p className="text-sm font-semibold leading-6 text-[var(--text)]">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected ingredients</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Familiar Ayurvedic ingredients.
            </h2>
            <p className="mt-4 text-sm sm:text-base">
              Review the product packaging for the complete and final ingredient
              declaration.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {product.ingredients.map((ingredient) => (
              <article
                key={ingredient.name}
                className="group rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-3 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-small)]"
              >
                <div className="aspect-square overflow-hidden rounded-full bg-[var(--surface-sage)]">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-[var(--font-serif)] text-lg font-bold text-[var(--green-dark)]">
                  {ingredient.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="site-container">
          <div className="max-w-2xl">
            <span className="eyebrow">How to use</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Four simple steps.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.directions.map((direction, index) => (
              <article
                key={direction}
                className="rounded-[18px] border border-[var(--border)] bg-white p-5"
              >
                <span className="font-[var(--font-serif)] text-3xl text-[var(--gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 text-sm font-semibold leading-6 text-[var(--text)]">
                  {direction}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--surface)]">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Who is it for?</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Built for everyday routines.
            </h2>

            <div className="mt-7 space-y-3">
              {product.suitableFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)]">
                    <CheckIcon />
                  </span>
                  <p className="text-sm font-semibold leading-6 text-[var(--text)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">Important note</span>
            <div className="mt-4 rounded-[20px] border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
              <p className="text-sm leading-7 sm:text-base">
                Ayurvedic and wellness products are not intended to diagnose,
                treat, cure or prevent disease. Review the product label before
                use. Consult a qualified healthcare professional for pregnancy,
                children, allergies, ongoing medication or specific medical
                concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="site-container grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <span className="eyebrow">Product questions</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Helpful answers before you order.
            </h2>
          </div>

          <div className="border-t border-[var(--border)]">
            {product.faqs.map((faq) => (
              <details
                key={faq.question}
                className="faq-item group border-b border-[var(--border)] transition hover:bg-white/60"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-5 px-2 py-6 sm:px-4">
                  <span className="text-[15px] font-bold text-[var(--green-dark)] sm:text-[17px]">
                    {faq.question}
                  </span>
                  <span className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-2xl text-[var(--green)] transition duration-300 group-hover:bg-[var(--green)] group-hover:text-white">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl px-2 pb-6 pr-12 text-sm sm:px-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--surface)]">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Customer reviews</span>
            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Real experiences, thoughtfully shared.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Priya Sharma",
                city: "Nagpur",
                review:
                  "The product feels premium and easy to include in my routine. Packaging and presentation were both excellent.",
              },
              {
                name: "Neha Patil",
                city: "Pune",
                review:
                  "Clear instructions, smooth delivery and a much more trustworthy experience than many generic herbal products.",
              },
              {
                name: "Rohit Verma",
                city: "Mumbai",
                review:
                  "The website made it easy to understand the product before ordering. Everything arrived properly packed.",
              },
            ].map((review) => (
              <article
                key={review.name}
                className="rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-small)]"
              >
                <div className="flex gap-1 text-[var(--gold)]">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--text)]">
                  “{review.review}”
                </p>

                <div className="mt-6 border-t border-[var(--border)] pt-5">
                  <p className="text-sm font-bold text-[var(--green-dark)]">
                    {review.name}
                  </p>
                  <p className="mt-1 text-[10px]">{review.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex items-end justify-between gap-5">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
                Continue exploring.
              </h2>
            </div>

            <Link
              href="/products"
              className="btn-text hidden items-center gap-2 text-sm font-bold sm:flex"
            >
              View all
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <article
                key={item.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-small)]"
              >
                <Link href={`/products/${item.slug}`} className="flex h-full flex-col">
                  <div className="aspect-square overflow-hidden bg-[#f2eee5] p-3 sm:p-5">
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-[var(--gold)] sm:text-[10px]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-sm font-bold text-[var(--green-dark)] sm:text-lg">
                      {item.shortName}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-extrabold text-[var(--green-dark)]">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-[var(--muted)] line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--green-dark)] text-white">
        <div className="site-container flex flex-col gap-4 py-9 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-[var(--font-serif)] text-lg font-bold text-white">
              BD Ayurveda
            </p>
            <p className="mt-1 text-xs text-white/55">
              Ancient care, modern life.
            </p>
          </div>

          <div className="flex justify-center gap-5 text-xs text-white/65">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(37,48,42,0.10)] backdrop-blur-xl md:hidden">
        <div className="site-container flex items-center gap-3">
          <div className="min-w-[76px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
              Price
            </p>
            <p className="text-lg font-extrabold text-[var(--green-dark)]">
              ₹{product.price}
            </p>
          </div>

          <a
            href={`https://wa.me/919921678539?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex min-h-12 flex-1 items-center justify-center rounded-full px-4 text-xs font-bold"
          >
            WhatsApp
          </a>

          <Link
            href="/cart"
            className="btn-primary flex min-h-12 flex-[1.15] items-center justify-center rounded-full px-4 text-xs font-bold text-white"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </main>
  );
}