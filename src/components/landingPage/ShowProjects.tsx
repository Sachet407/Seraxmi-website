"use client"
import React, { useState, useEffect } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsAutoPlaying(false)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlaying(false)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getVisibleProjects = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % projects.length
      visible.push({
        ...projects[index],
        position: i,
        isActive: i === 0
      })
    }
    return visible
  }

  const visibleProjects = getVisibleProjects()

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Projects</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover innovative solutions crafted with passion and precision
          </p>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Main Display Area */}
          <div className="flex items-center justify-center h-[600px] relative">
            {visibleProjects.map((project) => {
              const accent = getAccent(project.id)
              const isActive = project.position === 0
              
              return (
                <div
                  key={`${project.id}-${currentIndex}`}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                    project.position === 0 
                      ? 'z-30 scale-100 opacity-100 translate-x-0' 
                      : project.position === 1
                        ? 'z-20 scale-90 opacity-60 translate-x-80 sm:translate-x-96'
                        : 'z-10 scale-75 opacity-30 translate-x-[-320px] sm:translate-x-[-384px]'
                  }`}
                  onClick={() => isActive ? setSelectedProject(project) : goToProject((currentIndex + project.position) % projects.length)}
                >
                  <div 
                    className={`bg-white rounded-3xl shadow-2xl overflow-hidden w-80 sm:w-96 h-[500px] transition-all duration-700 ${
                      isActive ? 'hover:scale-105 hover:shadow-3xl' : ''
                    }`}
                    style={{
                      boxShadow: isActive ? `0 25px 50px ${accent}30` : undefined
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          isActive ? 'scale-100 group-hover:scale-110' : 'scale-105'
                        }`}
                      />
                      
                      {/* Gradient overlay */}
                      <div 
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive ? 'opacity-0 hover:opacity-70' : 'opacity-40'
                        }`}
                        style={{ 
                          background: `linear-gradient(135deg, ${accent}80, ${accent}40)` 
                        }}
                      />
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute top-4 left-4">
                          <div 
                            className="w-3 h-3 rounded-full animate-pulse"
                            style={{ backgroundColor: accent }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className={`font-bold text-xl mb-3 transition-colors duration-300 ${
                        isActive ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm mb-4 leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-slate-600' : 'text-slate-500'
                      }`}>
                        {project.description.substring(0, 100)}...
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                              isActive ? 'text-white' : 'text-slate-600 bg-slate-100'
                            }`}
                            style={{ 
                              backgroundColor: isActive ? accent : undefined 
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                          }}
                          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                          style={{ backgroundColor: accent }}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 scale-125'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in fade-in zoom-in-95 duration-300">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `linear-gradient(135deg, ${getAccent(selectedProject.id)}60, transparent 70%)`
                    }}
                  />
                </div>

                {/* Project details */}
                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedProject.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-sm px-4 py-2 rounded-full text-white font-medium shadow-md"
                          style={{ backgroundColor: getAccent(selectedProject.id) }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {selectedProject.description}
                    </p>
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