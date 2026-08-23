import { Link } from "react-router";
import { Plus, Minus, X, ArrowRight, Shield, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shippingText } =
    useCart();

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cart" }]} />

        <h1 className="text-h1 text-[#1a1a1a] mt-4 mb-10">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-32">
            <div className="size-16 rounded-full bg-[#f3f1ee] border border-[#e0ddd8] flex items-center justify-center mx-auto mb-6">
              <X className="size-8 text-[#e0ddd8]" />
            </div>
            <h2 className="text-h3 text-[#1a1a1a] mb-2">Your cart is empty</h2>
            <p className="text-body-sm text-[#888888] mb-8">
              Explore our cold plunge systems to get started.
            </p>
            <Link
              to="/cold-plunge-tubs"
              className="inline-flex items-center gap-2 h-12 px-8 bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors"
            >
              Shop Cold Plunges
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 sm:gap-6 pb-6 border-b border-[#e0ddd8]"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-body font-medium text-[#1a1a1a] hover:text-[#4a7c8a] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-caption text-[#888888] mt-0.5">
                          All-in-One System
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-[#888888] hover:text-[#c4544a] transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#e0ddd8] rounded-[0.375rem]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-[#555555] hover:text-[#1a1a1a] transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-9 h-9 flex items-center justify-center text-body-sm font-medium text-[#1a1a1a] border-x border-[#e0ddd8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-[#555555] hover:text-[#1a1a1a] transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <p className="text-body font-medium text-[#1a1a1a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-24 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <h2 className="text-h3 text-[#1a1a1a] mb-6">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-[#555555]">Subtotal</span>
                    <span className="text-body-sm text-[#1a1a1a]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-[#555555]">Shipping</span>
                    <span className="text-body-sm text-[#4a8a5c]">
                      {shippingText}
                    </span>
                  </div>
                  <div className="border-t border-[#e0ddd8] pt-3 flex items-center justify-between">
                    <span className="text-body font-medium text-[#1a1a1a]">
                      Total
                    </span>
                    <span className="text-h3 text-[#1a1a1a]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 h-12 w-full bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors mt-6"
                >
                  Proceed to Checkout
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/cold-plunge-tubs"
                  className="flex items-center justify-center h-10 w-full text-body-sm text-[#555555] hover:text-[#1a1a1a] transition-colors mt-3"
                >
                  Continue Shopping
                </Link>

                {/* Trust */}
                <div className="border-t border-[#e0ddd8] mt-6 pt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="size-4 text-[#4a7c8a] flex-shrink-0" />
                    <span className="text-caption text-[#888888]">
                      Free freight shipping included
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-[#4a7c8a] flex-shrink-0" />
                    <span className="text-caption text-[#888888]">
                      Manufacturer warranty on all products
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
