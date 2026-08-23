import { useParams, Link } from "react-router";
import { ArrowRight, Clock, User } from "lucide-react";
import { getBlogPost, blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug || "");

  if (!post) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#1a1a1a] mb-4">Article Not Found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 h-12 px-8 bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors"
        >
          View All Articles
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Simple markdown-ish rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-h2 text-[#1a1a1a] mt-12 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-h3 text-[#1a1a1a] mt-8 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="text-body font-medium text-[#1a1a1a] mt-4">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li
            key={i}
            className="text-body-sm text-[#555555] ml-4 mb-1 list-disc"
          >
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.startsWith("---")) {
        return <hr key={i} className="my-8 border-[#e0ddd8]" />;
      }
      if (line.startsWith("*") && line.endsWith("*")) {
        return (
          <p
            key={i}
            className="text-caption text-[#888888] italic mt-4"
          >
            {line.replace(/\*/g, "")}
          </p>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-3" />;
      }
      return (
        <p
          key={i}
          className="text-body text-[#555555] leading-relaxed mb-3"
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Journal", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* Article header */}
        <div className="py-8 lg:py-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#4a7c8a]/10 text-[#4a7c8a] text-caption font-medium rounded-[0.25rem]">
              {post.category}
            </span>
            <span className="text-caption text-[#888888]">
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-h1 text-[#1a1a1a]">{post.title}</h1>

          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-6 pb-8 border-b border-[#e0ddd8]">
            <div className="flex items-center gap-2">
              <User className="size-4 text-[#888888]" />
              <span className="text-body-sm text-[#555555]">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-[#888888]" />
              <span className="text-body-sm text-[#555555]">
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="aspect-[21/9] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee] mb-12 max-w-4xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article body */}
        <article className="max-w-3xl pb-16">
          {renderContent(post.content)}
        </article>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-[#e0ddd8] py-12">
            <h2 className="text-h2 text-[#1a1a1a] mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-caption text-[#4a7c8a]">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="text-h3 text-[#1a1a1a] group-hover:text-[#4a7c8a] transition-colors">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-[#f3f1ee] rounded-[0.75rem] p-8 lg:p-12 text-center mb-20">
          <h2 className="text-h2 text-[#1a1a1a]">Ready to Start Recovery?</h2>
          <p className="text-body text-[#555555] mt-2 mb-6">
            Explore our all-in-one cold plunge systems.
          </p>
          <Link
            to="/cold-plunge-tubs"
            className="inline-flex items-center gap-2 h-12 px-8 bg-[#1a1a1a] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#1a1a1a]/90 transition-colors"
          >
            Shop Cold Plunges
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
