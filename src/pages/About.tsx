import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CTABlock } from "@/components/commerce/CTABlock";

export default function About() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} />

        {/* Hero */}
        <div className="py-12 lg:py-20 max-w-3xl">
          <p className="text-overline text-[#4a7c8a] mb-3">Our Story</p>
          <h1 className="text-h1 text-[#1a1a1a]">
            Recovery. Engineered.
          </h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            VERNYQ was founded on a simple belief: consistent recovery tools
            should be as reliable and well-designed as the training they support.
          </p>
        </div>

        <div className="max-w-3xl pb-20">
          <article className="mb-16">
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Why We Exist
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              Cold water immersion is one of the most accessible recovery
              practices available. But most solutions require assembling
              multiple components, managing ice deliveries, or settling for
              equipment that wasn't designed for daily use.
            </p>
            <p className="text-body text-[#555555] leading-relaxed">
              We built VERNYQ to remove the friction. One system. One brand. One
              standard of quality that makes consistent recovery practice
              effortless.
            </p>
          </article>

          <article className="mb-16">
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Our Philosophy
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Quality Over Speed",
                  description:
                    "We design products to last years, not seasons. Every material, component, and manufacturing process is chosen for durability and performance.",
                },
                {
                  title: "Transparency Over Hype",
                  description:
                    "We don't make unsupported claims. We share what we know, acknowledge what we don't, and let our products speak for themselves.",
                },
                {
                  title: "Simplicity Over Complexity",
                  description:
                    "The best recovery tool is one that's ready when you are. Our all-in-one systems eliminate complexity so you can focus on what matters.",
                },
                {
                  title: "Long-term Over Short-term",
                  description:
                    "We're building a brand designed to grow with our customers. That means continuous product improvement, responsive support, and genuine accountability.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-[#4a7c8a] pl-6"
                >
                  <h3 className="text-h3 text-[#1a1a1a]">{item.title}</h3>
                  <p className="text-body-sm text-[#555555] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="mb-16">
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Product Quality
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              Every VERNYQ system is designed with premium materials:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Marine-Grade Steel", desc: "Exterior shell built to withstand the elements" },
                { label: "Medical-Grade Liner", desc: "Safe, durable interior surface" },
                { label: "Closed-Cell Insulation", desc: "Energy-efficient temperature maintenance" },
                { label: "Integrated Chiller", desc: "Purpose-built for our systems" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"
                >
                  <p className="text-body-sm font-medium text-[#1a1a1a]">
                    {item.label}
                  </p>
                  <p className="text-caption text-[#888888] mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="mb-16">
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Customer Experience
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              From the moment you order to years of daily use, we aim to deliver
              an experience that matches the quality of our products. That means
              transparent pricing, responsive support, clear documentation, and
              honest communication. We don't have customer reviews to show yet —
              we're focused on earning them through product quality and genuine
              service.
            </p>
          </article>

          <article>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">Our Commitment</h2>
            <p className="text-body text-[#555555] leading-relaxed">
              VERNYQ is committed to building products that serve our customers
              for years. We stand behind our systems with manufacturer warranties,
              responsive customer support, and a genuine dedication to the
              recovery community. As we grow, our commitment to quality and
              transparency will remain unchanged.
            </p>
          </article>
        </div>
      </div>

      <CTABlock
        overline="Get Started"
        title="Experience the VERNYQ Difference"
        description="Premium recovery systems designed for serious use."
        primaryLabel="Shop Cold Plunges"
        primaryHref="/cold-plunge-tubs"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </div>
  );
}
