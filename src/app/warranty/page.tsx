import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Warranty', description: 'VERNYQ manufacturer warranty coverage for cold plunge systems.' };

export default function WarrantyPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Warranty' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Warranty Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">Our manufacturer warranty covers your VERNYQ system against manufacturing defects.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-12">
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Warranty Coverage</h2><div className="space-y-3">
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"><p className="text-body-sm font-medium text-[#0A182E]">VERNYQ V1 — 1-Year Manufacturer Warranty</p><p className="text-body-sm text-[#555555] mt-1">Covers the tub, chiller, filtration system, and structural components.</p></div>
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"><p className="text-body-sm font-medium text-[#0A182E]">VERNYQ V1 Pro — 2-Year Manufacturer Warranty</p><p className="text-body-sm text-[#555555] mt-1">Extended coverage on all components including chiller, filtration, and structural elements.</p></div>
          </div></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">What Is Covered</h2><ul className="space-y-2">
            {["Manufacturing defects in materials and workmanship", "Tub structure and liner integrity", "Chiller and cooling system components", "Filtration and UV sterilization system"].map(item => <li key={item} className="text-body-sm text-[#555555]">• {item}</li>)}
          </ul></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">How to Make a Claim</h2><p className="text-body text-[#555555] leading-relaxed">Contact support@vernyq.com with your order number and a description of the issue. Our team will review your claim and determine the appropriate resolution.</p></section>
        </div>
      </div>
    </div>
  );
}
