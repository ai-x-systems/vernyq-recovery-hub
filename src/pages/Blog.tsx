import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = !activeCategory || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Journal" }]} />

        <div className="py-8 lg:py-12 max-w-3xl">
          <p className="text-overline text-[#0084FF] mb-3">Journal</p>
          <h1 className="text-h1 text-[#0A182E]">
            Research, Recovery & Education
          </h1>
          <p className="text-body-lg text-[#555555] mt-3">
            Evidence-based content on cold water immersion, recovery science,
            and practical guides for your cold plunge practice.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
              placeholder="Search articles..."
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-body-sm font-medium rounded-[0.375rem] transition-colors ${
              activeCategory === null
                ? "bg-[#0A182E] text-[#faf9f7]"
                : "bg-[#f3f1ee] text-[#555555] hover:bg-[#eae7e2]"
            }`}
          >
            All
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-body-sm font-medium rounded-[0.375rem] transition-colors ${
                activeCategory === cat
                  ? "bg-[#0A182E] text-[#faf9f7]"
                  : "bg-[#f3f1ee] text-[#555555] hover:bg-[#eae7e2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {featuredPost && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block mb-12"
          >
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div className="aspect-[16/10] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-caption text-[#0084FF]">
                    {featuredPost.category}
                  </span>
                  <span className="text-caption text-[#e0ddd8]">·</span>
                  <span className="text-caption text-[#888888]">
                    {featuredPost.readingTime}
                  </span>
                </div>
                <h2 className="text-h2 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-body text-[#555555] mt-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-4 text-body-sm font-medium text-[#0084FF]">
                  Read Article
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        {remainingPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {remainingPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group"
              >
                <div className="aspect-[16/10] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-caption text-[#0084FF]">
                    {post.category}
                  </span>
                  <span className="text-caption text-[#e0ddd8]">·</span>
                  <span className="text-caption text-[#888888]">
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="text-h3 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">
                  {post.title}
                </h3>
                <p className="text-body-sm text-[#555555] mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-h3 text-[#0A182E] mb-2">No articles found</p>
            <p className="text-body-sm text-[#888888]">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
