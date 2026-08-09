"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

const FREE_DELIVERY_THRESHOLD = 699;
const STANDARD_DELIVERY_CHARGE = 79;

function MinusIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export default function CartPage() {
  const {
    items,
    cartCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const deliveryCharge =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_CHARGE;

  const total = subtotal + deliveryCharge;
  const amountForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
          Free delivery on orders above ₹{FREE_DELIVERY_THRESHOLD}
        </div>

        <header className="border-b border-black/[0.05] bg-[#f8f5ed]/95 backdrop-blur-xl">
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

            <Link
              href="/products"
              className="btn-secondary inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-bold sm:px-5 sm:text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </header>

        <section className="site-container flex min-h-[68vh] items-center justify-center py-16">
          <div className="max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)]">
              <svg
                aria-hidden="true"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 5h2l2 10h9l2-7H7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="19" r="1.2" fill="currentColor" />
                <circle cx="17" cy="19" r="1.2" fill="currentColor" />
              </svg>
            </div>

            <span className="eyebrow mt-7 justify-center">Your cart</span>

            <h1 className="editorial-heading mt-4 text-[2.6rem] text-[var(--green-dark)] sm:text-5xl">
              Your cart is currently empty.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 sm:text-base">
              Explore the BD Ayurveda collection and add a product that fits
              your everyday wellness routine.
            </p>

            <Link
              href="/products"
              className="btn-primary mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white"
            >
              Explore Products
              <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 lg:pb-0">
      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Free delivery on orders above ₹{FREE_DELIVERY_THRESHOLD}
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

          <Link
            href="/products"
            className="btn-secondary inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-bold sm:px-5 sm:text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 sm:py-14">
        <div className="site-container">
          <span className="eyebrow">Your shopping bag</span>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="editorial-heading text-[2.7rem] text-[var(--green-dark)] sm:text-5xl">
                Review your cart.
              </h1>
              <p className="mt-3 text-sm sm:text-base">
                {cartCount} {cartCount === 1 ? "item" : "items"} ready for
                checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="btn-text text-xs font-bold"
            >
              Clear cart
            </button>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.slug}
                className="grid grid-cols-[92px_1fr] gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm sm:grid-cols-[140px_1fr] sm:gap-6 sm:p-5"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="aspect-square overflow-hidden rounded-[14px] bg-[#f1eee6] p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition duration-300 hover:scale-105"
                  />
                </Link>

                <div className="flex min-w-0 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="line-clamp-2 text-sm font-bold leading-5 text-[var(--green-dark)] transition hover:text-[var(--green)] sm:text-lg"
                      >
                        {item.name}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        <span className="font-extrabold text-[var(--green-dark)] sm:text-lg">
                          ₹{item.price}
                        </span>

                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="text-[10px] text-[var(--muted)] line-through sm:text-xs">
                              ₹{item.originalPrice}
                            </span>
                          )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[#f8eaea] hover:text-[#9b4747]"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
                    <div>
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                        Quantity
                      </p>

                      <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-white p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity - 1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--green-soft)] hover:text-[var(--green)]"
                        >
                          <MinusIcon />
                        </button>

                        <span className="min-w-9 text-center text-sm font-bold text-[var(--green-dark)]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--green-soft)] hover:text-[var(--green)]"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                        Item total
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-[var(--green-dark)]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-small)] sm:p-7 lg:sticky lg:top-[104px]">
            <h2 className="font-[var(--font-serif)] text-2xl font-bold text-[var(--green-dark)]">
              Order summary
            </h2>

            {amountForFreeDelivery > 0 ? (
              <div className="mt-5 rounded-[14px] bg-[var(--surface-sage)] p-4">
                <p className="text-xs font-semibold leading-5 text-[var(--green-dark)]">
                  Add ₹{amountForFreeDelivery} more to unlock free delivery.
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-[var(--green)] transition-all"
                    style={{
                      width: `${Math.min(
                        (subtotal / FREE_DELIVERY_THRESHOLD) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-[14px] bg-[var(--green-soft)] p-4">
                <p className="text-xs font-bold text-[var(--green-dark)]">
                  You unlocked free delivery.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[var(--muted)]">Subtotal</span>
                <span className="font-bold text-[var(--green-dark)]">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[var(--muted)]">Delivery</span>
                <span className="font-bold text-[var(--green-dark)]">
                  {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 py-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                  Total
                </p>
                <p className="mt-1 text-[10px] text-[var(--muted)]">
                  Inclusive of applicable taxes
                </p>
              </div>

              <p className="text-3xl font-extrabold text-[var(--green-dark)]">
                ₹{total}
              </p>
            </div>

            <Link
              href="/checkout"
              className="btn-primary flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-white"
            >
              Proceed to Checkout
              <ArrowIcon />
            </Link>

            <Link
              href="/products"
              className="btn-secondary mt-3 flex min-h-13 w-full items-center justify-center rounded-full px-7 text-sm font-bold"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 grid grid-cols-3 border-t border-[var(--border)] pt-5 text-center">
              {[
                ["Secure", "Checkout"],
                ["Easy", "Support"],
                ["India", "Delivery"],
              ].map(([title, subtitle], index) => (
                <div
                  key={title}
                  className={
                    index < 2 ? "border-r border-[var(--border)]" : ""
                  }
                >
                  <p className="text-[10px] font-bold text-[var(--green-dark)]">
                    {title}
                  </p>
                  <p className="mt-1 px-1 text-[8px]">{subtitle}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(37,48,42,0.10)] backdrop-blur-xl lg:hidden">
        <div className="site-container flex items-center gap-3">
          <div className="min-w-[86px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
              Total
            </p>
            <p className="text-lg font-extrabold text-[var(--green-dark)]">
              ₹{total}
            </p>
          </div>

          <Link
            href="/checkout"
            className="btn-primary flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold text-white"
          >
            Checkout
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
