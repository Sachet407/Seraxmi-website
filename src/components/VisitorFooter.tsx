import Link from "next/link"
import Image from 'next/image'

export default function VisitorFooter() {
  return (
   <footer className="px-6 py-16 md:w-[80%] md:mx-auto rounded-2xl md:mt-16 md:mb-14 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="mb-8">
          <Link href="/" className="flex items-center group w-fit">
            <Image
              src="/seraxmi-Light.svg" // Assuming you have a light version of the logo
              alt="Seraxmi Logo"
              width={60}
              height={60}
              className="object-contain transition-transform duration-200 group-hover:scale-110"
              priority
            />
            <span className="ml-3 text-2xl font-bold text-gray-800">
              Seraxmi
            </span>
          </Link>
        </div>

        {/* Desktop Layout - Horizontal arrangement */}
        <div className="hidden md:block">
          {/* Quick Links - Single line horizontally */}
          <div className="mb-8 flex  gap-11">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Links</h3>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/visitor" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/about" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/services" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/contact" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Horizontal arrangement */}
          <div >
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Contact Us</h3>
            <div className="flex space-x-12">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@seraxmi.com" className="text-gray-600 hover:text-gray-900 hover:underline">info@seraxmi.com</a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+5551234567" className="text-gray-600 hover:text-gray-900 hover:underline">(555) 123-4567</a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-600">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical arrangement */}
        <div className="md:hidden space-y-8">
          {/* Quick Links - Vertical */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/visitor" 
                  className="text-gray-600 hover:text-gray-900 transition-colors block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/about" 
                  className="text-gray-600 hover:text-gray-900 transition-colors block py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/services" 
                  className="text-gray-600 hover:text-gray-900 transition-colors block py-1"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/visitor/contact" 
                  className="text-gray-600 hover:text-gray-900 transition-colors block py-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Vertical */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@seraxmi.com" className="text-gray-600 hover:text-gray-900 hover:underline">info@seraxmi.com</a>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+5551234567" className="text-gray-600 hover:text-gray-900 hover:underline">(555) 123-4567</a>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-600">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0 text-sm">
            &copy; {new Date().getFullYear()} Seraxmi. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}