"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";

export function BlogArticleContent({ post }: { post: BlogPost }) {
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-h2 text-[#0A182E] mt-12 mb-4">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-h3 text-[#0A182E] mt-8 mb-3">{line.replace("### ", "")}</h3>;
      if (line.startsWith("- ")) return <li key={i} className="text-body-sm text-[#555555] ml-4 mb-1 list-disc">{line.replace("- ", "")}</li>;
      if (line.startsWith("---")) return <hr key={i} className="my-8 border-[#e0ddd8]" />;
      if (line.startsWith("*") && line.endsWith("*")) return <p key={i} className="text-caption text-[#888888] italic mt-4">{line.replace(/\*/g, "")}</p>;
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return <p key={i} className="text-body text-[#555555] leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: post.title }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#0084FF]/10 text-[#0084FF] text-caption font-medium rounded-[0.25rem]">{post.category}</span>
            <span className="text-caption text-[#888888]">·</span>
            <span className="text-caption text-[#888888] flex items-center gap-1"><Clock className="size-3" />{post.readingTime}</span>
          </div>
          <h1 className="text-h1 text-[#0A182E]">{post.title}</h1>
          <div className="flex items-center gap-3 mt-4 text-body-sm text-[#555555]">
            <span>By {post.author}</span>
            <span>·</span>
            <time>{new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>
        </div>
        <div className="aspect-[21/9] rounded-[0.75rem] overflow-hidden mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-3xl pb-12">{renderContent(post.content)}</div>
        {related.length > 0 && (
          <div className="border-t border-[#e0ddd8] py-12">
            <h3 className="text-h3 text-[#0A182E] mb-8">Continue Reading</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                  <div className="aspect-[16/10] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h4 className="text-h3 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">{r.title}</h4>
                  <div className="flex items-center gap-1 mt-2 text-body-sm font-medium text-[#0084FF]">Read Article <ArrowRight className="size-4" /></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
