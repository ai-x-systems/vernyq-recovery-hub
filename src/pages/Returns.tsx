import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Returns() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Returns" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Return Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            We want you to be satisfied with your purchase. Here's our return
            policy.
          </p>
        </div>

        <div className="max-w-3xl pb-20 space-y-12">
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Return Window
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              You may return your VERNYQ product within 30 days of delivery.
              Returns must be initiated within this window.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Condition Requirements
            </h2>
            <ul className="space-y-2">
              {[
                "Product must be in its original condition",
                "All original components and accessories must be included",
                "Product must not show signs of use beyond inspection",
                "Original packaging is preferred but not strictly required",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="size-1.5 rounded-full bg-[#4a8a5c] mt-2 flex-shrink-0" />
                  <span className="text-body-sm text-[#555555]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Return Process
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Contact Support",
                  desc: "Email support@vernyc.com with your order number and reason for return.",
                },
                {
                  step: "02",
                  title: "Receive Authorization",
                  desc: "Our team will review your request and provide return instructions and authorization.",
                },
                {
                  step: "03",
                  title: "Prepare for Shipment",
                  desc: "Package the product securely. We will arrange freight pickup for large items.",
                },
                {
                  step: "04",
                  title: "Refund Processing",
                  desc: "Once the return is received and inspected, your refund will be processed within 5–10 business days.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-overline text-[#0084FF] mt-0.5 flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-body font-medium text-[#0A182E]">
                      {item.title}
                    </p>
                    <p className="text-body-sm text-[#555555] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Shipping Responsibility
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Return shipping for large items will be arranged by our team. The
              cost of return freight shipping may be deducted from your refund,
              depending on the reason for return.
            </p>
          </section>

          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Refund Method
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Refunds will be issued to the original payment method. For bank
              transfers, refunds will be processed via the same bank account used
              for the original payment.
            </p>
          </section>

          {/* Note */}
          <div className="p-5 bg-[#b8923e]/10 border border-[#b8923e]/20 rounded-[0.5rem]">
            <p className="text-body-sm font-medium text-[#0A182E]">Note</p>
            <p className="text-caption text-[#555555] mt-1">
              This return policy reflects our intended terms. Final policy
              details will be provided with your purchase. We reserve the right
              to update this policy as operational needs evolve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
