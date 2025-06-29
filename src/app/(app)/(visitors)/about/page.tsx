"use client";
import React from "react";
import { Rocket, Users, Globe, Shield, Code, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // SVG abstract shapes for creative backgrounds
  const AbstractShape = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
      <path 
        d="M0,250 C150,350 350,150 500,250 L500,500 L0,500 Z" 
        fill="currentColor" 
        className="text-[#188f8b]/10 dark:text-[#188f8b]/5"
      />
    </svg>
  );

  const CircuitPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
      <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
        <path 
          d="M0 20 Q10 10 20 20 T40 20" 
          stroke="currentColor" 
          fill="none" 
          className="text-[#188f8b] dark:text-[#188f8b]/50"
          strokeWidth="1.5"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );

  const stats = [
    { value: "50+", label: "Projects Completed", icon: <Rocket className="w-6 h-6" /> },
    { value: "15+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
    { value: "100%", label: "Client Satisfaction", icon: <Users className="w-6 h-6" /> },
    { value: "24/7", label: "Global Support", icon: <Shield className="w-6 h-6" /> },
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "We push boundaries with cutting-edge technology solutions",
      icon: <Code className="w-8 h-8 text-[#188f8b]" />,
    },
    {
      title: "Excellence",
      description: "Quality is at the heart of everything we deliver",
      icon: <BarChart2 className="w-8 h-8 text-[#188f8b]" />,
    },
    {
      title: "Integrity",
      description: "We build trust through transparency and honesty",
      icon: <Shield className="w-8 h-8 text-[#188f8b]" />,
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      // Creative placeholder using initials and gradient
      avatar: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#188f8b] to-purple-500 text-white text-4xl font-bold">
          AJ
        </div>
      ),
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      avatar: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl font-bold">
          SW
        </div>
      ),
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      avatar: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-[#188f8b] text-white text-4xl font-bold">
          MC
        </div>
      ),
    },
    {
      name: "Priya Patel",
      role: "UX Director",
      avatar: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-400 text-white text-4xl font-bold">
          PP
        </div>
      ),
    },
  ];

  // Creative office placeholder
  const OfficePlaceholder = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 w-3/4">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i}
              className={`h-16 rounded-lg ${i % 3 === 0 ? 'bg-[#188f8b]/30' : i % 3 === 1 ? 'bg-purple-500/30' : 'bg-blue-500/30'}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-6">
        <div className="text-white">
          <p className="text-sm font-medium">Our Creative Space</p>
          <h3 className="text-xl font-bold mt-1">Where Ideas Become Reality</h3>
        </div>
      </div>
      <CircuitPattern />
    </div>
  );

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30 overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <AbstractShape />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            Pioneering Digital Excellence
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Transforming visions into reality through innovative technology solutions since 2015
          </p>
        </motion.div>

        {/* Company overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-96"
          >
            <OfficePlaceholder />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Building the Future, One Solution at a Time
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Founded in 2025, Seraxmi began as a small team of passionate developers with a vision to 
                bridge the digital divide. Today, we&apos;re a global technology partner serving clients worldwide.
              </p>
              <p>
                Our journey has been marked by relentless innovation, from our first mobile app to our current AI-powered 
                enterprise solutions. We&apos;ve stayed true to our core belief: technology should empower, not complicate.
              </p>
              <p>
                What sets us apart is our human-centered approach. We don&apos;t just build software - we craft digital 
                experiences that solve real problems and create meaningful impact.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 md:mb-32"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#188f8b]/10 dark:bg-[#188f8b]/5"></div>
              <div className="bg-[#188f8b]/10 p-3 rounded-full mb-4 text-[#188f8b] relative z-10">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">{stat.value}</h4>
              <p className="text-slate-600 dark:text-slate-400 relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Core values */}
        <div className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide every decision we make and every solution we deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 hover:border-[#188f8b] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#188f8b]/10 dark:bg-[#188f8b]/5 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center mb-4 relative z-10">
                  <div className="bg-[#188f8b]/10 p-2 rounded-lg mr-4">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{value.title}</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 relative z-10">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Meet Our Leadership
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The brilliant minds driving our vision forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-square shadow-lg">
                  {member.avatar}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#188f8b] transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;