'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Custom404() {
  const [glitchText, setGlitchText] = useState('SERAXMI')
  type Particle = {
    id: number
    x: number
    y: number
    size: number
    speed: number
    delay: number
  }
  const [particles, setParticles] = useState<Particle[]>([])

  // Glitch effect for text
  useEffect(() => {
    const glitchChars = ['S', 'E', 'R', 'A', 'X', 'M', 'I', '█', '▓', '▒', '░']
    const interval = setInterval(() => {
      const randomText = Array.from({length: 7}, () => 
        glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join('')
      setGlitchText(randomText)
      
      setTimeout(() => setGlitchText('SERAXMI'), 100)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Floating particles
  useEffect(() => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#14b8a6" opacity="0.3"/>
                <line x1="3" y1="2" x2="17" y2="2" stroke="#14b8a6" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="18" cy="2" r="1" fill="#14b8a6" opacity="0.3"/>
                <line x1="2" y1="3" x2="2" y2="17" stroke="#14b8a6" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="2" cy="18" r="1" fill="#14b8a6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        {/* Floating particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-teal-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed}s`
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        


        {/* Glitch Text */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-teal-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent tracking-wider mb-4">
            {glitchText}
          </h1>
          <div className="text-lg text-teal-400/70 tracking-widest font-light">
            TECHNOLOGY SOLUTIONS
          </div>
        </div>

        {/* Mysterious Message */}
        <div className="mb-12 space-y-6">
          <div className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-teal-400 to-yellow-400 bg-clip-text text-transparent">
              Portal Offline
            </span>
          </div>
          
          <div className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            The digital pathway you seek has been temporarily dissolved. 
            Our quantum systems are recalibrating to serve you better.
          </div>
          
          <div className="flex justify-center items-center space-x-4 text-teal-400">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-sm tracking-wider">SYSTEM RESTORATION IN PROGRESS</span>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center text-lg font-medium">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Return Home
            </span>
          </Link>

          <Link
            href="/services"
            className="group relative px-8 py-4 border-2 border-teal-500/50 text-teal-400 rounded-xl overflow-hidden transition-all duration-300 hover:border-teal-400 hover:bg-teal-500/10 hover:scale-105"
          >
            <span className="relative z-10 flex items-center text-lg font-medium">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              Explore Services
            </span>
          </Link>
        </div>

        {/* Tech Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { label: 'Quantum Channels', value: '∞', icon: '⚡' },
            { label: 'Neural Networks', value: '247', icon: '🧠' },
            { label: 'Data Streams', value: '∆', icon: '📡' }
          ].map((stat, index) => (
            <div key={index} className="relative p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 backdrop-blur-sm">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-xl bg-teal-500/5 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
    </div>
  )
}

// Custom CSS for additional animations
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow linear infinite;
  }
  
  .animate-spin-reverse {
    animation: spin-reverse linear infinite;
  }
`