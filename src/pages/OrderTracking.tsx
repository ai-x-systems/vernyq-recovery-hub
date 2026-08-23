import { useState } from "react";
import { Link } from "react-router";
import { Search, Package } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

const statuses = [
  { label: "Order Placed", description: "Your order has been received." },
  { label: "Payment Pending", description: "Waiting for payment verification." },
  { label: "Payment Verified", description: "Payment confirmed by our team." },
  { label: "Preparing Order", description: "Your order is being prepared." },
  { label: "Shipped", description: "Your order is on its way." },
  { label: "Delivered", description: "Your order has been delivered." },
];

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber && email) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Order Tracking" }]} />

        <div className="py-8 lg:py-12 max-w-2xl">
          <h1 className="text-h1 text-[#1a1a1a]">Track Your Order</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Enter your order number and email to check your order status.
          </p>
        </div>

        <div className="max-w-xl pb-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] placeholder:text-[#888888] focus:outline-none focus:border-[#4a7c8a] transition-colors"
                placeholder="e.g., VQ-ABC123"
              />
            </div>
            <div>
              <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] placeholder:text-[#888888] focus:outline-none focus:border-[#4a7c8a] transition-colors"
                placeholder="The email used for your order"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 h-12 px-8 bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors"
            >
              <Search className="size-4" />
              Track Order
            </button>
          </form>

          {submitted && (
            <div className="mt-10 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="size-5 text-[#4a7c8a]" />
                <div>
                  <p className="text-body font-medium text-[#1a1a1a]">
                    Order {orderNumber}
                  </p>
                  <p className="text-caption text-[#888888]">
                    Last updated: checking status...
                  </p>
                </div>
              </div>

              <div className="space-y-0">
                {statuses.map((status, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-3 rounded-full flex-shrink-0 ${
                          i === 0 ? "bg-[#4a8a5c]" : "bg-[#e0ddd8]"
                        }`}
                      />
                      {i < statuses.length - 1 && (
                        <div className="w-px h-full bg-[#e0ddd8] min-h-[2rem]" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`text-body-sm ${
                          i === 0
                            ? "font-medium text-[#1a1a1a]"
                            : "text-[#888888]"
                        }`}
                      >
                        {status.label}
                      </p>
                      {i === 0 && (
                        <p className="text-caption text-[#888888] mt-0.5">
                          {status.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-caption text-[#888888] mt-4">
                In a live environment, this would show real-time status from your
                order. Order status is updated manually by our team.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-body-sm text-[#888888]">
              Need help?{" "}
              <Link
                to="/contact"
                className="text-[#4a7c8a] hover:text-[#6ba3b0] transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
