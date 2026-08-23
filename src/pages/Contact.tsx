import { useState } from "react";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#1a1a1a]">Contact Us</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Have a question about our products, orders, or cold plunging in
            general? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-20">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
              <Mail className="size-5 text-[#4a7c8a] mb-3" />
              <h3 className="text-body-sm font-medium text-[#1a1a1a]">
                Email
              </h3>
              <p className="text-body-sm text-[#555555] mt-1">
                support@vernyc.com
              </p>
            </div>

            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
              <Clock className="size-5 text-[#4a7c8a] mb-3" />
              <h3 className="text-body-sm font-medium text-[#1a1a1a]">
                Response Time
              </h3>
              <p className="text-body-sm text-[#555555] mt-1">
                We typically respond within 1–2 business days.
              </p>
            </div>

            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
              <MessageSquare className="size-5 text-[#4a7c8a] mb-3" />
              <h3 className="text-body-sm font-medium text-[#1a1a1a]">
                Support Categories
              </h3>
              <ul className="text-body-sm text-[#555555] mt-1 space-y-1">
                <li>Product questions</li>
                <li>Order status</li>
                <li>Shipping inquiries</li>
                <li>Warranty claims</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-8 text-center">
                <div className="size-14 rounded-full bg-[#4a8a5c]/10 border border-[#4a8a5c]/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="size-7 text-[#4a8a5c]" />
                </div>
                <h2 className="text-h3 text-[#1a1a1a]">Message Sent</h2>
                <p className="text-body-sm text-[#555555] mt-2">
                  Thank you for reaching out. We'll get back to you within 1–2
                  business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] placeholder:text-[#888888] focus:outline-none focus:border-[#4a7c8a] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] placeholder:text-[#888888] focus:outline-none focus:border-[#4a7c8a] transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                    Subject *
                  </label>
                  <select className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] focus:outline-none focus:border-[#4a7c8a] transition-colors">
                    <option value="">Select a topic</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Status</option>
                    <option value="shipping">Shipping Inquiry</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="returns">Returns</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-body-sm font-medium text-[#1a1a1a] block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#1a1a1a] placeholder:text-[#888888] focus:outline-none focus:border-[#4a7c8a] transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-8 bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
