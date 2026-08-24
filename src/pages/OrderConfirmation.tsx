import { Link, useLocation, useParams } from "react-router";
import { Check, Copy, Upload, ArrowRight, Shield, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

interface OrderState {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  paymentMethod: "bank_transfer" | "payment_request";
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  total: number;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const location = useLocation();
  const state = location.state as OrderState | null;

  if (!state) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#0A182E] mb-4">Order Not Found</h1>
        <p className="text-body-lg text-[#555555] mb-8">
          We couldn't find this order. Please check your order number.
        </p>
        <Link
          to="/tracking"
          className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors"
        >
          Track Your Order
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Order Confirmation" }]} />

        <div className="py-8 lg:py-12 max-w-2xl">
          {/* Success icon */}
          <div className="size-14 rounded-full bg-[#4a8a5c]/10 border border-[#4a8a5c]/20 flex items-center justify-center mb-6">
            <Check className="size-7 text-[#4a8a5c]" />
          </div>

          <h1 className="text-h1 text-[#0A182E]">Order Confirmed</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Thank you{state.firstName ? `, ${state.firstName}` : ""}. Your order
            has been received and is being reviewed.
          </p>

          <div className="flex items-center gap-3 mt-4 text-body-sm">
            <span className="text-[#888888]">Order number:</span>
            <span className="font-medium text-[#0A182E] font-mono">
              {state.orderNumber}
            </span>
            <button
              onClick={() =>
                navigator.clipboard.writeText(state.orderNumber)
              }
              className="p-1 text-[#888888] hover:text-[#0A182E] transition-colors"
              aria-label="Copy order number"
            >
              <Copy className="size-3.5" />
            </button>
          </div>
          <p className="text-body-sm text-[#888888] mt-1">
            Confirmation sent to {state.email}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 pb-20">
          <div className="lg:col-span-2 space-y-8">
            {/* Order items */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Order Details</h2>
              <div className="space-y-4">
                {state.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-[#e0ddd8] last:border-0"
                  >
                    <div>
                      <p className="text-body-sm font-medium text-[#0A182E]">
                        {item.name}
                      </p>
                      <p className="text-caption text-[#888888]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-body-sm font-medium text-[#0A182E]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-[#e0ddd8] pt-4">
                <div className="flex justify-between">
                  <span className="text-body-sm text-[#555555]">Subtotal</span>
                  <span className="text-body-sm text-[#0A182E]">
                    {formatPrice(state.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-sm text-[#555555]">Shipping</span>
                  <span className="text-body-sm text-[#4a8a5c]">Included</span>
                </div>
                <div className="flex justify-between border-t border-[#e0ddd8] pt-2">
                  <span className="text-body font-medium text-[#0A182E]">
                    Total
                  </span>
                  <span className="text-h3 text-[#0A182E]">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment instructions */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Payment</h2>
              {state.paymentMethod === "bank_transfer" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem]">
                    <div className="size-2 rounded-full bg-[#b8923e]" />
                    <span className="text-body-sm font-medium text-[#0A182E]">
                      Payment Status: Pending
                    </span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-body-sm text-[#555555]">
                      Please complete your bank transfer using the details below.
                      Include your order number as the transfer reference.
                    </p>
                    <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-body-sm text-[#888888]">
                          Bank Name
                        </span>
                        <span className="text-body-sm text-[#0A182E] font-medium">
                          [Bank Name — Provided by admin]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body-sm text-[#888888]">
                          Account Holder
                        </span>
                        <span className="text-body-sm text-[#0A182E] font-medium">
                          [Account Name — Provided by admin]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body-sm text-[#888888]">
                          Transfer Reference
                        </span>
                        <span className="text-body-sm text-[#0A182E] font-medium font-mono">
                          {state.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body-sm text-[#888888]">
                          Amount
                        </span>
                        <span className="text-body-sm text-[#0A182E] font-medium">
                          {formatPrice(state.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Upload proof */}
                  <div className="border border-[#e0ddd8] rounded-[0.5rem] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Upload className="size-4 text-[#0084FF]" />
                      <span className="text-body-sm font-medium text-[#0A182E]">
                        Upload Payment Proof
                      </span>
                    </div>
                    <p className="text-caption text-[#888888] mb-3">
                      Upload a screenshot of your bank transfer confirmation.
                      Your payment will be reviewed manually by our team.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-body-sm text-[#555555]"
                    />
                    <p className="text-caption text-[#b8923e] mt-2">
                      Note: Uploading proof does not automatically confirm
                      payment. Our team will verify and update your order status.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem]">
                    <div className="size-2 rounded-full bg-[#b8923e]" />
                    <span className="text-body-sm font-medium text-[#0A182E]">
                      Payment Request Pending
                    </span>
                  </div>
                  <p className="text-body-sm text-[#555555] leading-relaxed">
                    Your payment request will be sent to{" "}
                    <span className="font-medium text-[#0A182E]">
                      {state.email}
                    </span>{" "}
                    by email. Once you receive and complete the payment request,
                    our team will verify and confirm your order.
                  </p>
                  <p className="text-body-sm text-[#555555] leading-relaxed">
                    Please allow time for our team to review your order and
                    prepare the payment request. You will receive an email when
                    it's ready.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping */}
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <h2 className="text-h3 text-[#0A182E] mb-4">Shipping Address</h2>
              <p className="text-body-sm text-[#555555]">
                {state.shippingAddress.address}
                <br />
                {state.shippingAddress.city}, {state.shippingAddress.state}{" "}
                {state.shippingAddress.zip}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <h3 className="text-h3 text-[#0A182E] mb-4">Order Status</h3>
                <div className="space-y-3">
                  {[
                    { label: "Order Placed", done: true },
                    {
                      label: "Payment Pending",
                      done: false,
                    },
                    { label: "Payment Verified", done: false },
                    { label: "Preparing Order", done: false },
                    { label: "Shipped", done: false },
                    { label: "Delivered", done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`size-2.5 rounded-full flex-shrink-0 ${
                          step.done ? "bg-[#4a8a5c]" : "bg-[#e0ddd8]"
                        }`}
                      />
                      <span
                        className={`text-body-sm ${
                          step.done
                            ? "text-[#0A182E] font-medium"
                            : "text-[#888888]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/tracking"
                className="flex items-center justify-center gap-2 h-10 w-full border border-[#e0ddd8] text-[#555555] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#f3f1ee] transition-colors"
              >
                Track Your Order
              </Link>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="size-4 text-[#0084FF]" />
                  <span className="text-caption text-[#888888]">
                    Free freight shipping
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-[#0084FF]" />
                  <span className="text-caption text-[#888888]">
                    Manufacturer warranty included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
