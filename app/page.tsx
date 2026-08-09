"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import HeroSlider from "@/components/home/HeroSlider";

const products = [

  {
    name: "Arshavinashak Syrup",
    shortName: "Arshavinashak",
    slug: "arshvinashak",
    category: "Digestive Wellness",
    image: "/products/arshvinashak/cover.webp",
    price: 449,
    originalPrice: 499,
    badge: "Ayurvedic",
    tone: "#f7f0e5",
  },
  {
    name: "Advanced Hair Care Oil",
    shortName: "Hair Care Oil",
    slug: "hair-growth-oil",
    category: "Hair Wellness",
    image: "/products/hair-growth-oil/cover.webp",
    price: 249,
    originalPrice: 399,
    badge: "Bestseller",
    tone: "#edf3ee",
  },
  {
    name: "Advanced Hair Care Serum",
    shortName: "Hair Care Serum",
    slug: "hair-growth-serum",
    category: "Hair Wellness",
    image: "/products/hair-growth-serum/cover.webp",
    price: 499,
    originalPrice: 549,
    badge: "Popular",
    tone: "#f1f4ef",
  },
  {
    name: "Pneumona Powder",
    shortName: "Pneumona Powder",
    slug: "pneumona-powder",
    category: "Respiratory Care",
    image: "/products/pneumona-powder/cover.webp",
    price: 1499,
    originalPrice: 1599,
    badge: "Herbal",
    tone: "#eef5f1",
  },
  {
    name: "Age Revert Pro Capsules",
    shortName: "Age Revert Pro",
    slug: "age-revert-pro",
    category: "Healthy Ageing",
    image: "/products/age-revert-pro/cover.webp",
    price: 1449,
    originalPrice: 1799,
    badge: "Premium",
    tone: "#f5f1e8",
  },
  
  {
    name: "Tulsipreet Cough Syrup",
    shortName: "Tulsipreet Syrup",
    slug: "cough-syrup",
    category: "Seasonal Wellness",
    image: "/products/cough-syrup/cover.webp",
    price: 90,
    originalPrice: 249,
    badge: "Family Care",
    tone: "#eef3ea",
  },
];

const concerns = [
  {
    title: "Hair Care",
    subtitle: "Oil and serum for everyday hair wellness",
    image: "/ingredients/bhringraj.webp",
    href: "/products/hair-growth-oil",
  },
  {
    title: "Respiratory Care",
    subtitle: "Traditional support for seasonal wellness",
    image: "/ingredients/tulsi.webp",
    href: "/products/pneumona-powder",
  },
  {
    title: "Digestive Care",
    subtitle: "Ayurvedic care for digestive comfort",
    image: "/ingredients/giloy.webp",
    href: "/products/arshvinashak",
  },
  {
    title: "Healthy Ageing",
    subtitle: "Daily vitality and graceful ageing support",
    image: "/ingredients/amla.webp",
    href: "/products/age-revert-pro",
  },
];

const ingredients = [
  {
    name: "Amla",
    image: "/ingredients/amla.webp",
    text: "Traditionally valued for hair strength and vitality.",
  },
  {
    name: "Bhringraj",
    image: "/ingredients/bhringraj.webp",
    text: "A celebrated Ayurvedic herb for scalp and hair care.",
  },
  {
    name: "Tulsi",
    image: "/ingredients/tulsi.webp",
    text: "Used traditionally for respiratory and seasonal wellness.",
  },
  {
    name: "Neem",
    image: "/ingredients/neem.webp",
    text: "Known for its naturally cleansing and purifying properties.",
  },
  {
    name: "Giloy",
    image: "/ingredients/giloy.webp",
    text: "Traditionally associated with immunity and everyday wellness.",
  },
  {
    name: "Honey",
    image: "/ingredients/honey.webp",
    text: "A naturally soothing ingredient used across herbal traditions.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Nagpur",
    product: "Hair Care Oil",
    review:
      "The oil feels nourishing without being excessively sticky. The packaging also feels much more premium than typical herbal products.",
  },
  {
    name: "Neha Patil",
    city: "Pune",
    product: "Tulsipreet Syrup",
    review:
      "I liked its soothing herbal taste and clear usage instructions. The overall buying experience felt simple and trustworthy.",
  },
  {
    name: "Rohit Verma",
    city: "Mumbai",
    product: "Age Revert Pro",
    review:
      "The presentation is clean and professional. Delivery was smooth and the product was properly packed.",
  },
];

