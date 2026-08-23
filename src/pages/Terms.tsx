import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Terms() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#1a1a1a]">Terms of Service</h1>
          <p className="text-body-sm text-[#888888] mt-3">
            Last updated: January 2025
          </p>
        </div>

        <div className="max-w-3xl pb-20 space-y-8">
          <section>
            <p className="text-body text-[#555555] leading-relaxed">
              These Terms of Service govern your use of the VERNYQ website and
              purchase of VERNYQ products. By using our website or placing an
              order, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Products</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              Product descriptions, specifications, and images are provided for
              informational purposes. We make every effort to ensure accuracy,
              but minor variations may occur. Product availability is subject to
              change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Pricing</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              All prices are in US Dollars. We reserve the right to modify
              prices at any time. The price at the time of your order is the
              price you will be charged.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Orders</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              Placing an order constitutes an offer to purchase. We reserve
              the right to accept or decline any order. Orders are subject to
              payment verification before processing.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Payment</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              We accept bank transfers and manual payment requests. Payment
              must be completed and verified before your order is processed.
              See our shipping and payment information pages for details.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">
              Limitation of Liability
            </h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              VERNYQ is not liable for indirect, incidental, or consequential
              damages arising from the use of our products. Our liability is
              limited to the purchase price of the product.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Governing Law</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              These terms are governed by the laws of the United States. Any
              disputes will be resolved in accordance with applicable US law.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#1a1a1a] mb-3">Contact</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              For questions about these terms, contact us at
              support@vernyc.com.
            </p>
          </section>

          <div className="p-5 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem]">
            <p className="text-caption text-[#888888]">
              These terms of service are a placeholder. The final version will
              be reviewed by legal counsel and updated with specific operational
              details before launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
