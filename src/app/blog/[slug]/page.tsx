import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/data/blog';
import { BlogArticleContent } from './BlogArticleContent';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogArticleContent post={post} />;
}
