"use client";
import { CalendarDays, Clock, User, Tag, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BlogPostPage = () => {
  // Dummy data - replace with your actual fetched data later
  const blogPost = {
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Exploring the cutting-edge technologies and methodologies that will shape web development in the coming year.",
    content: `
      <p class="mb-4">The web development landscape is evolving at an unprecedented pace. As we approach 2024, several key trends are emerging that promise to redefine how we build and interact with web applications.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">1. AI-Powered Development</h2>
      <p class="mb-4">Artificial Intelligence is no longer just for data scientists. Tools like GitHub Copilot are becoming standard in developers' toolkits, offering real-time code suggestions and even generating entire functions.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">2. WebAssembly (Wasm) Maturity</h2>
      <p class="mb-4">WebAssembly continues to gain traction, enabling near-native performance in the browser. Expect to see more complex applications like video editors and 3D modeling tools running entirely in the browser.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">3. Edge Computing Integration</h2>
      <p class="mb-4">With frameworks like Next.js leading the charge, edge computing is becoming more accessible to frontend developers, reducing latency and improving performance globally.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">4. Progressive Web Apps (PWAs) 2.0</h2>
      <p class="mb-4">The next generation of PWAs will offer even more native-like experiences, with improved offline capabilities and deeper device integration.</p>
    `,
    author: "Sachet Khatiwada",
    publishDate: new Date("2023-11-15"),
    readTime: "5 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Web Development", "Trends", "2024", "Technology"]
  };

  // Format date
  const formattedDate = blogPost.publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white  mt-20">
  


      {/* Blog post container */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category badge */}
        <span className="inline-block px-3 py-1 text-sm font-semibold text-[#188f8b] bg-[#188f8b]/10 rounded-full mb-4 ">
          {blogPost.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900  mb-6 leading-tight">
          {blogPost.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600  mb-8">
          {blogPost.excerpt}
        </p>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500  mb-12">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{blogPost.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{blogPost.readTime}</span>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative rounded-xl overflow-hidden mb-12 aspect-video">
          <Image
            src={blogPost.imageUrl}
            alt={blogPost.title}
            fill
            className="object-cover w-full h-full"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {blogPost.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800  "
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose  max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        ></div>

        {/* Author bio */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/SachetAvatar.jpg"
                alt={blogPost.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 ">
                {blogPost.author}
              </h3>
              <p className="text-gray-600  mt-1">
                CEO and Founder of our company, passionate about technology and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts section */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900  mb-8">
          You might also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white  rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1594732832278-abd644401426?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Related post"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-[#188f8b] bg-[#188f8b]/10 rounded-full mb-3 ">
                  {blogPost.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900  mb-2">
                  Related Post Title {item}
                </h3>
                <p className="text-gray-600  text-sm mb-4">
                  Brief excerpt for the related post that gives a preview of the content...
                </p>
                <div className="flex items-center text-sm text-gray-500 ">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>3 min read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;