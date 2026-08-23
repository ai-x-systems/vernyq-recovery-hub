import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CTABlock } from "@/components/commerce/CTABlock";

export default function Shipping() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Shipping" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#1a1a1a]">Shipping Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Information about shipping, delivery, and large-item handling.
          </p>
        </div>

        <div className="max-w-3xl pb-20 space-y-12">
          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Shipping Regions
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              We currently ship within the contiguous United States. We do not
              ship to Alaska, Hawaii, or international addresses at this time.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Shipping Cost
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Freight shipping is included in the product price for all orders
              within the contiguous United States. There are no hidden shipping
              charges.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Processing Time
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Orders are processed after payment verification. Bank transfer
              orders are processed once payment is confirmed. Payment request
              orders are processed once payment is completed and verified.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Delivery Times
            </h2>
            <div className="space-y-3">
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <p className="text-body-sm font-medium text-[#1a1a1a]">
                  VERNYQ V1
                </p>
                <p className="text-body-sm text-[#555555] mt-1">
                  5–10 business days after payment verification. Standard
                  freight shipping to curbside.
                </p>
              </div>
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <p className="text-body-sm font-medium text-[#1a1a1a]">
                  VERNYQ V1 Pro
                </p>
                <p className="text-body-sm text-[#555555] mt-1">
                  7–14 business days after payment verification. White-glove
                  delivery available for select areas, including room-of-choice
                  placement and packaging removal.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Large-Item Delivery
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              Our products are shipped via freight carrier. The carrier will
              contact you to schedule delivery. Standard delivery includes
              curbside placement.
            </p>
            <p className="text-body text-[#555555] leading-relaxed">
              White-glove delivery (available for the V1 Pro in select areas)
              includes inside delivery to your room of choice and removal of
              packaging materials.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Tracking
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Once your order ships, you'll receive tracking information by
              email. You can also check your order status on our{" "}
              <a href="/tracking" className="text-[#4a7c8a] hover:text-[#6ba3b0] underline">
                Order Tracking
              </a>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Damaged Shipments
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Please inspect your delivery upon arrival. If you notice visible
              damage to the packaging or product, document it with photographs
              and contact us immediately. Do not discard packaging until you've
              confirmed the product is in good condition.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Inspection Upon Delivery
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              We recommend inspecting your product within 48 hours of delivery.
              If you find any issues, contact our support team with your order
              number and photographs of the issue.
            </p>
          </section>

          {/* Note */}
          <div className="p-5 bg-[#b8923e]/10 border border-[#b8923e]/20 rounded-[0.5rem]">
            <p className="text-body-sm font-medium text-[#1a1a1a]">
              Note
            </p>
            <p className="text-caption text-[#555555] mt-1">
              Specific carriers, exact delivery windows, and white-glove
              availability may vary by location and are subject to change. Final
              shipping details will be confirmed with your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
