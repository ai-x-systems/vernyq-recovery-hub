"use client";

import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product, quantity)}
      disabled={!product.inStock}
      className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add to Cart — {formatPrice(product.price * quantity)}
    </button>
  );
}
