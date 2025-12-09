"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  blogPhoto: string;
  content: string;
  keywords: string[];
  authorDetails: {
    id: string;
    name: string;
    photo: string;
    role: string;
  };
  metadata: {
    wordCount: number;
    readingTime: number;
    createdAt: string;
  };
};

const COLORS = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-red-100 text-red-700 border-red-200",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
];

// deterministic hash generator
function hashString(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const index = hashString(category) % COLORS.length;
  const selectedColor = COLORS[index];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${selectedColor}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {category}
    </span>
  );
};


const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data.data.slice(0, 4)); // Show only first 4 like your design
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="w-full text-center py-20 text-lg text-gray-600 animate-pulse">
        Loading latest articles...
      </div>
    );

  if (blogs.length === 0)
    return (
      <div className="w-full text-center py-20 text-gray-600">
        No blog posts found.
      </div>
    );

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-600 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Latest Insights
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          From the Blog
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thoughts on development, design, and the future of technology
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {/* Featured Post */}
        <div className="md:col-span-2 lg:col-span-1">
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[16/10]">
              <img
                src={blogs[0].blogPhoto}
                alt={blogs[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <CategoryBadge category={blogs[0].keywords[0] || "Blog"} />

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>
                    {new Date(blogs[0].metadata.createdAt).toDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{blogs[0].metadata.readingTime} min</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {blogs[0].title}
              </h3>

              <p
                className="text-gray-600 leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: blogs[0].content.substring(0, 160) + "...",
                }}
              />
            </div>
          </article>
        </div>

        {/* Secondary Posts */}
        <div className="space-y-8 lg:col-span-1">
          {blogs.slice(1).map((post) => (
            <article key={post._id} className="group cursor-pointer flex gap-4">
              <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                <img
                  src={post.blogPhoto}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <CategoryBadge category={post.keywords[0] || "Blog"} />
                  <span className="text-xs text-gray-500">
                    {new Date(post.metadata.createdAt).toDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p
                  className="text-sm text-gray-600 line-clamp-2 hidden md:block"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 120) + "...",
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <a
          href="/blog"
          className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          View All Articles
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
