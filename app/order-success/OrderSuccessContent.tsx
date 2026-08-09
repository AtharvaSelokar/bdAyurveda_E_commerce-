"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SavedOrder = {
  orderId: string;
  databaseId?: string | null;
  createdAt: string;

  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };

  items: Array<{
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;

  subtotal: number;
  deliveryCharge: number;
  total: number;

  paymentMethod: "upi" | "cod";
  paymentStatus: string;
  utrNumber?: string | null;
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="40"
      height="40"
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

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");

  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = window.sessionStorage.getItem(
        "bd-ayurveda-last-order",
      );

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder) as SavedOrder);
      }
    } catch (error) {
      console.error("Unable to load last order:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const orderNumber = queryOrderId || order?.orderId || "Confirmed";

  const isUpi = order?.paymentMethod === "upi";

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Announcement */}

      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Thank you for choosing BD Ayurveda
      </div>

      {/* Header */}

      <header className="border-b border-black/[0.05] bg-[#f8f5ed]/95">
        <div className="site-container flex h-[72px] items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src="/logos/logo.png"
                alt="BD Ayurveda"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="brand-serif text-[18px] font-bold leading-none text-[var(--green-dark)]">
                BD Ayurveda
              </p>

              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                Ancient care, modern life
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Success */}

      <section className="site-container py-12 sm:py-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-medium)]">
          <div className="bg-[var(--surface-sage)] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green)] text-white shadow-lg">
              <CheckIcon />
            </div>

            <span className="eyebrow mt-7 justify-center">
              Order confirmed
            </span>

            <h1 className="editorial-heading mt-4 text-[2.65rem] text-[var(--green-dark)] sm:text-5xl">
              Order placed successfully!
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base">
              Thank you for shopping with BD Ayurveda. Your order has been
              received successfully.
            </p>

            <div className="mx-auto mt-6 inline-flex rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-bold text-[var(--green-dark)] shadow-sm">
              Order ID: {orderNumber}
            </div>
          </div>

          <div className="p-5 sm:p-10">
            {!loaded ? (
              <div className="py-10 text-center text-sm text-[var(--muted)]">
                Loading order details...
              </div>
            ) : order ? (
              <>
                {/* Payment status */}

                <div
                  className={`rounded-[18px] border p-5 ${
                    isUpi
                      ? "border-[var(--gold)]/30 bg-[var(--gold-soft)]/25"
                      : "border-[var(--green)]/20 bg-[var(--green-soft)]/50"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    Payment status
                  </p>

                  <p className="mt-2 text-lg font-bold text-[var(--green-dark)]">
                    {isUpi
                      ? "Payment Verification Pending"
                      : "Cash on Delivery"}
                  </p>

                  <p className="mt-2 text-sm leading-6">
                    {isUpi
                      ? "We received your payment reference. The order will be confirmed after the UTR is matched with the received payment."
                      : "Your Cash on Delivery order has been received successfully."}
                  </p>

                  {isUpi && order.utrNumber && (
                    <div className="mt-4 rounded-[12px] bg-white px-4 py-3">
                      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                        UTR / Transaction Reference
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-[var(--green-dark)]">
                        {order.utrNumber}
                      </p>
                    </div>
                  )}
                </div>

                {/* Details */}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {/* Delivery */}

                  <div className="rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                      Delivery details
                    </p>

                    <p className="mt-3 font-bold text-[var(--green-dark)]">
                      {order.customer.fullName}
                    </p>

                    <p className="mt-2 text-sm leading-6">
                      {order.customer.address}

                      {order.customer.landmark
                        ? `, ${order.customer.landmark}`
                        : ""}

                      <br />

                      {order.customer.city}, {order.customer.state} -{" "}
                      {order.customer.pincode}
                    </p>

                    <p className="mt-3 text-sm text-[var(--green-dark)]">
                      {order.customer.phone}
                    </p>

                    {order.customer.email && (
                      <p className="mt-1 break-all text-sm">
                        {order.customer.email}
                      </p>
                    )}
                  </div>

                  {/* Summary */}

                  <div className="rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                      Order summary
                    </p>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[var(--muted)]">Items</span>

                        <span className="font-bold text-[var(--green-dark)]">
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[var(--muted)]">
                          Subtotal
                        </span>

                        <span className="font-bold text-[var(--green-dark)]">
                          ₹{order.subtotal}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[var(--muted)]">
                          Delivery
                        </span>

                        <span className="font-bold text-[var(--green-dark)]">
                          {order.deliveryCharge === 0
                            ? "Free"
                            : `₹${order.deliveryCharge}`}
                        </span>
                      </div>

                      <div className="border-t border-[var(--border)] pt-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-bold text-[var(--green-dark)]">
                            Total
                          </span>

                          <span className="text-2xl font-extrabold text-[var(--green-dark)]">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ordered products */}

                <div className="mt-6 rounded-[18px] border border-[var(--border)] bg-white p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    Products ordered
                  </p>

                  <div className="mt-4 space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center gap-3 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[#f1eee6] p-1.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[var(--green-dark)]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-[var(--green-dark)]">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-6 text-center">
                <p className="text-sm leading-6">
                  Your order was placed successfully. Keep the order ID above
                  for reference.
                </p>
              </div>
            )}

            {/* Actions */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white"
              >
                Continue Shopping
                <ArrowIcon />
              </Link>

              <Link
                href="/"
                className="btn-secondary inline-flex min-h-14 items-center justify-center rounded-full px-8 text-sm font-bold"
              >
                Return Home
              </Link>
            </div>

            <p className="mx-auto mt-7 max-w-xl text-center text-[10px] leading-5 text-[var(--muted)]">
              Keep your order ID for reference. For help with your order,
              contact BD Ayurveda support.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}