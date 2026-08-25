"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

type PaymentMethod = "bank_transfer" | "payment_request";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: PaymentMethod;
}

export default function CheckoutPage() {
  const { items, subtotal, shippingText, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
    paymentMethod: "bank_transfer",
  });

  const updateForm = (field: keyof CheckoutForm, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    const orderNumber = "VQ-" + Date.now().toString(36).toUpperCase();
    const orderData = {
      orderNumber,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      paymentMethod: form.paymentMethod,
      items: items.map(i => ({ name: i.product.name, price: i.product.price, quantity: i.quantity })),
      subtotal,
      total: subtotal,
      shippingAddress: { address: form.address, city: form.city, state: form.state, zip: form.zip },
    };
    clearCart();
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
    router.push("/order/" + orderNumber);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#0A182E] mb-4">No Items in Cart</h1>
        <a href="/cold-plunge-tubs" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">Shop Cold Plunges</a>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Checkout" }]} />
        <div className="py-8 lg:py-12 max-w-2xl">
          <h1 className="text-h1 text-[#0A182E]">Checkout</h1>
          <p className="text-body-sm text-[#888888] mt-2 flex items-center gap-2">
            <Lock className="size-3.5" /> Secure checkout · Guest only — no account required
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 pb-20">
            <div className="lg:col-span-2 space-y-10">
              {/* Customer Info */}
              <div>
                <h2 className="text-h3 text-[#0A182E] mb-6">Customer Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "firstName" as const, label: "First Name", type: "text", required: true },
                    { key: "lastName" as const, label: "Last Name", type: "text", required: true },
                    { key: "email" as const, label: "Email Address", type: "email", required: true },
                    { key: "phone" as const, label: "Phone", type: "tel", required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">{f.label}{f.required ? " *" : ""}</label>
                      <input type={f.type} required={f.required} value={form[f.key]} onChange={e => updateForm(f.key, e.target.value)}
                        className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
                        placeholder={f.label} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-h3 text-[#0A182E] mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Street Address *</label>
                    <input type="text" required value={form.address} onChange={e => updateForm("address", e.target.value)}
                      className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
                      placeholder="123 Main Street" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[{ key: "city" as const, label: "City" }, { key: "state" as const, label: "State" }, { key: "zip" as const, label: "ZIP Code" }].map(f => (
                      <div key={f.key}>
                        <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">{f.label} *</label>
                        <input type="text" required value={form[f.key]} onChange={e => updateForm(f.key, e.target.value)}
                          className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
                          placeholder={f.label} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-h3 text-[#0A182E] mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {([
                    { id: "bank_transfer" as const, title: "Bank Transfer", description: "Transfer directly to our bank account. Instructions provided after order placement." },
                    { id: "payment_request" as const, title: "Payment Request", description: "We'll send you a secure payment request by email after reviewing your order." },
                  ] as const).map(m => (
                    <label key={m.id} className={`flex items-start gap-4 p-5 border rounded-[0.5rem] cursor-pointer transition-colors ${
                      form.paymentMethod === m.id ? "border-[#0084FF] bg-[#0084FF]/5" : "border-[#e0ddd8] hover:border-[#ccc]"
                    }`}>
                      <input type="radio" name="paymentMethod" value={m.id} checked={form.paymentMethod === m.id}
                        onChange={e => updateForm("paymentMethod", e.target.value as PaymentMethod)}
                        className="mt-0.5 accent-[#0084FF]" />
                      <div>
                        <p className="text-body-sm font-medium text-[#0A182E]">{m.title}</p>
                        <p className="text-caption text-[#888888] mt-0.5">{m.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-24 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <h2 className="text-h3 text-[#0A182E] mb-6">Your Order</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-[0.375rem] overflow-hidden bg-[#faf9f7] shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-[#0A182E] truncate">{item.product.name}</p>
                        <p className="text-caption text-[#888888]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-body-sm font-medium text-[#0A182E]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t border-[#e0ddd8] pt-4">
                  <div className="flex justify-between"><span className="text-body-sm text-[#555555]">Subtotal</span><span className="text-body-sm text-[#0A182E]">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-body-sm text-[#555555]">Shipping</span><span className="text-body-sm text-[#4a8a5c]">{shippingText}</span></div>
                  <div className="flex justify-between border-t border-[#e0ddd8] pt-3"><span className="text-body font-medium text-[#0A182E]">Total</span><span className="text-h3 text-[#0A182E]">{formatPrice(subtotal)}</span></div>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 h-12 w-full bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors mt-6 disabled:opacity-50">
                  {isSubmitting ? "Processing..." : <><span>Place Order</span><ArrowRight className="size-4" /></>}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Shield className="size-3.5 text-[#4a8a5c]" />
                  <span className="text-caption text-[#888888]">Secure, encrypted checkout</span>
                </div>
                <p className="text-caption text-[#888888] text-center mt-4 leading-relaxed">
                  By placing this order, you agree to our <a href="/terms" className="underline hover:text-[#0A182E]">Terms</a> and <a href="/privacy" className="underline hover:text-[#0A182E]">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
