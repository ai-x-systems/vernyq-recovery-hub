"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, PackageCheck, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

const statusFlow = [
  { key: "pending", label: "Order Placed", description: "Your order has been received." },
  { key: "payment_pending", label: "Payment Pending", description: "Waiting for payment verification." },
  { key: "paid", label: "Payment Verified", description: "Payment confirmed by our team." },
  { key: "processing", label: "Preparing Order", description: "Your order is being prepared." },
  { key: "shipped", label: "Shipped", description: "Your order is on its way." },
  { key: "delivered", label: "Delivered", description: "Your order has been delivered." },
];

type OrderRow = {
  order_number: string;
  status: string;
  tracking_number: string | null;
  created_at: string;
};

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderRow | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const { data, error: dbError } = await supabase
        .from("orders")
        .select("order_number, status, tracking_number, created_at, email")
        .eq("order_number", orderNumber.trim().toUpperCase())
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();
      if (dbError) throw dbError;
      if (!data) {
        setError("No order found with that number and email. Double-check and try again.");
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error("Tracking lookup failed:", err);
      setError("Could not look up your order right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = order
    ? statusFlow.findIndex(s => s.key === order.status)
    : -1;

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Order Tracking" }]} />
        <div className="py-8 lg:py-12 max-w-2xl">
          <h1 className="text-h1 text-[#0A182E]">Track Your Order</h1>
          <p className="text-body-lg text-[#555555] mt-3">Enter your order number and email to check your order status.</p>
        </div>
        <div className="max-w-xl pb-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Order Number</label>
              <input type="text" required value={orderNumber} onChange={e => setOrderNumber(e.target.value)}
                className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
                placeholder="e.g., VQ-ABC123" />
            </div>
            <div>
              <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
                placeholder="The email used for your order" />
            </div>
            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50">
              <Search className="size-4" /> {loading ? "Looking up..." : "Track Order"}
            </button>
          </form>

          {error && (
            <div className="mt-10 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6 text-center">
              <XCircle className="size-6 text-[#888888] mx-auto mb-3" />
              <p className="text-body-sm text-[#555555]">{error}</p>
            </div>
          )}

          {order && (
            <div className="mt-10 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <div className="flex items-center gap-3 mb-6">
                {order.status === "delivered" ? (
                  <PackageCheck className="size-5 text-[#4a8a5c]" />
                ) : (
                  <Package className="size-5 text-[#0084FF]" />
                )}
                <div>
                  <p className="text-body font-medium text-[#0A182E]">Order {order.order_number}</p>
                  <p className="text-caption text-[#888888]">
                    Placed {new Date(order.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              {order.tracking_number && (
                <div className="mb-6 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-4">
                  <p className="text-caption text-[#888888]">Tracking Number</p>
                  <p className="text-body-sm font-medium text-[#0A182E] font-mono">{order.tracking_number}</p>
                </div>
              )}
              <div>
                {statusFlow.map((status, i) => {
                  const reached = i <= currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <div key={status.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`size-3 rounded-full shrink-0 ${isCurrent ? "bg-[#0084FF] ring-4 ring-[#0084FF]/15" : reached ? "bg-[#4a8a5c]" : "bg-[#e0ddd8]"}`} />
                        {i < statusFlow.length - 1 && <div className={`w-px h-8 ${reached ? "bg-[#4a8a5c]/40" : "bg-[#e0ddd8]"}`} />}
                      </div>
                      <div className="pb-4">
                        <p className={`text-body-sm ${isCurrent ? "text-[#0A182E] font-medium" : reached ? "text-[#555555]" : "text-[#888888]"}`}>{status.label}</p>
                        {isCurrent && <p className="text-caption text-[#888888] mt-0.5">{status.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-body-sm text-[#888888]">Need help? <Link href="/contact" className="text-[#0084FF] hover:text-[#3399FF] transition-colors">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
