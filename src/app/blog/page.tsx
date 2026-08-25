import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Research, setup guides, and recovery education from VERNYQ.',
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Journal' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <p className="text-overline text-[#0084FF] mb-3">Journal</p>
          <h1 className="text-h1 text-[#0A182E]">Research, Recovery &amp; Education</h1>
          <p className="text-body-lg text-[#555555] mt-3">Evidence-based content on cold water immersion, recovery science, and practical guides.</p>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div className="aspect-[16/10] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee]">
                <Image src={featured.image} alt={featured.title} width={600} height={375} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-caption text-[#0084FF]">{featured.category}</span>
                  <span className="text-caption text-[#e0ddd8]">·</span>
                  <span className="text-caption text-[#888888]">{featured.readingTime}</span>
                </div>
                <h2 className="text-h2 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">{featured.title}</h2>
                <p className="text-body text-[#555555] mt-3 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-body-sm font-medium text-[#0084FF]">Read Article →</div>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {rest.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
                  <Image src={post.image} alt={post.title} width={600} height={375} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-caption text-[#0084FF]">{post.category}</span>
                  <span className="text-caption text-[#e0ddd8]">·</span>
                  <span className="text-caption text-[#888888]">{post.readingTime}</span>
                </div>
                <h3 className="text-h3 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">{post.title}</h3>
                <p className="text-body-sm text-[#555555] mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
