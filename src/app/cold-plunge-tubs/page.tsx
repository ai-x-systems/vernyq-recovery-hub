import { Metadata } from 'next';
import { products } from '@/data/products';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { SectionHeader } from '@/components/commerce/SectionHeader';
import { CTABlock } from '@/components/commerce/CTABlock';
import { CollectionContent } from './CollectionContent';

export const metadata: Metadata = {
  title: 'Cold Plunge Tubs',
  description: 'Premium all-in-one cold plunge systems designed for serious home recovery. Integrated cooling, filtration, and insulation — everything you need in one unit.',
  openGraph: {
    title: 'Cold Plunge Tubs | VERNYQ',
    description: 'Premium all-in-one cold plunge systems designed for serious home recovery.',
  },
};

export default function CollectionPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Cold Plunge Tubs' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Cold Plunge Tubs</h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            Premium all-in-one cold plunge systems designed for serious home recovery.
            Integrated cooling, filtration, and insulation — everything you need in one unit.
          </p>
        </div>
        <CollectionContent products={products} />
      </div>

      <CTABlock
        title="Have Questions?"
        description="Our team is here to help you find the right system for your recovery needs."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </div>
  );
}
