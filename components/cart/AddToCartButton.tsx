"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  product: {
    slug: string;
    name: string;
    cover: string;
    price: number;
    originalPrice?: number;
  };
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (added) return;

    addItem({
      slug: product.slug,
      name: product.name,
      image: product.cover,
      price: product.price,
      originalPrice: product.originalPrice,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={added}
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold transition ${
        added
          ? "border border-[var(--green)] bg-[var(--green-soft)] text-[var(--green-dark)]"
          : "btn-secondary"
      }`}
    >
      {added ? (
        <>
          <span>✓</span>
          Added to Cart
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}