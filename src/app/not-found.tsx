import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-h1 text-[#0A182E] mb-4">Page Not Found</h1>
      <p className="text-body-lg text-[#555555] mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
