'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  content: string;
}

interface ApiBlog {
  _id: string;
  title?: string;
  excerpt?: string;
  author?: string;
  publishDate?: string;
  readTime?: string;
  category?: string;
  imageUrl?: string;
  tags?: string[];
  content?: string;
  success?: boolean;
}

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const categories = ['All', 'Design', 'Development', 'Product', 'Case Study', 'Tutorial'];
  
  const allTags = Array.isArray(blogs) 
    ? Array.from(new Set(blogs.flatMap(blog => blog?.tags || [])))
    : [];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch blogs');
        
        const result: { success: boolean; data: ApiBlog[] } = await response.json();
        
        const blogsData: Blog[] = result.success 
          ? result.data.map((blog: ApiBlog) => ({
              _id: blog._id,
              title: blog.title || 'Untitled',
              excerpt: blog.excerpt || '',
              author: blog.author || 'Unknown Author',
              publishDate: blog.publishDate || new Date().toISOString(),
              readTime: blog.readTime || '5 min read',
              category: blog.category || 'Uncategorized',
              imageUrl: blog.imageUrl || '/default-blog-image.jpg',
              tags: blog.tags || [],
              content: blog.content || ''
            }))
          : [];
        
        setBlogs(blogsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative py-16 md:py-20 bg-gradient-to-r from-teal-700 to-teal-500 text-white"
        style={{ backgroundColor: '#188f8b' }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Our Blog</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Insights, stories, and ideas from our team
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 -mt-8 md:-mt-10">
        {/* Filters */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTag('');
                  }}
                  className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-2 py-1 text-xs md:text-sm rounded-full whitespace-nowrap transition-colors ${
                  !selectedTag
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All Tags
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setSelectedCategory('All');
                  }}
                  className={`px-2 py-1 text-xs md:text-sm rounded-full whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <h3 className="text-lg md:text-xl font-medium text-gray-700">No articles found</h3>
            <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredBlogs.map(blog => (
              <div 
                key={blog._id} 
                className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-40 sm:h-48 w-full">
                  <Image
                    src={blog.imageUrl.startsWith('http') ? blog.imageUrl : `/default-blog-image.jpg`}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={!blog.imageUrl.startsWith('http')}
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-teal-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium">
                    {blog.category}
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                    {blog.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-0.5 md:py-1 bg-teal-50 text-teal-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm text-gray-500 mb-3 md:mb-4 gap-1 md:gap-0">
                    <div className="flex items-center gap-1 md:gap-2">
                      <User size={12} className="md:hidden" />
                      <User size={14} className="hidden md:block" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="md:hidden" />
                        <Calendar size={14} className="hidden md:block" />
                        <span>
                          {new Date(blog.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="md:hidden" />
                        <Clock size={14} className="hidden md:block" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/admin/blog/${blog._id}`}
                    className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm md:text-base transition-colors"
                  >
                    Read more <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Stay updated with our latest posts</h3>
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Subscribe to our newsletter to receive new articles directly in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button 
              className="px-4 py-2 md:px-6 md:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
              style={{ backgroundColor: '#188f8b' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;