const faqs = [
  {
    question: "Are all BD Ayurveda products Ayurvedic?",
    answer:
      "Our products are developed using Ayurvedic ingredients and traditional wellness principles. Please review the ingredient list and directions provided on the individual product page.",
  },
  {
    question: "How can I choose the right product?",
    answer:
      "Browse products by concern or read the intended-use information on each product page. For medical conditions, pregnancy, ongoing medication or specific health concerns, consult a qualified healthcare professional before use.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Orders are generally delivered within 4 to 7 working days, depending on your location and courier availability.",
  },
  {
    question: "Can I order products through WhatsApp?",
    answer:
      "Yes. You can contact the BD Ayurveda team using the WhatsApp button for product questions and assisted ordering.",
  },
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
      width="20"
      height="20"
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

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 5h2l2 10h9l2-7H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.2" fill="currentColor" />
      <circle cx="17" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.5 4.5C13 4.5 7.5 7 6 12.5c-.8 3 1 5.5 4 5.5 5.5 0 8.5-5.5 9.5-13.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 20c2-5 5-8 10-11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3 5.5 6v5.5c0 4.2 2.7 7.7 6.5 9.5 3.8-1.8 6.5-5.3 6.5-9.5V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12 1.8 1.8 3.8-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndiaIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3 14 6l3 .8-1 3 2 2.5-3 1.7-.5 4-2.5 3-2.5-3-.5-4-3-1.7L8 9.8l-1-3L10 6l2-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      aria-hidden="true"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12a7 7 0 0 1 14 0v5a2 2 0 0 1-2 2h-2v-6h4M5 13H3v4a2 2 0 0 0 2 2h2v-6H5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19c-.7 1.1-1.7 1.7-3 1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L3 9.4l6.2-.9L12 2.8Z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const { cartCount } = useCart();

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)]">
      {/* Announcement */}

      <div className="bg-[var(--green)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
        Free delivery on selected orders across India
      </div>

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#f8f5ed]/90  backdrop-blur-xl">
        <div className="site-container flex h-[72px] items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src="logos/logo.png"
                alt="BD Ayurveda"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate brand-serif text-[18px] font-bold leading-none text-[var(--green-dark)]">
                BD Ayurveda
              </p>
              <span className="mt-1 block truncate text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                Ancient care, modern life
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--text)] lg:flex">
  <Link
    href="/"
    className="relative py-2 text-[var(--green)] after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-[var(--green)]"
  >
    Home
  </Link>

  <Link
    href="/products"
    className="py-2 transition hover:text-[var(--green)]"
  >
    Products
  </Link>

  <Link
    href="#ingredients"
    className="py-2 transition hover:text-[var(--green)]"
  >
    Ingredients
  </Link>

  <Link
    href="/about"
    className="py-2 transition hover:text-[var(--green)]"
  >
    Our Story
  </Link>

  <Link
    href="/contact"
    className="py-2 transition hover:text-[var(--green)]"
  >
    Contact
  </Link>
</nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/products"
              aria-label="Search products"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm sm:flex"
            >
              <SearchIcon />
            </Link>

            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[8px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <details className="mobile-menu relative lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-white">
                <span className="sr-only">Open navigation</span>
                <MenuIcon />
              </summary>

              <div className="mobile-menu-panel absolute right-0 top-12 w-[285px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-medium)]">
                <nav className="flex flex-col">
                  {[
                    ["Home", "/"],
                    ["All Products", "/products"],
                    ["Shop by Concern", "#concerns"],
                    ["Ingredients", "#ingredients"],
                    ["Our Story", "/about"],
                    ["Contact", "/contact"],
                    ["Your Cart", "/cart"],
                  ].map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      className="rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-[var(--surface-soft)]"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </details>
          </div>
        </div>
      </header>

      <HeroSlider />

      {/* Trust strip */}

      <section className="relative z-20 border-y border-[var(--border)] bg-white py-0">
        <div className="site-container grid grid-cols-2 md:grid-cols-4">
          {[
            {
              title: "Ayurvedic",
              subtitle: "Purposeful formulations",
              icon: <LeafIcon />,
            },
            {
              title: "Made in India",
              subtitle: "Created with care",
              icon: <IndiaIcon />,
            },
            {
              title: "Quality Focused",
              subtitle: "Clear product information",
              icon: <ShieldIcon />,
            },
            {
              title: "Personal Support",
              subtitle: "Assistance through WhatsApp",
              icon: <SupportIcon />,
            },
          ].map((item, index) => (
            <div
  key={item.title}
  className={`group flex min-h-[118px] items-center gap-4 px-4 py-5 transition duration-300 hover:bg-[#faf8f2] sm:justify-center sm:px-5 ${
    index % 2 === 0 ? "border-r border-[var(--border)]" : ""
  } ${
    index < 2 ? "border-b border-[var(--border)] md:border-b-0" : ""
  } ${index === 1 ? "md:border-r" : ""} ${
    index === 2 ? "md:border-r" : ""
  }`}
>
  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--green)] group-hover:text-white [&>svg]:h-[30px] [&>svg]:w-[30px]">
    {item.icon}
  </span>

  <div>
    <p className="text-xs font-bold text-[var(--green-dark)] sm:text-sm">
      {item.title}
    </p>

    <p className="mt-1.5 text-[9px] leading-4 sm:text-[10px]">
      {item.subtitle}
    </p>
  </div>
</div>
          ))}
        </div>
      </section>

      {/* Featured product */}

      <section className="section-space bg-[var(--surface-sage)]">
  <div className="site-container">
    <div className="grid overflow-hidden rounded-[28px] border border-[var(--border)] bg-[#f7f5ef] shadow-[var(--shadow-small)] lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative min-h-[400px] overflow-hidden bg-[#eef2eb] sm:min-h-[540px]">
        <img
          src="/products/hair-growth-oil/cover.webp"
          alt="BD Ayurveda Advanced Hair Care Oil"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.025]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

        
      </div>

      <div className="flex items-center px-6 py-11 sm:p-12 lg:p-16">
        <div className="max-w-lg">
          <span className="eyebrow">Hair wellness</span>

          <h2 className="editorial-heading mt-4 text-[2.55rem] leading-[1.02] text-[var(--green-dark)] sm:text-5xl">
            Advanced Hair Care Oil
          </h2>

          <p className="mt-5 text-sm leading-7 sm:text-base">
            A thoughtfully formulated Ayurvedic hair oil created to support
            scalp nourishment and healthier-looking hair as part of a regular
            wellness routine.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-extrabold text-[var(--green-dark)]">
              ₹499
            </span>

            <span className="text-sm text-[var(--muted)] line-through">
              ₹599
            </span>

            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[var(--green)] shadow-sm">
              Save ₹100
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products/hair-growth-oil"
              className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white"
            >
              Shop Hair Care Oil
              <ArrowIcon />
            </Link>

            <Link
              href="/products/hair-growth-oil"
              className="btn-secondary inline-flex min-h-14 items-center justify-center rounded-full px-8 text-sm font-bold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Shop by concern */}

      <section id="concerns" className="section-space bg-white">
        <div className="site-container">
          <div className="max-w-2xl">
            <span className="eyebrow">Shop by concern</span>

            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Find care that fits your routine.
            </h2>

            <p className="mt-4 max-w-xl text-sm sm:text-base">
              Start with the wellness area that matters most to you.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {concerns.map((concern) => (
              <Link
                key={concern.title}
                href={concern.href}
                className="group overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--green)]/30 hover:shadow-[0_18px_42px_rgba(37,48,42,0.10)]"
              >
                <div className="aspect-[4/3.5] overflow-hidden bg-[var(--surface-sage)]">
                  <img
                    src={concern.image}
                    alt={concern.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                  <h3 className="text-sm font-bold text-[var(--green-dark)] sm:text-lg">
                    {concern.title}
                  </h3>

                  <p className="mt-1.5 hidden text-xs leading-5 sm:block">
                    {concern.subtitle}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--gold)] sm:text-xs">
                    Explore
                    <ArrowIcon size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product collection */}

      <section
        id="shop"
        className="section-space border-y border-[var(--border)] bg-[#f6f3ec]"
      >
        <div className="site-container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Our collection</span>

              <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
                Six purposeful formulations.
              </h2>

              <p className="mt-4 max-w-xl text-sm sm:text-base">
                A carefully focused collection instead of an overwhelming
                catalogue.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-bold text-[var(--green)] sm:flex"
            >
              View all products
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--green)]/30 hover:shadow-[0_18px_42px_rgba(37,48,42,0.10)]"
                        >
                <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
                  <div
                   className="relative aspect-square overflow-hidden p-1.5 sm:p-3"
                   style={{ backgroundColor: product.tone }}
                      >
                    

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full scale-[1.04] object-contain transition duration-500 group-hover:scale-[1.09]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3.5 sm:p-5">
  <div className="mb-2 flex flex-wrap items-center gap-2">
    <span className="rounded-full bg-[var(--green-soft)] px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.09em] text-[var(--green)] sm:text-[9px]">
      {product.badge}
    </span>
  </div>

  <p className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-[var(--gold)] sm:text-[10px]">
    {product.category}
  </p>

                    <h3 className="mt-1 min-h-[36px] text-[14px] font-bold leading-[1.2] text-[var(--green-dark)] sm:min-h-[46px] sm:text-xl">
  {product.shortName}
