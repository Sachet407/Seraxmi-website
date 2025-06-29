"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EcoTracker',
    description: 'Environmental impact tracking application with beautiful data visualizations that help users understand their carbon footprint and make sustainable choices.',
    tags: ['React', 'D3.js', 'Sustainability'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: 2,
    title: 'ArtVision AI',
    description: 'Transforms sketches into professional artwork using cutting-edge generative AI models with customizable styles and advanced neural networks.',
    tags: ['AI', 'TensorFlow', 'Creative'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'FinSavvy',
    description: 'A sleek personal finance dashboard that helps users track spending, create budgets, and visualize savings goals.',
    tags: ['Next.js', 'Chart.js', 'MongoDB'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    liveUrl: '#'
  },
  {
    id: 4,
    title: 'Nomadify',
    description: 'Travel planning platform that curates personalized itineraries using AI and crowd-sourced tips from global travelers.',
    tags: ['TypeScript', 'OpenAI API', 'TailwindCSS'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'SkillBridge',
    description: 'Micro-learning web app where users can build skills in short daily challenges with a gamified experience.',
    tags: ['React', 'Firebase', 'Gamification'],
    imageUrl: 'https://picsum.photos/800/600?random=5',
    liveUrl: '#'
  },
  {
    id: 6,
    title: 'SecureChat',
    description: 'Real-time encrypted chat app with ephemeral messages and custom emoji reactions.',
    tags: ['WebSockets', 'Node.js', 'Security'],
    imageUrl: 'https://picsum.photos/800/600?random=6',
    githubUrl: '#'
  },
  {
    id: 7,
    title: 'CodeQuest',
    description: 'Interactive coding puzzle game where users solve challenges to unlock new levels and powers.',
    tags: ['Canvas', 'React', 'Game Logic'],
    imageUrl: 'https://picsum.photos/800/600?random=7',
  },
  {
    id: 8,
    title: 'FitMeal Planner',
    description: 'Nutrition-focused meal planning app with recipe suggestions based on fitness goals and dietary preferences.',
    tags: ['Next.js', 'TailwindCSS', 'API Integration'],
    imageUrl: 'https://picsum.photos/800/600?random=8',
    liveUrl: '#'
  },
  {
    id: 9,
    title: 'Seraxmi Admin',
    description: 'Custom-built admin panel with advanced analytics, role-based access, and project control for clients.',
    tags: ['Next.js', 'MongoDB', 'Zustand', 'ShadCN'],
    imageUrl: 'https://picsum.photos/800/600?random=9',
    githubUrl: '#'
  },
  {
    id: 10,
    title: 'MuseMood',
    description: 'AI-powered music mood generator that recommends playlists based on user sentiment and facial expressions.',
    tags: ['AI/ML', 'Emotion Detection', 'Spotify API'],
    imageUrl: 'https://picsum.photos/800/600?random=10',
    liveUrl: '#'
  }
]

const getAccent = (id: number) => {
  const colors = ['#14b8a6', '#6366f1', '#f97316', '#e11d48', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b']
  return colors[id % colors.length]
}

const ShowProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Prevent horizontal scroll navigation
  useEffect(() => {
    const preventNavigation = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
      }
    }

    document.addEventListener('wheel', preventNavigation, { passive: false })
    return () => document.removeEventListener('wheel', preventNavigation)
  }, [])

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating background elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore my digital creations through an interactive showcase
          </p>
        </div>

        {/* Interactive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {projects.map((project, index) => {
            const accent = getAccent(project.id)
            const isEven = index % 2 === 0
            
            return (
              <div
                key={project.id}
                className={`group relative cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  isEven ? 'hover:-rotate-2' : 'hover:rotate-2'
                }`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Thumbnail */}
                <div 
                  className="relative h-48 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300"
                  style={{ 
                    boxShadow: hoveredId === project.id ? `0 20px 40px ${accent}30` : undefined 
                  }}
                >
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
                <div className="mt-4 px-2">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
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
                <div className="relative h-80 rounded-t-3xl overflow-hidden">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"
                  />
                </div>

                {/* Project details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h3>
                      <div className="flex flex-wrap gap-2">
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
                  </div>

                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        className="px-6 py-3 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        style={{ backgroundColor: getAccent(selectedProject.id) }}
                      >
                        View Live
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        className="px-6 py-3 rounded-full border-2 text-slate-700 font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        style={{ borderColor: getAccent(selectedProject.id) }}
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShowProjects