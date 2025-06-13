"use client"
import React from 'react'
import Image from 'next/image'
interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
}

const ShowProjects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'EcoTracker',
      description: 'Environmental impact tracking application with beautiful data visualizations that help users understand their carbon footprint and make sustainable choices.',
      tags: ['React', 'D3.js', 'Sustainability'],
      imageUrl: 'https://picsum.photos/800/600?random=1',
      liveUrl: '#',
      githubUrl: '#'
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
      title: 'UrbanFit',
      description: 'Mobile fitness solution for urban spaces with 15-minute effective workouts, smart nutrition tracking, and personalized training plans.',
      tags: ['Flutter', 'Health', 'Mobile'],
      imageUrl: 'https://picsum.photos/800/600?random=3',
      liveUrl: '#'
    },
    {
      id: 4,
      title: 'CodeCollab',
      description: 'Real-time collaborative coding environment with integrated video chat for remote teams, code reviews, and technical interviews.',
      tags: ['WebRTC', 'Real-time', 'Developer'],
      imageUrl: 'https://picsum.photos/800/600?random=4',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'CryptoVault',
      description: 'Secure cryptocurrency portfolio tracker with advanced analytics, price alerts, and multi-wallet integration for serious traders.',
      tags: ['Blockchain', 'Security', 'Finance'],
      imageUrl: 'https://picsum.photos/800/600?random=5',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'MindSpace',
      description: 'Mental wellness platform featuring guided meditation, mood tracking, and AI-powered insights for better mental health management.',
      tags: ['Wellness', 'React Native', 'AI'],
      imageUrl: 'https://picsum.photos/800/600?random=6',
      liveUrl: '#'
    }
  ]

  const getAccentColor = (id: number): string => {
    const colors = {
      1: '#10b981', // Emerald
      2: '#8b5cf6', // Violet  
      3: '#f59e0b', // Amber
      4: '#ef4444', // Red
      5: '#3b82f6', // Blue
      6: '#ec4899'  // Pink
    }
    return colors[id as keyof typeof colors] || '#6366f1'
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-slate-700">Featured Projects</span>
          </div>
          
          <h2 className="text-6xl font-black text-slate-900 mb-6 leading-tight">
            <span className="relative inline-block">
              Creative
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 rounded-full transform rotate-1"></div>
            </span>
            <br />
            <span className="relative inline-block mt-2">
              Showcase
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-pink-400 to-red-400 opacity-30 rounded-full transform -rotate-1"></div>
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore my latest projects where innovation meets functionality. Each project represents 
            a unique challenge solved with creative engineering and modern design principles.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => {
            const accentColor = getAccentColor(project.id)
            
            return (
              <div 
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
              >
                {/* Project Number Badge */}
                <div 
                  className="absolute -right-3 -top-3 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white opacity-80 group-hover:opacity-100 transition-all duration-500 z-10"
                  style={{ backgroundColor: accentColor }}
                >
                  {String(project.id).padStart(2, '0')}
                </div>

                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                        fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"
                  ></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-3 group-hover:text-opacity-80 transition-colors duration-300"
                    style={{ color: accentColor }}
                  >
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-white text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 4px 14px ${accentColor}40`
                        }}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        className="flex-1 px-4 py-2.5 border-2 rounded-lg font-semibold text-center transition-all duration-300 hover:bg-slate-50 text-sm"
                        style={{
                          borderColor: accentColor,
                          color: accentColor
                        }}
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Gradient Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}20, transparent)`
                  }}
                ></div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            
            <span className="relative z-10 mr-2">View All Projects</span>
            
            <svg 
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShowProjects