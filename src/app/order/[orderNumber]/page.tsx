"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Copy, Upload, ArrowRight, Shield, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

export default function OrderConfirmation({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params);
  const [copied, setCopied] = useState(false);

  let orderData: any = null;
  if (typeof window !== "undefined") {
    try { orderData = JSON.parse(sessionStorage.getItem("lastOrder") || "null"); } catch {}
  }

  if (!orderData || orderData.orderNumber !== orderNumber) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#0A182E] mb-4">Order Confirmed</h1>
        <p className="text-body-lg text-[#555555] mb-4">Thank you{orderData?.firstName ? `, ${orderData.firstName}` : ""}. Your order has been received.</p>
        <p className="text-body-lg text-[#555555] mb-8">Order number: <span className="font-mono font-medium">{orderNumber}</span></p>
        <a href="/tracking" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
          Track Your Order
        </a>
      </div>
    );
  }

  const handleCopy = () => { navigator.clipboard.writeText(orderData.orderNumber); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Order Confirmation" }]} />
        <div className="py-8 lg:py-12 max-w-2xl">
          <div className="size-14 rounded-full bg-[#4a8a5c]/10 border border-[#4a8a5c]/20 flex items-center justify-center mb-6">
            <Check className="size-7 text-[#4a8a5c]" />
          </div>
          <h1 className="text-h1 text-[#0A182E]">Order Confirmed</h1>
          <p className="text-body-lg text-[#555555] mt-3">Thank you{orderData.firstName ? `, ${orderData.firstName}` : ""}. Your order has been received and is being reviewed.</p>
          <div className="flex items-center gap-3 mt-4 text-body-sm">
            <span className="text-[#888888]">Order number:</span>
            <span className="font-medium text-[#0A182E] font-mono">{orderData.orderNumber}</span>
            <button onClick={handleCopy} className="p-1 text-[#888888] hover:text-[#0A182E] transition-colors" aria-label="Copy order number">
              <Copy className="size-3.5" />
            </button>
          </div>
          <p className="text-body-sm text-[#888888] mt-1">Confirmation sent to {orderData.email}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 pb-20">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Order Details</h2>
              <div className="space-y-4">
                {orderData.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[#e0ddd8] last:border-b-0">
                    <div><p className="text-body-sm font-medium text-[#0A182E]">{item.name}</p><p className="text-caption text-[#888888]">Qty: {item.quantity}</p></div>
                    <p className="text-body-sm font-medium text-[#0A182E]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-[#e0ddd8] pt-4">
                <div className="flex justify-between"><span className="text-body-sm text-[#555555]">Subtotal</span><span className="text-body-sm text-[#0A182E]">{formatPrice(orderData.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-body-sm text-[#555555]">Shipping</span><span className="text-body-sm text-[#4a8a5c]">Included</span></div>
                <div className="flex justify-between border-t border-[#e0ddd8] pt-2"><span className="text-body font-medium text-[#0A182E]">Total</span><span className="text-h3 text-[#0A182E]">{formatPrice(orderData.total)}</span></div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Payment</h2>
              {orderData.paymentMethod === "bank_transfer" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem]">
                    <div className="size-2 rounded-full bg-[#b8923e]" />
                    <span className="text-body-sm font-medium text-[#0A182E]">Payment Status: Pending</span>
                  </div>
                  <p className="text-body-sm text-[#555555]">Please complete your bank transfer. Include order number as reference.</p>
                  <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] p-4 space-y-2">
                    <div className="flex justify-between"><span className="text-body-sm text-[#888888]">Order Number</span><span className="text-body-sm text-[#0A182E] font-medium font-mono">{orderData.orderNumber}</span></div>
                    <div className="flex justify-between"><span className="text-body-sm text-[#888888]">Amount</span><span className="text-body-sm text-[#0A182E] font-medium">{formatPrice(orderData.total)}</span></div>
                  </div>
                  <div className="border border-[#e0ddd8] rounded-[0.5rem] p-4">
                    <div className="flex items-center gap-2 mb-2"><Upload className="size-4 text-[#0084FF]" /><span className="text-body-sm font-medium text-[#0A182E]">Upload Payment Proof</span></div>
                    <p className="text-caption text-[#888888] mb-3">Upload a screenshot of your bank transfer confirmation. Your payment will be reviewed manually.</p>
                    <input type="file" accept="image/*" className="text-body-sm text-[#555555]" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem]">
                    <div className="size-2 rounded-full bg-[#b8923e]" />
                    <span className="text-body-sm font-medium text-[#0A182E]">Payment Request Pending</span>
                  </div>
                  <p className="text-body-sm text-[#555555]">Your payment request will be sent to <span className="font-medium text-[#0A182E]">{orderData.email}</span> by email.</p>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Shipping Address</h2>
              <p className="text-body-sm text-[#555555]">
                {orderData.shippingAddress.address}<br />
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <h3 className="text-h3 text-[#0A182E] mb-4">Order Status</h3>
                <div className="space-y-3">
                  {["Order Placed", "Payment Pending", "Payment Verified", "Preparing Order", "Shipped", "Delivered"].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`size-2.5 rounded-full shrink-0 ${i === 0 ? "bg-[#4a8a5c]" : "bg-[#e0ddd8]"}`} />
                      <span className={`text-body-sm ${i === 0 ? "text-[#0A182E] font-medium" : "text-[#888888]"}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/tracking" className="flex items-center justify-center gap-2 h-10 w-full border border-[#e0ddd8] text-[#555555] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#f3f1ee] transition-colors">
                Track Your Order
              </a>
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Truck className="size-4 text-[#0084FF]" /><span className="text-caption text-[#888888]">Free freight shipping</span></div>
                <div className="flex items-center gap-2"><Shield className="size-4 text-[#0084FF]" /><span className="text-caption text-[#888888]">Manufacturer warranty included</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
