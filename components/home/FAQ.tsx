"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/layout/Container";

const faqs = [
  {
    question: "Are BD Ayurved products made using Ayurvedic ingredients?",
    answer:
      "Our formulations are inspired by Ayurvedic principles and carefully selected herbal ingredients. Product details are provided on each product page.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 3–7 business days depending on your location.",
  },
  {
    question: "How can I contact BD Ayurved?",
    answer:
      "You can reach us through WhatsApp, phone, or email. Our support team will be happy to help you.",
  },
  {
    question: "How should I use the products?",
    answer:
      "Usage instructions are included on the product label and will also be available on each product page.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes, we aim to deliver our products across India through trusted courier partners.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Everything You Need to Know
          </h2>

          <p className="mt-4 text-gray-600">
            Find answers to common questions about our products, delivery and
            customer support.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF8]"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >
                  <span className="text-lg font-semibold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-7 text-gray-600 leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}