"use client";

import { useParams } from "react-router-dom";
import { blogPosts, getBlogPost } from "@/data/blog";
import { BlogArticleContent } from "./BlogArticleContent";
export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug!);
  if (!post) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#0A182E] mb-4">Article Not Found</h1>
        <a href="/blog" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem]">
          Back to Journal
        </a>
      </div>
    );
  }
  return <BlogArticleContent post={post} />;
}
