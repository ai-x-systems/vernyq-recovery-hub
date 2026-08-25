import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Shipping', description: 'Information about shipping, delivery, and large-item handling for VERNYQ products.' };

export default function ShippingPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shipping' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Shipping Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">Information about shipping, delivery, and large-item handling.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-12">
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Shipping Regions</h2><p className="text-body text-[#555555] leading-relaxed">We currently ship within the contiguous United States. We do not ship to Alaska, Hawaii, or international addresses at this time.</p></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Shipping Cost</h2><p className="text-body text-[#555555] leading-relaxed">Freight shipping is included in the product price for all orders within the contiguous United States.</p></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Delivery Times</h2><div className="space-y-3">
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"><p className="text-body-sm font-medium text-[#0A182E]">VERNYQ V1</p><p className="text-body-sm text-[#555555] mt-1">5-10 business days after payment verification.</p></div>
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"><p className="text-body-sm font-medium text-[#0A182E]">VERNYQ V1 Pro</p><p className="text-body-sm text-[#555555] mt-1">7-14 business days. White-glove delivery available.</p></div>
          </div></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Large-Item Delivery</h2><p className="text-body text-[#555555] leading-relaxed">Our products are shipped via freight carrier. The carrier will contact you to schedule delivery. Standard delivery includes curbside placement.</p></section>
        </div>
      </div>
    </div>
  );
}
