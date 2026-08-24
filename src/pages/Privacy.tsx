import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Privacy() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Privacy Policy</h1>
          <p className="text-body-sm text-[#888888] mt-3">
            Last updated: January 2025
          </p>
        </div>

        <div className="max-w-3xl pb-20 space-y-8">
          <section>
            <p className="text-body text-[#555555] leading-relaxed">
              This Privacy Policy describes how VERNYQ ("we," "us," or "our")
              collects, uses, and shares information when you visit our website
              and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">
              Information We Collect
            </h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              We collect information you provide directly, including your name,
              email address, shipping address, phone number, and payment
              information when you place an order. We also collect information
              about your use of our website, including browser type, IP address,
              and pages visited.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">
              How We Use Your Information
            </h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              We use your information to process orders, communicate about your
              orders, provide customer support, improve our website and products,
              and send relevant updates about your orders and our services.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">
              Information Sharing
            </h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              We do not sell your personal information. We share information
              with service providers who assist in order fulfillment, payment
              processing, and website operations. These providers are
              contractually obligated to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">Data Security</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              We implement reasonable security measures to protect your
              personal information. However, no method of transmission over
              the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">Your Rights</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              You may access, update, or delete your personal information by
              contacting us. You may also opt out of non-essential
              communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">Cookies</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              Our website uses essential cookies to maintain functionality.
              We do not use advertising or tracking cookies without your
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-[#0A182E] mb-3">Contact</h2>
            <p className="text-body-sm text-[#555555] leading-relaxed">
              For privacy-related inquiries, please contact us at
              support@vernyc.com.
            </p>
          </section>

          <div className="p-5 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem]">
            <p className="text-caption text-[#888888]">
              This privacy policy is a placeholder. The final version will be
              reviewed by legal counsel and updated with specific operational
              details before launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
