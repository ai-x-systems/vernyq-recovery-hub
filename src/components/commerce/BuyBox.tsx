import { useState } from "react";
import { Check, Truck, Shield, Package, Plus, Minus } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface BuyBoxProps {
  product: Product;
  /** Highlight key verified capabilities above the CTA. */
  highlights?: string[];
}

/**
 * Purchase panel: price, availability, quantity selector, add-to-cart,
 * key capabilities, and shipping/warranty trust row. Internal inventory
 * counts are never shown — only the derived availability label.
 */
export function BuyBox({ product, highlights }: BuyBoxProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const available = product.inStock;

  const statusDot =
    product.stockStatus === "sold_out" || product.stockStatus === "unavailable"
      ? "bg-[#c4544a]"
      : product.stockStatus === "preorder"
        ? "bg-[#b8923e]"
        : "bg-[#4a8a5c]";

  return (
    <div>
      {product.badge && (
        <span className="inline-block px-3 py-1 bg-[#0084FF]/10 text-[#0084FF] text-caption font-medium rounded-[0.25rem] mb-3">
          {product.badge}
        </span>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-price text-[#0A182E]">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-body text-[#888888] line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </div>
      <p className="text-caption text-[#888888] mt-1">Freight shipping included · Payment processed after order review</p>

      {/* Availability — status only, never internal counts */}
      <div className="flex items-center gap-2 mt-5">
        <span aria-hidden="true" className={`size-2 rounded-full ${statusDot}`} />
        <span className={`text-body-sm ${available ? "text-[#4a8a5c]" : "text-[#c4544a]"}`}>
          {product.availabilityLabel}
        </span>
      </div>

      {/* Key capabilities */}
      {highlights && highlights.length > 0 && (
        <ul className="mt-6 space-y-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <Check className="size-4 text-[#0084FF] shrink-0" aria-hidden="true" />
              <span className="text-body-sm text-[#555555]">{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Purchase controls */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-4">
          <label htmlFor={`qty-${product.id}`} className="text-body-sm font-medium text-[#0A182E]">
            Quantity
          </label>
          <div className="flex items-center border border-[#e0ddd8] rounded-[0.375rem]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-10 h-10 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors disabled:opacity-40"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span
              id={`qty-${product.id}`}
              aria-live="polite"
              className="w-10 h-10 flex items-center justify-center text-body-sm font-medium text-[#0A182E] border-x border-[#e0ddd8]"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="w-10 h-10 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, quantity)}
          disabled={!available}
          className="w-full h-12 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {available ? `Add to Cart — ${formatPrice(product.price * quantity)}` : product.availabilityLabel}
        </button>
      </div>

      {/* Trust row */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          { icon: Truck, label: `Dispatch in ~3 business days` },
          { icon: Package, label: "Delivery in ~1 week" },
          { icon: Shield, label: `${product.warranty.duration} warranty` },
          { icon: Check, label: "Free freight shipping" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-caption text-[#888888]">
            <item.icon className="size-4 text-[#0084FF] shrink-0" aria-hidden="true" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