</h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
  <span className="text-[17px] font-extrabold text-[var(--green-dark)] sm:text-xl">
    ₹{product.price}
  </span>

  <span className="text-[10px] text-[var(--muted)] line-through sm:text-xs">
    ₹{product.originalPrice}
  </span>

  <span className="rounded-full bg-[var(--green-soft)] px-2 py-1 text-[8px] font-bold text-[var(--green)] sm:text-[9px]">
    Save ₹{product.originalPrice - product.price}
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
            ))}
          </div>

          <Link
            href="/products"
            className="btn-secondary mt-7 flex min-h-14 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold sm:hidden"
          >
            View All Products
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Brand promises */}

      <section className="section-space bg-[var(--surface-sage)]">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Why BD Ayurveda</span>

            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Traditional thinking, presented with clarity.
            </h2>

            <p className="mt-4 text-sm sm:text-base">
              Our approach is simple: focused products, understandable
              information and a better everyday experience.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 border-y border-[var(--border)] lg:grid-cols-4">
            {[
              {
                icon: <LeafIcon />,
                title: "Thoughtful Formulations",
                text: "Focused products for specific everyday wellness needs.",
              },
              {
                icon: <ShieldIcon />,
                title: "Quality-Conscious",
                text: "Carefully selected ingredients and clear product information.",
              },
              {
                icon: <IndiaIcon />,
                title: "Made in India",
                text: "Inspired by traditional Indian wellness practices.",
              },
              {
                icon: <SupportIcon />,
                title: "Personal Assistance",
                text: "Product questions and ordering support through WhatsApp.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`group px-4 py-9 text-center sm:px-7 sm:py-11 ${
                  index % 2 === 0 ? "border-r border-[var(--border)]" : ""
                } ${
                  index < 2 ? "border-b border-[var(--border)] lg:border-b-0" : ""
                } ${
                  index === 1 ? "lg:border-r" : ""
                } ${
                  index === 2 ? "lg:border-r" : ""
                }`}
              >
                <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--green)] group-hover:text-white [&>svg]:h-8 [&>svg]:w-8">
  {item.icon}
</div>

                <h3 className="mt-4 text-[13px] font-extrabold text-[var(--green-dark)] sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-2 hidden text-xs leading-5 sm:block">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}

      <section id="ingredients" className="section-space bg-[var(--background)]">
        <div className="site-container">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="eyebrow">Ingredient philosophy</span>

              <h2 className="editorial-heading mt-4 max-w-2xl text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
                Familiar herbs, thoughtfully selected.
              </h2>

              <p className="mt-4 max-w-xl text-sm sm:text-base">
                Inspired by ingredients that have remained part of Indian
                wellness traditions for generations.
              </p>
            </div>

            <p className="hidden max-w-xs text-sm lg:block">
              Ingredient use differs by product. Visit an individual product
              page to review its complete formulation.
            </p>
          </div>

          <div className="horizontal-scroll -mx-3 mt-9 flex gap-4 overflow-x-auto px-3 pb-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {ingredients.map((ingredient) => (
              <article
  key={ingredient.name}
  className="group min-w-[158px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-3.5 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[var(--green)]/30 hover:shadow-[0_18px_42px_rgba(37,48,42,0.10)] sm:min-w-0"
>
  <div className="mx-auto aspect-square overflow-hidden rounded-full bg-[var(--surface-sage)] shadow-[0_8px_22px_rgba(37,48,42,0.08)]">
    <img
      src={ingredient.image}
      alt={ingredient.name}
      className="h-full w-full scale-[1.02] object-cover transition duration-500 group-hover:scale-[1.08]"
    />
  </div>

  <h3 className="mt-4 brand-serif text-xl font-bold text-[var(--green-dark)]">
    {ingredient.name}
  </h3>

  <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 sm:leading-5">
  {ingredient.text}
</p>
</article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}

      <section className="section-space border-y border-[var(--border)] bg-white">
        <div className="site-container grid overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-[var(--shadow-small)] lg:grid-cols-2">
          <div className="relative min-h-[290px] overflow-hidden bg-[var(--surface-soft)] sm:min-h-[470px]">
            <img
              src="/banners/brand-story.webp"
              alt="BD Ayurveda natural wellness philosophy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center px-6 py-10 sm:p-12 lg:p-16">
            <div>
              <span className="eyebrow">Our story</span>

              <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
                A modern home for Indian wellness traditions.
              </h2>

              <p className="mt-6 text-sm sm:text-base">
                BD Ayurveda was created to make Ayurvedic wellness feel more
                understandable, refined and relevant for modern families.
              </p>

              <p className="mt-4 text-sm sm:text-base">
                Rather than offering a confusing catalogue of similar products,
                we focus on six purposeful formulations across hair,
                respiratory, digestive and healthy-ageing care.
              </p>

              <Link
                href="/about"
                className="btn-text mt-7 inline-flex items-center gap-2 text-sm font-bold"
              >
                Read the BD Ayurveda story
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}

      <section className="section-space bg-[#f6f3ec]">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Customer experiences</span>

            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Wellness that fits real routines.
            </h2>
          </div>

          <div className="horizontal-scroll -mx-3 mt-9 flex snap-x gap-4 overflow-x-auto px-3 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
            {testimonials.map((testimonial) => (
              <article
  key={testimonial.name}
  className="group min-w-[88%] snap-center rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--green)]/25 hover:shadow-[var(--shadow-small)] sm:min-w-0"
>
  <div className="flex items-center justify-between gap-3">
    <div className="flex gap-1 text-[var(--gold)]">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </div>

    <span className="rounded-full bg-[var(--green-soft)] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--green)]">
      Verified purchase
    </span>
  </div>

  <p className="mt-5 text-[15px] leading-[1.85] text-[var(--text)]">
    “{testimonial.review}”
  </p>

  <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green-soft)] font-bold text-[var(--green)]">
      {testimonial.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)}
    </div>

    <div>
      <p className="text-[15px] font-bold text-[var(--green-dark)]">
        {testimonial.name}
      </p>

      <p className="mt-1 text-[10px]">
        {testimonial.city} · {testimonial.product}
      </p>
    </div>
  </div>
</article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="section-space border-y border-[var(--border)] bg-white">
        <div className="site-container grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <span className="eyebrow">Questions answered</span>

            <h2 className="editorial-heading mt-4 text-[2.25rem] text-[var(--green-dark)] sm:text-5xl">
              Everything you may want to know.
            </h2>

            <p className="mt-4 max-w-md text-sm sm:text-base">
              Need more help? Contact our team for product information and
              assisted ordering.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--green)]"
            >
              Contact our team
              <ArrowIcon />
            </Link>
          </div>

          <div className="border-t border-[var(--border)]">
            {faqs.map((faq) => (
              <details
  key={faq.question}
  className="faq-item group border-b border-[var(--border)] transition hover:bg-white/60"
>
  <summary className="flex cursor-pointer items-center justify-between gap-5 px-2 py-6 sm:px-4">
    <span className="text-[15px] font-bold text-[var(--green-dark)] sm:text-[17px]">
      {faq.question}
    </span>

            <span className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--green-soft)] text-[var(--green)] transition duration-300 group-hover:bg-[var(--green)] group-hover:text-white">
         <ChevronIcon />
         </span>
          </summary>

  <div className="faq-answer">
    <p className="max-w-2xl px-2 pb-6 pr-12 text-sm sm:px-4">
      {faq.answer}
    </p>
  </div>
</details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}

      <section className="section-space bg-[var(--background)]">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[24px] bg-[var(--surface-sage)] px-6 py-14 text-center sm:px-12 sm:py-[72px]">
            <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full border border-[var(--green)]/10" />

            <div className="absolute -bottom-24 -right-14 h-64 w-64 rounded-full border border-[var(--green)]/10" />

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow justify-center">
                Begin your wellness journey
              </span>

              <h2 className="editorial-heading mt-4 text-[2.4rem] text-[var(--green-dark)] sm:text-5xl">
                Discover Ayurveda made simpler.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base">
                Explore the full collection and find a product suited to your
                everyday wellness routine.
              </p>

              <Link
                href="/products"
                className="btn-primary mt-8 inline-flex min-h-[56px] min-w-[190px] items-center justify-center gap-2 rounded-full px-10 text-sm font-bold text-white"
              >
                Shop All Products
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* Footer */}

<footer className="bg-[#3F5F4D] text-white">
  <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
    {/* Brand */}
    <div className="sm:col-span-2 lg:col-span-1">
      <div className="flex items-center gap-3.5">
        <div className="flex items-center">
  <img
    src="logos/logo-white.png"
    alt="BD Ayurveda"
    className="h-14 w-auto object-contain"
  />
</div>

        <div>
          <p className="brand-serif text-xl font-semibold text-white">
            BD Ayurveda
          </p>

          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/75">
            Ancient care, modern life
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-sm text-[15px] leading-7 text-white">
        Thoughtfully presented Ayurvedic wellness products for modern Indian
        families.
      </p>
    </div>

    {/* Shop */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        Shop
      </p>

      <nav className="mt-5 flex flex-col gap-3 text-[15px] text-white/90">
        <Link
          href="/products"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          All Products
        </Link>

        <Link
          href="/products/hair-growth-oil"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Hair Care
        </Link>

        <Link
          href="/products/pneumona-powder"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Respiratory Wellness
        </Link>

        <Link
          href="/products/arshvinashak"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Digestive Wellness
        </Link>
      </nav>
    </div>

    {/* Information */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        Information
      </p>

      <nav className="mt-5 flex flex-col gap-3 text-[15px] text-white/90">
        <Link
          href="/about"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Contact
        </Link>

        <Link
          href="/privacy-policy"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Terms and Conditions
        </Link>

        <Link
          href="/shipping-policy"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Shipping Policy
        </Link>

        <Link
          href="/refund-policy"
          className="transition duration-200 hover:text-[#d7bd86]"
        >
          Refund Policy
        </Link>
      </nav>
    </div>

    {/* Contact */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        Contact
      </p>

      <div className="mt-5 space-y-4 text-[15px] text-white/90">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-white/75">📍</span>

          <p className="text-white/90">
            Nagpur, Maharashtra, India
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-white/75">✉</span>

          <a
            href="mailto:support@bdayurveda.com"
            className="break-all font-medium text-white transition duration-200 hover:text-[#d7bd86]"
          >
            support@bdayurveda.com
          </a>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-white/75">💬</span>

          <a
            href="https://wa.me/919921678539"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white transition duration-200 hover:text-[#d7bd86]"
          >
            WhatsApp Support
          </a>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-white/75">🕒</span>

          <p className="text-white/80">
            Monday–Saturday, 10 AM–7 PM
          </p>
        </div>
      </div>

      {/* Social */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-4 text-xs font-bold text-white transition duration-200 hover:border-[#d7bd86] hover:text-[#d7bd86]"
        >
          Instagram
        </a>

        <a
          href="#"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-4 text-xs font-bold text-white transition duration-200 hover:border-[#d7bd86] hover:text-[#d7bd86]"
        >
          Facebook
        </a>
      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="border-t border-white/15">
    <div className="site-container flex flex-col gap-3 py-6 text-center text-[11px] leading-5 text-white/70 sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <p className="text-white/70">
        © {new Date().getFullYear()} BD Ayurveda. All rights reserved.
      </p>

      <p className="max-w-xl text-white/70">
        Products are not intended to diagnose, treat, cure or prevent disease.
      </p>
    </div>
  </div>
</footer>

      {/* WhatsApp */}

      <a
        href="https://wa.me/919921678539?text=Hello%20BD%20Ayurveda%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
        target="_blank"
        rel="noreferrer"
        aria-label="Contact BD Ayurveda on WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:scale-105 sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2a9.84 9.84 0 0 0-8.48 14.8L2 22l5.34-1.5A9.98 9.98 0 1 0 12.04 2Zm0 17.96a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.17.89.85-3.08-.2-.32A8.05 8.05 0 1 1 12.04 19.96Zm4.42-6.02c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
    </main>
  );
}