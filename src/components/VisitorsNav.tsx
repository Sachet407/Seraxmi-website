'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, PhoneCall, ChevronDown } from 'lucide-react'

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
      { href: '/services/ui-ux', label: 'UI/UX Design' },
      { href: '/services/digital-marketing', label: 'Digital Marketing' },
    ],
  },
  { href: '/contact', label: 'Contact' },
  { href: '/career', label: 'Careers' },
]

export default function WorldClassHeader() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className={`fixed w-full z-50 top-0 transition-all duration-500
        ${scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur-xl'
          : 'bg-transparent'}
      `}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
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
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map(item => {
              const isActive = pathname === item.href ||
                (item.subItems && item.subItems.some(sub => pathname === sub.href))

              if (item.subItems) {
                return (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsServicesOpen(prev => !prev)}
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
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-5 py-2 rounded-lg font-medium transition-all duration-200
                            ${pathname === sub.href
                              ? 'text-[#188f8b] underline underline-offset-4'
                              : 'hover:text-[#188f8b] text-gray-700 dark:text-gray-300'}
                          `}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-colors duration-200
                    ${isActive
                      ? 'text-[#188f8b] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-8 after:h-[2px] after:bg-[#188f8b] after:rounded-full after:transition-all after:duration-300 after:content-[""]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#188f8b]'}
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/book-a-call"
              className="ml-6 px-6 py-2.5 rounded-full font-semibold text-[#188f8b] border border-[#188f8b] hover:border-[#16807c]  hover:bg-[#188f8b] hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-5 h-5" />
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white/95 dark:bg-gray-900/95 shadow-2xl transition-transform duration-400 ease-out">
            <div className="pt-24 pb-8 px-8">
              <nav className="space-y-4">
                {navItems.map(item => {
                  const isActive = pathname === item.href ||
                    (item.subItems && item.subItems.some(sub => pathname === sub.href))
                  if (item.subItems) {
                    return (
                      <div key={item.href}>
                        <div className={`px-5 py-3 rounded-xl font-bold text-lg ${isActive
                          ? 'text-[#188f8b]'
                          : 'text-gray-900 dark:text-white'
                          }`}>
                          {item.label}
                        </div>
                        <div className="pl-3 space-y-1">
                          {item.subItems.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block px-5 py-2 rounded-lg text-base font-medium transition-all duration-200
                                ${pathname === sub.href
                                  ? 'text-[#188f8b] underline underline-offset-4'
                                  : 'hover:text-[#188f8b] text-gray-700 dark:text-gray-300'
                                }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-5 py-3 rounded-xl font-bold text-lg transition-all duration-200
                        ${isActive
                          ? 'text-[#188f8b] underline underline-offset-4'
                          : 'hover:text-[#188f8b] text-gray-900 dark:text-white'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <Link
                  href="/book-a-call"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center mt-8 px-7 py-3 rounded-full font-bold text-[#188f8b] border border-[#188f8b] hover:border-[#16807c] shadow-xl transition-all duration-200"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Book a Call
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
