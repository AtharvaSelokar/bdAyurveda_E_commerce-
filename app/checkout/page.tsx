"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useCart } from "@/context/CartContext";

const FREE_DELIVERY_THRESHOLD = 699;
const STANDARD_DELIVERY_CHARGE = 79;

// Replace this with your real business UPI ID before launch.
const BUSINESS_UPI_ID = "bdayurveda@upi";

type PaymentMethod = "upi" | "cod";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  utrNumber: string;
};

type FormErrors = Partial<Record<keyof FormState | "submit", string>>;

type OrderApiResponse = {
  success?: boolean;
  orderId?: string;
  orderNumber?: string;
  total?: number;
  error?: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  city: "",
  state: "Maharashtra",
  pincode: "",
  paymentMethod: "upi",
  utrNumber: "",
};

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

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (form.fullName.trim().length < 3) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  if (
    form.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (form.address.trim().length < 10) {
    errors.address = "Enter your complete delivery address.";
  }

  if (form.city.trim().length < 2) {
    errors.city = "Enter your city.";
  }

  if (form.state.trim().length < 2) {
    errors.state = "Enter your state.";
  }

  if (!/^[1-9][0-9]{5}$/.test(form.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }

  if (form.paymentMethod === "upi") {
    const utr = form.utrNumber.trim().replace(/\s/g, "");

    if (utr.length < 8 || utr.length > 24) {
      errors.utrNumber =
        "Enter the UTR / transaction reference shown after payment.";
    }
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartCount, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState("");

  const deliveryCharge =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_CHARGE;

  const total = subtotal + deliveryCharge;

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "paymentMethod" && value === "cod"
        ? { utrNumber: "" }
        : {}),
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      submit: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setOrderSuccess("");

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || items.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            address: form.address.trim(),
            landmark: form.landmark.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            pincode: form.pincode.trim(),
          },
          items: items.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
          paymentMethod: form.paymentMethod,
          utrNumber:
            form.paymentMethod === "upi"
              ? form.utrNumber.trim().replace(/\s/g, "")
              : undefined,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        const rawResponse = await response.text();

        console.error(
          "Order API returned a non-JSON response:",
          rawResponse.slice(0, 1000),
        );

        throw new Error(
          "Order server is unavailable right now. Please try again.",
        );
      }

      const result = (await response.json()) as OrderApiResponse;

      if (!response.ok || !result.success || !result.orderNumber) {
        throw new Error(
          result.error || "Unable to create your order. Please try again.",
        );
      }

      const confirmedTotal =
        typeof result.total === "number" ? result.total : total;

      const lastOrder = {
        orderId: result.orderNumber,
        databaseId: result.orderId ?? null,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          landmark: form.landmark.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
        },
        items: items.map((item) => ({
          slug: item.slug,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        deliveryCharge,
        total: confirmedTotal,
        paymentMethod: form.paymentMethod,
        paymentStatus:
          form.paymentMethod === "upi"
            ? "Payment Verification Pending"
            : "Cash on Delivery",
        utrNumber:
          form.paymentMethod === "upi"
            ? form.utrNumber.trim().replace(/\s/g, "")
            : null,
      };

      window.sessionStorage.setItem(
        "bd-ayurveda-last-order",
        JSON.stringify(lastOrder),
      );

      setOrderSuccess(
        `Your order ${result.orderNumber} has been placed successfully!`,
      );

      // Keep the cart on screen for a moment so the success message is visible.
      window.setTimeout(() => {
        clearCart();

        router.push(
          `/order-success?orderId=${encodeURIComponent(result.orderNumber!)}`,
        );
      }, 1200);
    } catch (error) {
      console.error("Unable to place order:", error);

      setErrors((current) => ({
        ...current,
        submit:
          error instanceof Error
            ? error.message
            : "Unable to place your order. Please try again.",
      }));

      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="site-container flex min-h-screen items-center justify-center py-16">
          <div className="max-w-xl text-center">
            <span className="eyebrow justify-center">Checkout</span>

            <h1 className="editorial-heading mt-4 text-[2.7rem] text-[var(--green-dark)] sm:text-5xl">
              Your cart is empty.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 sm:text-base">
              Add at least one product before continuing to checkout.
            </p>

            <Link
              href="/products"
              className="btn-primary mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white"
            >
              Explore Products
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24 lg:pb-0">
      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Secure checkout · UPI and Cash on Delivery
      </div>

      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#f8f5ed]/95 backdrop-blur-xl">
        <div className="site-container flex h-[72px] items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src="/logo/logo.png"
                alt="BD Ayurveda"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="min-w-0">
              <p className="brand-serif truncate text-[18px] font-bold leading-none text-[var(--green-dark)]">
                BD Ayurveda
              </p>

              <span className="mt-1 block truncate text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                Ancient care, modern life
              </span>
            </div>
          </Link>

          <Link
            href="/cart"
            className="btn-secondary inline-flex min-h-10 shrink-0 items-center justify-center rounded-full px-4 text-xs font-bold sm:px-5 sm:text-sm"
          >
            Back to Cart
          </Link>
        </div>
      </header>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-9 sm:py-14">
        <div className="site-container">
          <span className="eyebrow">Secure checkout</span>

          <h1 className="editorial-heading mt-4 text-[2.55rem] text-[var(--green-dark)] sm:text-5xl">
            Delivery and payment.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base">
            Enter your delivery details, choose a payment method and review
            your order before placing it.
          </p>
        </div>
      </section>

      <section className="section-space">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="site-container grid items-start gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10"
        >
          <div className="space-y-5">
            {/* Contact information */}
            <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-sm font-bold text-[var(--green)]">
                  1
                </span>

                <div>
                  <h2 className="brand-serif text-[1.45rem] font-bold text-[var(--green-dark)] sm:text-2xl">
                    Contact information
                  </h2>

                  <p className="mt-1 text-xs">
                    We will use these details for order updates.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    Full name *
                  </span>

                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    autoComplete="name"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.fullName && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.fullName}
                    </span>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    Mobile number *
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    autoComplete="tel"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.phone && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.phone}
                    </span>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    Email address
                  </span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    autoComplete="email"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.email && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>
            </section>

            {/* Delivery address */}
            <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-sm font-bold text-[var(--green)]">
                  2
                </span>

                <div>
                  <h2 className="brand-serif text-[1.45rem] font-bold text-[var(--green-dark)] sm:text-2xl">
                    Delivery address
                  </h2>

                  <p className="mt-1 text-xs">
                    Enter an address where someone can receive the order.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    Full address *
                  </span>

                  <textarea
                    rows={4}
                    value={form.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    autoComplete="street-address"
                    disabled={isSubmitting}
                    className="w-full resize-none rounded-[12px] border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.address && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.address}
                    </span>
                  )}
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    Landmark
                  </span>

                  <input
                    type="text"
                    value={form.landmark}
                    onChange={(event) =>
                      updateField("landmark", event.target.value)
                    }
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    City *
                  </span>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    autoComplete="address-level2"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.city && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.city}
                    </span>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    State *
                  </span>

                  <input
                    type="text"
                    value={form.state}
                    onChange={(event) =>
                      updateField("state", event.target.value)
                    }
                    autoComplete="address-level1"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.state && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.state}
                    </span>
                  )}
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                    PIN code *
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(event) =>
                      updateField(
                        "pincode",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    autoComplete="postal-code"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                  />

                  {errors.pincode && (
                    <span className="mt-1.5 block text-xs text-[#9b4747]">
                      {errors.pincode}
                    </span>
                  )}
                </label>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-sm font-bold text-[var(--green)]">
                  3
                </span>

                <div>
                  <h2 className="brand-serif text-[1.45rem] font-bold text-[var(--green-dark)] sm:text-2xl">
                    Payment method
                  </h2>

                  <p className="mt-1 text-xs">
                    Choose UPI or Cash on Delivery.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => updateField("paymentMethod", "upi")}
                  disabled={isSubmitting}
                  className={`rounded-[16px] border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    form.paymentMethod === "upi"
                      ? "border-[var(--green)] bg-[var(--green-soft)]/55 shadow-sm"
                      : "border-[var(--border)] bg-white hover:border-[var(--green)]/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[var(--green-dark)]">
                        UPI Payment
                      </p>
                      <p className="mt-1 text-xs">
                        Scan QR and submit your transaction reference.
                      </p>
                    </div>

                    {form.paymentMethod === "upi" && (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-white">
                        <CheckIcon />
                      </span>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField("paymentMethod", "cod")}
                  disabled={isSubmitting}
                  className={`rounded-[16px] border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    form.paymentMethod === "cod"
                      ? "border-[var(--green)] bg-[var(--green-soft)]/55 shadow-sm"
                      : "border-[var(--border)] bg-white hover:border-[var(--green)]/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[var(--green-dark)]">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-xs">
                        Pay when the order reaches you.
                      </p>
                    </div>

                    {form.paymentMethod === "cod" && (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-white">
                        <CheckIcon />
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {form.paymentMethod === "upi" && (
                <div className="mt-5 rounded-[18px] border border-[var(--border)] bg-[#f7f4ed] p-4 sm:p-6">
                  <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
                    <div className="mx-auto w-full max-w-[180px] overflow-hidden rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-sm">
                      <img
                        src="/payment/upi-qr.webp"
                        alt="BD Ayurveda UPI payment QR code"
                        className="aspect-square h-auto w-full object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--gold)]">
                        Pay exactly
                      </p>

                      <p className="mt-1 text-3xl font-extrabold text-[var(--green-dark)]">
                        ₹{total}
                      </p>

                      <p className="mt-3 text-sm leading-6">
                        Scan using Google Pay, PhonePe, Paytm, BHIM or any UPI
                        app.
                      </p>

                      <div className="mt-3 rounded-[12px] bg-white px-4 py-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                          UPI ID
                        </p>

                        <p className="mt-1 break-all text-sm font-bold text-[var(--green-dark)]">
                          {BUSINESS_UPI_ID}
                        </p>
                      </div>
                    </div>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-xs font-bold text-[var(--green-dark)]">
                      UTR / Transaction Reference *
                    </span>

                    <input
                      type="text"
                      inputMode="text"
                      maxLength={24}
                      placeholder="Enter the reference shown in your UPI app"
                      value={form.utrNumber}
                      onChange={(event) =>
                        updateField(
                          "utrNumber",
                          event.target.value
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .toUpperCase(),
                        )
                      }
                      disabled={isSubmitting}
                      className="h-12 w-full rounded-[12px] border border-[var(--border)] bg-white px-4 text-sm uppercase outline-none transition placeholder:normal-case focus:border-[var(--green)] focus:shadow-sm disabled:opacity-70"
                    />

                    {errors.utrNumber && (
                      <span className="mt-1.5 block text-xs text-[#9b4747]">
                        {errors.utrNumber}
                      </span>
                    )}
                  </label>

                  <div className="mt-4 rounded-[12px] border border-[var(--gold)]/25 bg-[var(--gold-soft)]/30 p-4">
                    <p className="text-xs leading-5 text-[var(--text)]">
                      After submission, your payment status will be{" "}
                      <strong>Verification Pending</strong> until the UTR is
                      matched with the received payment.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Order summary */}
          <aside className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-small)] sm:p-7 lg:sticky lg:top-[104px]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="brand-serif text-[1.45rem] font-bold text-[var(--green-dark)] sm:text-2xl">
                Order summary
              </h2>

              <span className="text-xs font-bold text-[var(--muted)]">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px] bg-[#f1eee6] p-1.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--green)] px-1 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-bold leading-5 text-[var(--green-dark)]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-[var(--green-dark)]">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-y border-[var(--border)] py-5 text-sm">
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

            <div className="flex items-end justify-between gap-4 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                  Total
                </p>

                <p className="mt-1 text-[10px]">
                  Inclusive of applicable taxes
                </p>
              </div>

              <p className="text-3xl font-extrabold text-[var(--green-dark)]">
                ₹{total}
              </p>
            </div>

            {errors.submit && (
              <div
                role="alert"
                className="mb-4 rounded-[12px] border border-[#d9aaaa] bg-[#fff3f3] p-3 text-xs leading-5 text-[#8f3838]"
              >
                {errors.submit}
              </div>
            )}

            {orderSuccess && (
              <div
                role="status"
                className="mb-4 rounded-[14px] border border-[var(--green)]/20 bg-[var(--green-soft)] p-4"
              >
                <p className="text-center text-sm font-bold text-[var(--green-dark)]">
                  ✓ {orderSuccess}
                </p>

                <p className="mt-1 text-center text-[10px] text-[var(--muted)]">
                  Redirecting to your order confirmation…
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? orderSuccess
                  ? "Order Placed ✓"
                  : "Placing Order..."
                : form.paymentMethod === "upi"
                  ? "Submit Paid Order"
                  : "Place COD Order"}

              {!isSubmitting && <ArrowIcon />}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-[var(--muted)]">
              Product prices and totals are recalculated securely on the
              server before the order is saved.
            </p>
          </aside>
        </form>
      </section>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(37,48,42,0.10)] backdrop-blur-xl lg:hidden">
        <div className="site-container flex items-center gap-3">
          <div className="min-w-[88px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
              Total
            </p>

            <p className="text-lg font-extrabold text-[var(--green-dark)]">
              ₹{total}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              document.querySelector("form")?.requestSubmit();
            }}
            disabled={isSubmitting}
            className="btn-primary flex min-h-12 flex-1 items-center justify-center rounded-full px-5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? orderSuccess
                ? "Order Placed ✓"
                : "Placing..."
              : form.paymentMethod === "upi"
                ? "Submit Paid Order"
                : "Place COD Order"}
          </button>
        </div>
      </div>
    </main>
  );
}