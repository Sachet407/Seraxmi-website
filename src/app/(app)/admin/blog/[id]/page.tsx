'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
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

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${params.id}`);
        if (!res.ok) return setPost(null);
        const data = await res.json();
        setPost(data.success ? data.data : null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-20">Loading blog post...</div>;
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link
            href="/blog"
            className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            style={{ color: '#188f8b' }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
          <div className="flex gap-4">
            <button
              className="text-gray-500 hover:text-teal-600 transition-colors"
              style={{ color: '#188f8b' }}
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <Share2 size={20} />
            </button>
            <button className="text-gray-500 hover:text-teal-600 transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <article className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-4xl">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#e6fffa', color: '#188f8b' }}
            >
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-gray-600">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#e6fffa' }}
              >
                <User size={20} style={{ color: '#188f8b' }} />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm sm:text-base">
              <span className="flex items-center gap-1">
                <Clock size={16} style={{ color: '#188f8b' }} />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8 md:mb-12">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog Content */}
        <div
          className="prose max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-4">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#e6fffa' }}
            >
              <User size={24} style={{ color: '#188f8b' }} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{post.author}</h3>
              <p className="text-gray-600 mt-1">Author bio would go here...</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
