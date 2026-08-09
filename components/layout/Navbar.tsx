"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Phone,
} from "lucide-react";

import Container from "./Container";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#story" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E2D8] bg-[#F8F5EE]/95 backdrop-blur-xl">

        <Container>

          <div className="flex h-[64px] md:h-[74px] items-center justify-between">

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#315243] text-white font-bold text-base md:text-lg shadow-md">
                BD
              </div>

              <div>

                <h2 className="text-[18px] md:text-[24px] font-bold leading-none text-[#315243]">
                  BD Ayurved
                </h2>

                <p className="hidden md:block text-[11px] tracking-[3px] uppercase text-[#B88A44]">
                  Premium Wellness
                </p>

              </div>

            </Link>

            {/* Desktop */}

            <nav className="hidden lg:flex items-center gap-9">

              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[15px] font-medium transition hover:text-[#315243]"
                >
                  {item.name}
                </Link>
              ))}

            </nav>

            {/* Right */}

            <div className="hidden lg:flex items-center gap-4">

              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 rounded-full border border-[#DCD4C7] px-5 py-3 hover:bg-white transition"
              >
                <Phone size={18} />
                <span className="text-sm font-medium">
                  Contact
                </span>
              </a>

              <button className="rounded-full bg-[#315243] p-3 text-white hover:bg-[#274337] transition shadow-lg">
                <ShoppingBag size={20} />
              </button>

            </div>

            {/* Mobile */}

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden rounded-full bg-[#315243] p-2.5 text-white"
            >
              <Menu size={22} />
            </button>

          </div>

        </Container>

      </header>

      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        <div
          className={`absolute right-0 top-0 h-full w-[78%] max-w-[320px] bg-white transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >

          <div className="flex items-center justify-between border-b p-5">

            <h2 className="text-xl font-bold text-[#315243]">
              BD Ayurved
            </h2>

            <button
              onClick={() => setOpen(false)}
            >
              <X />
            </button>

          </div>

          <div className="flex flex-col">

            {links.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b px-6 py-4 text-[17px] font-medium hover:bg-[#F8F5EE]"
              >
                {item.name}
              </Link>

            ))}

          </div>

          <div className="p-6">

            <a
              href="https://wa.me/919999999999"
              className="flex h-11 items-center justify-center rounded-full bg-[#315243] text-white font-semibold"
            >
              Contact on WhatsApp
            </a>

          </div>

        </div>

      </div>
    </>
  );
}