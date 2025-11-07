import React from 'react';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Revolutionizing Frontend in 2025',
    excerpt: 'Next-gen frameworks, performance tuning, and UI design principles you must adopt.',
    imageUrl: 'https://picsum.photos/600/400?random=21',
    category: 'Frontend',
    date: 'Apr 21, 2025',

    featured: true
  },
  {
    id: 2,
    title: 'Smart UX Decisions that Drive Conversions',
    excerpt: 'Insights from psychology and design systems that keep users engaged.',
    imageUrl: 'https://picsum.photos/600/400?random=22',
    category: 'Design',
    date: 'May 10, 2025',

    featured: false
  },
  {
    id: 3,
    title: 'AI Workflows in Modern Development',
    excerpt: 'Incorporating GPT, Copilot, and MLOps into real products.',
    imageUrl: 'https://picsum.photos/60/400?random=23',
    category: 'AI/ML',
    date: 'June 01, 2025',

    featured: false
  },
  {
    id: 4,
    title: 'The Future of Web Performance',
    excerpt: 'Core Web Vitals, edge computing, and optimization strategies for lightning-fast experiences.',
    imageUrl: 'https://picsum.photos/600/400?random=24',
    category: 'Performance',
    date: 'June 05, 2025',

    featured: false
  },
  {
    id: 5,
    title: 'Building Scalable Design Systems',
    excerpt: 'Component libraries, tokens, and automation tools that scale with your team.',
    imageUrl: 'https://picsum.photos/600/400?random=25',
    category: 'Design',
    date: 'June 08, 2025',
    readTime: '4 min',
    featured: false
  },
  {
    id: 6,
    title: 'Serverless Architecture Patterns',
    excerpt: 'Edge functions, microservices, and deployment strategies for modern applications.',
    imageUrl: 'https://picsum.photos/600/400?random=26',
    category: 'Backend',
    date: 'June 12, 2025',
    readTime: '8 min',
    featured: false
  }
];

type CategoryBadgeProps = {
  category: string;
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const colors: Record<string, string> = {
    'Frontend': 'bg-blue-100 text-blue-700 border-blue-200',
    'Design': 'bg-purple-100 text-purple-700 border-purple-200',
    'AI/ML': 'bg-green-100 text-green-700 border-green-200',
    'Performance': 'bg-orange-100 text-orange-700 border-orange-200',
    'Backend': 'bg-red-100 text-red-700 border-red-200'
  };
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colors[category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      <Tag size={10} />
      {category}
    </span>
  );
};

const BlogSection = () => {
  // Show only first 3 posts on mobile, first 4 on desktop
  const displayPosts = blogPosts.slice(0, 4);

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
        {/* Featured Post - Takes full width on desktop */}
        <div className="md:col-span-2 lg:col-span-1">
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[16/10]">
              <img 
                src={displayPosts[0].imageUrl} 
                alt={displayPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <CategoryBadge category={displayPosts[0].category} />
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{displayPosts[0].date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{displayPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {displayPosts[0].title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {displayPosts[0].excerpt}
              </p>
            </div>
          </article>
        </div>

        {/* Secondary Posts Grid */}
        <div className="space-y-8 lg:col-span-1">
          {displayPosts.slice(1, 4).map((post) => (
            <article key={post.id} className="group cursor-pointer flex gap-4">
              <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <CategoryBadge category={post.category} />
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 hidden md:block">
                  {post.excerpt}
                </p>
                {/* <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={10} />
                  <span>{post.readTime}</span>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg">
          View All Articles
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default BlogSection;