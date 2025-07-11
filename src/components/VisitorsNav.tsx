'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, PhoneCall, ChevronDown, Calendar, Mail, User, Building, DollarSign, FileText, CheckCircle, Loader2 } from 'lucide-react'

// Add custom CSS for shimmer animation
const shimmerStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }
`

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    subItems: [
      { href: '/services/web-development', label: 'Web Development' },
      { href: '/services/app-development', label: 'App Development' },
      { href: '/services/cyber-security', label: 'Cyber Security' },
      { href: '/services/ai-ml-solutions', label: 'AI/ML Solutions' },
      { href: '/services/cloud-solutions', label: 'Cloud Solutions' },
      { href: '/services/ui-ux', label: 'UI/UX Design' },
      { href: '/services/digital-marketing', label: 'Digital Marketing' },
    ],
  },
  { href: '/contact', label: 'Contact' },
  { href: '/career', label: 'Careers' },
]

// Navigation Loader Component
const NavigationLoader = React.memo(() => (
  <>
    <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200/20">
      <div className="h-full bg-gradient-to-r from-[#188f8b] to-[#16807c] animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
    </div>
  </>
))

NavigationLoader.displayName = 'NavigationLoader'

// Enhanced Link component with loading state
const NavigationLink = React.memo(({ 
  href, 
  children, 
  className = '', 
  onClick,
  onLoadingStart
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onLoadingStart?: () => void
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (href !== pathname) {
      onLoadingStart?.()
      // Small delay to show loader before navigation
      setTimeout(() => {
        router.push(href)
      }, 100)
      e.preventDefault()
    }
    onClick?.()
  }, [href, pathname, router, onClick, onLoadingStart])

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
})

NavigationLink.displayName = 'NavigationLink'

// Memoized subcomponents to prevent unnecessary re-renders
const MobileNavItem = React.memo(({ item, pathname, onClose, onLoadingStart }: { 
  item: typeof navItems[0], 
  pathname: string, 
  onClose: () => void,
  onLoadingStart: () => void
}) => {
  const isActive = pathname === item.href ||
    (item.subItems && item.subItems.some(sub => pathname === sub.href))

  if (item.subItems) {
    return (
      <div>
        <div className={`px-5 py-3 rounded-xl font-bold text-lg ${isActive
          ? 'text-[#188f8b]'
          : 'text-gray-900 dark:text-white'
          }`}>
          {item.label}
        </div>
        <div className="pl-3 space-y-1">
          {item.subItems.map(sub => (
            <NavigationLink
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              onLoadingStart={onLoadingStart}
              className={`block px-5 py-2 rounded-lg text-base font-medium transition-all duration-200
                ${pathname === sub.href
                  ? 'text-[#188f8b] underline underline-offset-4'
                  : 'hover:text-[#188f8b] text-gray-700 dark:text-gray-300'
                }`}
            >
              {sub.label}
            </NavigationLink>
          ))}
        </div>
      </div>
    )
  }

  return (
    <NavigationLink
      href={item.href}
      onClick={onClose}
      onLoadingStart={onLoadingStart}
      className={`block px-5 py-3 rounded-xl font-bold text-lg transition-all duration-200
        ${isActive
          ? 'text-[#188f8b] underline underline-offset-4'
          : 'hover:text-[#188f8b] text-gray-900 dark:text-white'
        }`}
    >
      {item.label}
    </NavigationLink>
  )
})

MobileNavItem.displayName = 'MobileNavItem'

const DesktopNavItem = React.memo(({ item, pathname, isServicesOpen, setIsServicesOpen, dropdownRef, onLoadingStart }: {
  item: typeof navItems[0],
  pathname: string,
  isServicesOpen: boolean,
  setIsServicesOpen: (value: boolean | ((prev: boolean) => boolean)) => void,
  dropdownRef: React.RefObject<HTMLDivElement>,
  onLoadingStart: () => void
}) => {
  const isActive = pathname === item.href ||
    (item.subItems && item.subItems.some(sub => pathname === sub.href))

  const handleServicesToggle = useCallback(() => {
    setIsServicesOpen(prev => !prev)
  }, [setIsServicesOpen])

  const handleServicesClose = useCallback(() => {
    setIsServicesOpen(false)
  }, [setIsServicesOpen])

  if (item.subItems) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleServicesToggle}
          className={`flex items-center gap-1 px-4 py-2 font-medium transition-colors duration-200
            ${isActive ? 'text-[#188f8b]' : 'text-gray-700 dark:text-gray-300'}
          `}
        >
          {item.label}
          <ChevronDown className={`ml-1 w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`absolute left-0 mt-2 w-56 rounded-xl bg-white/95 dark:bg-gray-900/95 shadow-2xl ring-1 ring-gray-200/40 dark:ring-gray-700/40 py-2 z-50 transition-all duration-200
          ${isServicesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
          {item.subItems.map(sub => (
            <NavigationLink
              key={sub.href}
              href={sub.href}
              onClick={handleServicesClose}
              onLoadingStart={onLoadingStart}
              className={`block px-5 py-2 rounded-lg font-medium transition-all duration-200
                ${pathname === sub.href
                  ? 'text-[#188f8b] underline underline-offset-4'
                  : 'hover:text-[#188f8b] text-gray-700 dark:text-gray-300'}
              `}
            >
              {sub.label}
            </NavigationLink>
          ))}
        </div>
      </div>
    )
  }

  return (
    <NavigationLink
      href={item.href}
      onLoadingStart={onLoadingStart}
      className={`relative px-4 py-2 font-medium transition-colors duration-200
        ${isActive
          ? 'text-[#188f8b] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-8 after:h-[2px] after:bg-[#188f8b] after:rounded-full after:transition-all after:duration-300 after:content-[""]'
          : 'text-gray-700 dark:text-gray-300 hover:text-[#188f8b]'}
      `}
    >
      {item.label}
    </NavigationLink>
  )
})

DesktopNavItem.displayName = 'DesktopNavItem'

export default function WorldClassHeader() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    budget: '',
    email: '',
    projectDescription: ''
  })
  const dropdownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  // Memoize callbacks to prevent unnecessary re-renders
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(v => !v)
  }, [])

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setIsMobileMenuOpen(false)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleLoadingStart = useCallback(() => {
    setIsNavigating(true)
    // Hide loader after navigation completes
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }, [])

  // Hide navigation loader when route changes
  useEffect(() => {
    setIsNavigating(false)
  }, [pathname])

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    return handleScroll
  }, [])

  useEffect(() => {
    const handleScroll = throttledScrollHandler()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttledScrollHandler])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setIsModalOpen(false)
      setFormData({
        name: '',
        companyName: '',
        budget: '',
        email: '',
        projectDescription: ''
      })
    }, 3000)
  }, [formData])

  // Memoize header class to prevent recalculation
  const headerClasses = useMemo(() => 
    `fixed w-full z-50 top-0 transition-all duration-500 ${
      scrolled
        ? 'bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur-xl'
        : 'bg-transparent'
    }`, 
    [scrolled]
  )

  return (
    <>
      {/* Navigation Loader */}
      {isNavigating && <NavigationLoader />}
      
      <header className={headerClasses}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <NavigationLink href="/" className="flex items-center group" onLoadingStart={handleLoadingStart}>
            <Image
              src="/seraxmi-Dark.svg"
              alt="Seraxmi Logo"
              width={44}
              height={44}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="ml-3 font-light text-2xl tracking-tight text-gray-900 dark:text-white select-none">
              SERAXMI
            </span>
          </NavigationLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map(item => (
              <DesktopNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                isServicesOpen={isServicesOpen}
                setIsServicesOpen={setIsServicesOpen}
                dropdownRef={dropdownRef}
                onLoadingStart={handleLoadingStart}
              />
            ))}
            <button
              onClick={openModal}
              className="ml-6 px-6 py-2.5 rounded-full font-semibold text-[#188f8b] border border-[#188f8b] hover:border-[#16807c] hover:bg-[#188f8b] hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              {isNavigating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <PhoneCall className="w-5 h-5" />
              )}
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-3 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={handleMobileMenuClose}></div>
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white/95 dark:bg-gray-900/95 shadow-2xl transition-transform duration-400 ease-out">
            <div className="pt-24 pb-8 px-8">
              <nav className="space-y-4">
                {navItems.map(item => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onClose={handleMobileMenuClose}
                    onLoadingStart={handleLoadingStart}
                  />
                ))}
                <button
                  onClick={openModal}
                  className="flex items-center justify-center mt-8 px-7 py-3 rounded-full font-bold text-[#188f8b] border border-[#188f8b] hover:border-[#16807c] shadow-xl transition-all duration-200 w-full"
                >
                  {isNavigating ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <PhoneCall className="w-5 h-5 mr-2" />
                  )}
                  Book a Call
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Book a Call Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20">
            {!isSubmitted ? (
              <>
                {/* Modal Header */}
                <div className="relative px-8 pt-8 pb-6 border-b border-gray-200/20 dark:border-gray-700/20">
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#188f8b] to-[#16807c] rounded-2xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Book a Call</h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Let&apos;s discuss your project and bring your vision to life</p>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <User className="w-5 h-5 text-[#188f8b]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Company Name Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <Building className="w-5 h-5 text-[#188f8b]" />
                      Company Name <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Budget Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <DollarSign className="w-5 h-5 text-[#188f8b]" />
                      Project Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                    >
                      <option value="">Select your budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-50k">$30,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <Mail className="w-5 h-5 text-[#188f8b]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Project Description Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <FileText className="w-5 h-5 text-[#188f8b]" />
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200 resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#188f8b] to-[#16807c] hover:from-[#16807c] hover:to-[#147571] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-6 h-6" />
                    Book a Meeting
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Your meeting request has been submitted successfully.</p>
                <p className="text-[#188f8b] font-semibold text-lg">Stay updated on your Gmail account please.</p>
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">We&apos;ll reach out to you within 24 hours to schedule your consultation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}