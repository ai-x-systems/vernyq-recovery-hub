"use client";

import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={closeCart} />
      <div className="absolute top-0 right-0 h-full w-full max-w-[440px] bg-[#faf9f7] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0ddd8]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="size-5 text-[#0A182E]" />
            <h2 className="text-h3">Cart</h2>
            <span className="text-body-sm text-[#888888]">({itemCount})</span>
          </div>
          <button onClick={closeCart} className="p-2 text-[#555555] hover:text-[#0A182E] transition-colors" aria-label="Close cart">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag className="size-12 text-[#e0ddd8] mb-4" />
              <p className="text-h3 mb-2">Your cart is empty</p>
              <p className="text-body-sm text-[#888888] mb-6">Explore our cold plunge systems to get started.</p>
              <Link href="/cold-plunge-tubs" onClick={closeCart} className="inline-flex items-center justify-center h-10 px-6 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
                Shop Cold Plunges
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.product.slug}`} onClick={closeCart} className="text-body-sm font-medium text-[#0A182E] hover:text-[#0084FF] transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="text-caption text-[#888888] mt-0.5">All-in-One System</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="p-1 text-[#888888] hover:text-[#c4544a] transition-colors" aria-label="Remove item">
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#e0ddd8] rounded-[0.375rem]">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors" aria-label="Decrease quantity">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-body-sm font-medium text-[#0A182E] border-x border-[#e0ddd8]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors" aria-label="Increase quantity">
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <p className="text-body-sm font-medium text-[#0A182E]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#e0ddd8] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-[#555555]">Subtotal</span>
              <span className="text-body font-medium text-[#0A182E]">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-[#555555]">Shipping</span>
              <span className="text-body-sm text-[#4a8a5c]">Included</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#e0ddd8] pt-4">
              <span className="text-body font-medium text-[#0A182E]">Total</span>
              <span className="text-h3">{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center h-12 w-full bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={closeCart} className="flex items-center justify-center h-10 w-full text-body-sm text-[#555555] hover:text-[#0A182E] transition-colors">
              View Full Cart
            </Link>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a8a5c]" />
              <span className="text-caption text-[#888888]">Freight shipping included</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
