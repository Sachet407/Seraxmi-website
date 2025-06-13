import React, { useState } from 'react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  imageUrl: string
  tags: string[]
}

const BlogSection = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Web Development: Beyond React and Vue',
      excerpt: 'Exploring emerging frameworks and paradigms that are reshaping how we build modern web applications in 2024 and beyond.',
      content: 'Full article content would go here...',
      author: 'Sarah Chen',
      publishDate: '2024-03-15',
      readTime: '8 min read',
      category: 'Technology',
      imageUrl: 'https://picsum.photos/800/500?random=10',
      tags: ['Web Dev', 'Frontend', 'Future Tech']
    },
    {
      id: 2,
      title: 'Designing for Accessibility: A Developer\'s Guide',
      excerpt: 'Learn how to create inclusive digital experiences that work for everyone, with practical tips and real-world examples.',
      content: 'Full article content would go here...',
      author: 'Marcus Johnson',
      publishDate: '2024-03-12',
      readTime: '12 min read',
      category: 'Design',
      imageUrl: 'https://picsum.photos/800/500?random=11',
      tags: ['Accessibility', 'UX', 'Inclusive Design']
    },
    {
      id: 3,
      title: 'AI and Machine Learning in Everyday Apps',
      excerpt: 'Discover how artificial intelligence is quietly revolutionizing user experiences in applications we use daily.',
      content: 'Full article content would go here...',
      author: 'Dr. Elena Rodriguez',
      publishDate: '2024-03-10',
      readTime: '6 min read',
      category: 'AI & ML',
      imageUrl: 'https://picsum.photos/800/500?random=12',
      tags: ['AI', 'Machine Learning', 'UX']
    },
    {
      id: 4,
      title: 'The Art of Code: Writing Beautiful, Maintainable Software',
      excerpt: 'Exploring the intersection of craftsmanship and coding, where technical excellence meets aesthetic sensibility.',
      content: 'Full article content would go here...',
      author: 'Alex Thompson',
      publishDate: '2024-03-08',
      readTime: '10 min read',
      category: 'Programming',
      imageUrl: 'https://picsum.photos/800/500?random=13',
      tags: ['Clean Code', 'Best Practices', 'Software Craft']
    },
    {
      id: 5,
      title: 'Sustainable Tech: Building Green Digital Solutions',
      excerpt: 'How developers can reduce carbon footprints and create environmentally conscious applications for a better future.',
      content: 'Full article content would go here...',
      author: 'Maya Patel',
      publishDate: '2024-03-05',
      readTime: '7 min read',
      category: 'Sustainability',
      imageUrl: 'https://picsum.photos/800/500?random=14',
      tags: ['Green Tech', 'Sustainability', 'Environment']
    },
    {
      id: 6,
      title: 'Micro-Interactions: The Details That Make a Difference',
      excerpt: 'Small animations and feedback loops that transform good interfaces into exceptional user experiences.',
      content: 'Full article content would go here...',
      author: 'Jordan Kim',
      publishDate: '2024-03-03',
      readTime: '5 min read',
      category: 'Design',
      imageUrl: 'https://picsum.photos/800/500?random=15',
      tags: ['Animation', 'UI Design', 'User Experience']
    }
  ]

  const categories = ['All', 'Technology', 'Design', 'AI & ML', 'Programming', 'Sustainability']
  
  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter)

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Technology': '#3b82f6',
      'Design': '#10b981',
      'AI & ML': '#8b5cf6',
      'Programming': '#f59e0b',
      'Sustainability': '#06b6d4',
      'All': '#6366f1'
    }
    return colors[category] || '#6366f1'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-slate-700">Latest Insights</span>
          </div>
          
          <h2 className="text-6xl font-black text-slate-900 mb-6 leading-tight">
            <span className="relative inline-block">
              Blog
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 rounded-full transform rotate-1"></div>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 ml-4">
              Stories
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights from the world of technology, design, and innovation. 
            Join me on this journey of continuous learning and discovery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'text-white shadow-lg'
                  : 'text-slate-600 bg-white hover:bg-slate-50 shadow-sm border border-slate-200'
              }`}
              style={{
                backgroundColor: activeFilter === category ? getCategoryColor(category) : undefined,
                boxShadow: activeFilter === category ? `0 8px 25px ${getCategoryColor(category)}40` : undefined
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post (First post gets special treatment) */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <div className="relative group overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <img
                    src={filteredPosts[0].imageUrl}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                      ✨ Featured
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span 
                      className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                      style={{ backgroundColor: getCategoryColor(filteredPosts[0].category) }}
                    >
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-slate-500 text-sm ml-4">{formatDate(filteredPosts[0].publishDate)}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                    {filteredPosts[0].title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {filteredPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{filteredPosts[0].author}</p>
                        <p className="text-sm text-slate-500">{filteredPosts[0].readTime}</p>
                      </div>
                    </div>
                    
                    <button className="group flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200">
                      Read More
                      <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <article 
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(post.category) }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 mb-3">
                  <span>{formatDate(post.publishDate)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2"
                      style={{ backgroundColor: getCategoryColor(post.category) }}
                    >
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{post.author}</span>
                  </div>
                  
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200">
                    Read →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            
            <span className="relative z-10 mr-2">Load More Stories</span>
            
            <svg 
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection