import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Warranty() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Warranty" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#1a1a1a]">Warranty Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Our manufacturer warranty covers your VERNYQ system against
            manufacturing defects.
          </p>
        </div>

        <div className="max-w-3xl pb-20 space-y-12">
          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              Warranty Coverage
            </h2>
            <div className="space-y-3">
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <p className="text-body-sm font-medium text-[#1a1a1a]">
                  VERNYQ V1 — 1-Year Manufacturer Warranty
                </p>
                <p className="text-body-sm text-[#555555] mt-1">
                  Covers the tub, chiller, filtration system, UV module, and
                  structural components against manufacturing defects.
                </p>
              </div>
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <p className="text-body-sm font-medium text-[#1a1a1a]">
                  VERNYQ V1 Pro — 2-Year Manufacturer Warranty
                </p>
                <p className="text-body-sm text-[#555555] mt-1">
                  Extended coverage on all components including the chiller,
                  dual-stage filtration system, Wi-Fi module, and structural
                  elements.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              What Is Covered
            </h2>
            <ul className="space-y-2">
              {[
                "Manufacturing defects in materials and workmanship",
                "Tub structure and liner integrity",
                "Chiller and cooling system components",
                "Filtration and UV sterilization system",
                "Electrical components and wiring",
                "Insulation performance below specification",
                "Cover defects (zipper, fit, material integrity)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="size-1.5 rounded-full bg-[#4a8a5c] mt-2 flex-shrink-0" />
                  <span className="text-body-sm text-[#555555]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              What Is Not Covered
            </h2>
            <ul className="space-y-2">
              {[
                "Normal wear and tear from regular use",
                "Damage from improper installation or use",
                "Damage from chemicals or cleaning agents not approved",
                "Cosmetic damage (scratches, dents from external impact)",
                "Filter cartridges (consumable item)",
                "Damage from use outside recommended temperature range",
                "Damage from power surges or electrical issues",
                "Unauthorized modifications or repairs",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="size-1.5 rounded-full bg-[#c4544a] mt-2 flex-shrink-0" />
                  <span className="text-body-sm text-[#555555]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h2 text-[#1a1a1a] mb-4">
              How to Make a Claim
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Contact Support",
                  desc: "Email us at support@vernyc.com with your order number and a description of the issue.",
                },
                {
                  step: "02",
                  title: "Documentation",
                  desc: "Provide photographs or video of the defect. Our team may request additional information.",
                },
                {
                  step: "03",
                  title: "Assessment",
                  desc: "Our team will review your claim and determine the appropriate resolution.",
                },
                {
                  step: "04",
                  title: "Resolution",
                  desc: "Approved claims will be resolved through repair or replacement at our discretion.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-overline text-[#4a7c8a] mt-0.5 flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-body font-medium text-[#1a1a1a]">
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

          {/* Note */}
          <div className="p-5 bg-[#b8923e]/10 border border-[#b8923e]/20 rounded-[0.5rem]">
            <p className="text-body-sm font-medium text-[#1a1a1a]">Note</p>
            <p className="text-caption text-[#555555] mt-1">
              This warranty policy reflects our intended coverage. Final warranty
              terms may be updated and will be provided with your purchase.
              Please retain your order confirmation for warranty reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
