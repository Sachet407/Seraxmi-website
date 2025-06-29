"use client"
import React, { useState, useRef } from "react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EcoTracker',
    description: 'Environmental impact tracking application with beautiful data visualizations that help users understand their carbon footprint.',
    tags: ['React', 'D3.js', 'Sustainability'],
    imageUrl: 'https://picsum.photos/400/300?random=1',
  },
  {
    id: 2,
    title: 'ArtVision AI',
    description: 'Transforms sketches into professional artwork using cutting-edge generative AI models with customizable styles.',
    tags: ['AI', 'TensorFlow', 'Creative'],
    imageUrl: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: 3,
    title: 'FinSavvy',
    description: 'A sleek personal finance dashboard that helps users track spending, create budgets, and visualize savings goals.',
    tags: ['Next.js', 'Chart.js', 'MongoDB'],
    imageUrl: 'https://picsum.photos/400/300?random=3',
  },
  {
    id: 4,
    title: 'Nomadify',
    description: 'Travel planning platform that curates personalized itineraries using AI and crowd-sourced tips from travelers.',
    tags: ['TypeScript', 'OpenAI API', 'TailwindCSS'],
    imageUrl: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: 5,
    title: 'SkillBridge',
    description: 'Micro-learning web app where users can build skills in short daily challenges with a gamified experience.',
    tags: ['React', 'Firebase', 'Gamification'],
    imageUrl: 'https://picsum.photos/400/300?random=5',
  },
  {
    id: 6,
    title: 'SecureChat',
    description: 'Real-time encrypted chat app with ephemeral messages and custom emoji reactions for secure communication.',
    tags: ['WebSockets', 'Node.js', 'Security'],
    imageUrl: 'https://picsum.photos/400/300?random=6',
  },
  {
    id: 7,
    title: 'CodeQuest',
    description: 'Interactive coding puzzle game where users solve challenges to unlock new levels and coding powers.',
    tags: ['Canvas', 'React', 'Game Logic'],
    imageUrl: 'https://picsum.photos/400/300?random=7',
  },
  {
    id: 8,
    title: 'FitMeal Planner',
    description: 'Nutrition-focused meal planning app with recipe suggestions based on fitness goals and dietary preferences.',
    tags: ['Next.js', 'TailwindCSS', 'API Integration'],
    imageUrl: 'https://picsum.photos/400/300?random=8',
  },
  {
    id: 9,
    title: 'Seraxmi Admin',
    description: 'Custom-built admin panel with advanced analytics, role-based access, and comprehensive project control.',
    tags: ['Next.js', 'MongoDB', 'Zustand', 'ShadCN'],
    imageUrl: 'https://picsum.photos/400/300?random=9',
  },
  {
    id: 10,
    title: 'MuseMood',
    description: 'AI-powered music mood generator that recommends playlists based on user sentiment and facial expressions.',
    tags: ['AI/ML', 'Emotion Detection', 'Spotify API'],
    imageUrl: 'https://picsum.photos/400/300?random=10',
  }
]

const getAccent = (id: number) => {
  const colors = ['#14b8a6', '#6366f1', '#f97316', '#e11d48', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b']
  return colors[id % colors.length]
}

const ShowProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section className=" relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Explore my digital creations through an interactive showcase
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Projects Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-12 sm:px-16 py-4"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {projects.map((project) => {
              const accent = getAccent(project.id)
              
              return (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-72 sm:w-80 group relative cursor-pointer transition-all duration-500 transform hover:scale-105"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Card */}
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white"
                    style={{ 
                      boxShadow: hoveredId === project.id ? `0 20px 40px ${accent}30` : undefined 
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${accent}80, ${accent}40)` 
                        }}
                      />
                      
                      {/* Hover content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="text-center text-white p-4">
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold">View Details</p>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in fade-in zoom-in duration-300">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Project image */}
                <div className="relative h-64 sm:h-80 rounded-t-3xl overflow-hidden">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Project details */}
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-sm px-3 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: getAccent(selectedProject.id) }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default ShowProjects