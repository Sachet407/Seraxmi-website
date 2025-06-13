"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java',
  'Figma', 'Adobe XD', 'Webflow', 'Photoshop',
  'Google Analytics', 'SEO', 'Mailchimp', 'HubSpot',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
  'GraphQL', 'Express', 'MongoDB', 'PostgreSQL'
];

const TechStackMarquee = () => {
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Run on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine device type and animation settings
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  const getAnimationDuration = () => {
    if (isMobile) return 15; // Fast on mobile
    if (isTablet) return 20; // Medium on tablet
    return 30; // Slower on desktop
  };

  const getFontSize = () => {
    if (isMobile) return 'text-sm';
    if (isTablet) return 'text-base';
    return 'text-lg';
  };

  const getSpacing = () => {
    if (isMobile) return 'gap-4';
    if (isTablet) return 'gap-6';
    return 'gap-8';
  };

  const getPadding = () => {
    if (isMobile) return 'py-4';
    if (isTablet) return 'py-6';
    return 'py-8';
  };

  return (
    <div className={`relative overflow-hidden ${getPadding()} bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] backdrop-blur-sm mb-8 md:mb-12`}>
      
      {/* Gradient edges - responsive width */}
      <div className={`absolute left-0 top-0 h-full ${isMobile ? 'w-8' : 'w-16 md:w-24'} bg-gradient-to-r from-white to-transparent z-10`} />
      <div className={`absolute right-0 top-0 h-full ${isMobile ? 'w-8' : 'w-16 md:w-24'} bg-gradient-to-l from-white to-transparent z-10`} />

      {/* Floating blobs - responsive sizing */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-1/3 left-1/4 ${isMobile ? 'w-48 h-48' : 'w-64 h-64 md:w-96 md:h-96'} bg-[#b9e7ff] opacity-20 md:opacity-30 blur-2xl md:blur-3xl rounded-full animate-pulse`} />
        <div className={`absolute top-0 right-1/4 ${isMobile ? 'w-56 h-56' : 'w-80 h-80 md:w-[500px] md:h-[500px]'} bg-[#ffd6fc] opacity-15 md:opacity-20 blur-xl md:blur-2xl rounded-full animate-pulse delay-1000`} />
        <div className={`absolute bottom-0 left-1/3 ${isMobile ? 'w-40 h-40' : 'w-56 h-56 md:w-72 md:h-72'} bg-[#fffacb] opacity-20 md:opacity-25 blur-xl md:blur-2xl rounded-full animate-pulse delay-2000`} />
      </div>

      {/* Marquee */}
      <motion.div
        className={`flex whitespace-nowrap ${getSpacing()}`}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: getAnimationDuration(),
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className={`${getFontSize()} font-medium text-neutral-700 hover:text-blue-600 transition-colors duration-200 flex items-center`}
          >
            <span className="flex-shrink-0">{tech}</span>
            <span className={`${isMobile ? 'mx-2' : 'mx-3 md:mx-4'} text-neutral-400 flex-shrink-0`}>•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStackMarquee;