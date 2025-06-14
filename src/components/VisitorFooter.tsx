"use client";
import Link from "next/link";
import Image from 'next/image';
import { motion, LazyMotion, domAnimation } from "framer-motion";

export default function VisitorFooter() {
  const locations = [
    {
      city: "Kathmandu, Nepal",
      address: "Durbar Marg, Central Business District",
      contact: "+977 1-1234567"
    },
    {
      city: "New Delhi, India",
      address: "Connaught Place, Central Delhi",
      contact: "+91 11 1234 5678"
    },
    {
      city: "New Mexico, USA",
      address: "Albuquerque Tech Park",
      contact: "+1 (505) 123-4567"
    }
  ];

  const services = [
    { name: "Web Development", path: "/services/web-development" },
    { name: "App Development", path: "/services/app-development" },
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "Cyber Security", path: "/services/cyber-security" },
    { name: "AI & ML Solutions", path: "/services/ai-ml" },
    { name: "Cloud Solutions", path: "/services/cloud" },
  ];

  const socialLinks = [
    { 
      name: "Facebook",
      icon: <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />,
      url: "#"
    },
    { 
      name: "LinkedIn",
      icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
      url: "#"
    },
    { 
      name: "Twitter",
      icon: <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />,
      url: "#"
    },
    { 
      name: "Instagram",
      icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
      url: "#"
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-24 pb-8 overflow-hidden">
        {/* Wavy top border */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-16 md:h-24" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-current text-gray-900"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-current text-gray-900"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-gray-900"
            />
          </svg>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#188f8b]/10 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-70" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="space-y-6"
            >
              <Link href="/" className="flex items-center group w-fit">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="relative w-12 h-12"
                >
                  <Image
                    src="/seraxmi-Light.svg"
                    alt="Seraxmi Logo"
                    fill
                    loading="lazy"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    priority={false}
                  />
                </motion.div>
                <span className="ml-3 text-2xl font-bold text-white hover:text-[#188f8b] transition-colors duration-300">
                  Seraxmi
                </span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Transforming businesses with cutting-edge digital solutions across the globe.
              </p>
              <div className="flex space-x-5">
                {socialLinks.map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.url} 
                    className="text-gray-400 hover:text-[#188f8b] transition-colors duration-300"
                    aria-label={social.name}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut", delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white border-b-2 border-[#188f8b] pb-2 inline-block">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <motion.li 
                    key={service.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    <Link 
                      href={service.path}
                      className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-start group"
                    >
                      <svg 
                        className="w-4 h-4 mt-1 mr-2 text-[#188f8b] flex-shrink-0 group-hover:animate-pulse" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {service.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Locations Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut", delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white border-b-2 border-[#188f8b] pb-2 inline-block">
                Our Locations
              </h3>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <motion.div 
                    key={index} 
                    className="flex group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative h-5 w-5">
                        <svg 
                          className="absolute h-5 w-5 text-[#188f8b] group-hover:opacity-0 transition-opacity duration-300" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <svg 
                          className="absolute h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-white group-hover:text-[#188f8b] transition-colors duration-300">
                        {location.city}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1 group-hover:text-white transition-colors duration-300">
                        {location.address}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 group-hover:text-white transition-colors duration-300">
                        {location.contact}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut", delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white border-b-2 border-[#188f8b] pb-2 inline-block">
                Contact Us
              </h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                >
                  <div className="relative h-5 w-5 mt-1 mr-3 flex-shrink-0">
                    <svg 
                      className="absolute h-5 w-5 text-[#188f8b] group-hover:opacity-0 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <svg 
                      className="absolute h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a 
                    href="mailto:info@seraxmi.com" 
                    className="text-gray-400 hover:text-white hover:underline transition-colors duration-300"
                  >
                    info@seraxmi.com
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                >
                  <div className="relative h-5 w-5 mt-1 mr-3 flex-shrink-0">
                    <svg 
                      className="absolute h-5 w-5 text-[#188f8b] group-hover:opacity-0 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <svg 
                      className="absolute h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <a 
                    href="tel:+5551234567" 
                    className="text-gray-400 hover:text-white hover:underline transition-colors duration-300"
                  >
                    Global Support: +1 (555) 123-4567
                  </a>
                </motion.div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-[#188f8b] pb-2 inline-block">
                  Newsletter
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Subscribe to our newsletter for the latest updates and offers.
                </p>
                <form className="flex flex-col gap-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-6 py-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#188f8b] transition-all duration-300 focus:shadow-lg focus:shadow-[#188f8b]/20 text-base"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent group-hover:border-[#188f8b]/30 transition-all duration-300" />
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-[#188f8b] to-teal-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#188f8b]/30 whitespace-nowrap text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Subscribe Now
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut", delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Seraxmi Technologies. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wavy bottom border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          <svg 
            className="relative block w-full h-16 md:h-24" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-current text-gray-900"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-current text-gray-900"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-gray-900"
            />
          </svg>
        </div>
      </footer>
    </LazyMotion>
  );
}