import React from 'react';
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
  return (
<div className="relative overflow-hidden py-8 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] backdrop-blur-sm mb-12">

      {/* Gradient edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#b9e7ff] opacity-30 blur-3xl rounded-full animate-pulse" />
    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ffd6fc] opacity-20 blur-2xl rounded-full animate-pulse delay-1000" />
    <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-[#fffacb] opacity-25 blur-2xl rounded-full animate-pulse delay-2000" />
  </div>

      {/* Marquee */}
      <motion.div
        className="flex whitespace-nowrap gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div key={`${tech}-${i}`} className="text-xl font-medium text-neutral-800 hover:text-blue-600 transition">
            {tech}
            <span className="mx-6 text-neutral-300">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStackMarquee;
