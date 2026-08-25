import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CTABlock } from '@/components/commerce/CTABlock';

export const metadata: Metadata = { title: 'About', description: 'Learn about VERNYQ and our commitment to premium recovery systems.' };

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About' }]} />
        <div className="py-12 lg:py-20 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Recovery. Engineered.</h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">VERNYQ was founded on a simple belief: consistent recovery tools should be as reliable and well-designed as the training they support.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-16">
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">Why We Exist</h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">Cold water immersion is one of the most accessible recovery practices available. But most solutions require assembling multiple components or managing ice deliveries.</p>
            <p className="text-body text-[#555555] leading-relaxed">We built VERNYQ to remove the friction. One system. One brand. One standard of quality that makes consistent recovery practice effortless.</p>
          </section>
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">Our Philosophy</h2>
            <div className="space-y-6">
              {[{ title: 'Quality Over Speed', description: 'We design products to last years, not seasons.' }, { title: 'Transparency Over Hype', description: "We don't make unsupported claims." }, { title: 'Simplicity Over Complexity', description: "The best recovery tool is one that's ready when you are." }].map(item => (
                <div key={item.title} className="border-l-2 border-[#0084FF] pl-6">
                  <h3 className="text-h3 text-[#0A182E]">{item.title}</h3>
                  <p className="text-body-sm text-[#555555] mt-1 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <CTABlock overline="Get Started" title="Experience the VERNYQ Difference" primaryLabel="Shop Cold Plunges" primaryHref="/cold-plunge-tubs" />
    </div>
  );
}
