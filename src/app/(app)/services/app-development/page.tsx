"use client";
import React from "react";
import { Smartphone, Cpu, Zap, ArrowRight, Code, Database, Shield, SmartphoneCharging, Globe } from "lucide-react";
import { motion } from "framer-motion";


const AppDevelopmentPage = () => {
  const services = [
    {
      title: "iOS Apps",
      description: "Premium native apps for iPhone and iPad",
      icon: <Smartphone className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Swift", "SwiftUI", "ARKit"],
      bg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-950/10"
    },
    {
      title: "Android Apps",
      description: "High-performance Android applications",
      icon: <SmartphoneCharging className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Kotlin", "Jetpack Compose", "Material 3"],
      bg: "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-950/10"
    },
    {
      title: "Cross-Platform",
      description: "Single codebase for all platforms",
      icon: <Globe className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Flutter", "React Native", "KMM"],
      bg: "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-950/10"
    },
    {
      title: "Backend Integration",
      description: "Powerful server-side functionality",
      icon: <Database className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Node.js", "Firebase", "GraphQL"],
      bg: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-950/10"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces",
      icon: <Code className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Figma", "Lottie", "Micro-interactions"],
      bg: "bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/20 dark:to-pink-950/10"
    },
    {
      title: "App Security",
      description: "Enterprise-grade protection",
      icon: <Shield className="w-8 h-8 text-[#188f8b]" />,
      tech: ["Biometrics", "Encryption", "OWASP"],
      bg: "bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-950/10"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Strategy & Planning",
      description: "We define your app's goals, features, and roadmap",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Crafting pixel-perfect interfaces with delightful interactions",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    },
    {
      step: "03",
      title: "Development",
      description: "Building robust, scalable mobile solutions",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Ensuring flawless performance across devices",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    },
    {
      step: "05",
      title: "Deployment",
      description: "App store submission and launch support",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4 animate-pulse text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Mobile Solutions
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
              App Development
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Crafting high-performance mobile experiences that users love
            </p>
          </div>

          {/* Floating Phone Mockup */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-64 md:w-80 h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-slate-900 rounded-[40px] shadow-2xl border-[12px] border-slate-900 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900 flex items-center justify-center">
                  <div className="w-24 h-5 bg-slate-800 rounded-full"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <Cpu className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Your App Here</h3>
                    <p className="text-sm opacity-80">Premium mobile experience</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-4 bg-slate-800 rounded-full shadow-lg"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive App Development
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              End-to-end solutions for every stage of your mobile journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${service.bg} border border-slate-200 dark:border-slate-700`}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-[#188f8b]/10 p-3 rounded-xl mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-xs font-medium px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-6">
                  <button className="text-[#188f8b] hover:text-[#147a76] font-medium flex items-center group-hover:underline">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our App Development Process
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A proven methodology for delivering exceptional mobile experiences
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#188f8b] to-purple-500 -ml-px"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative lg:flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="flex items-center mb-6">
                      <div className="bg-[#188f8b] text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-6">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 pl-20 lg:pl-0">
                      {step.description}
                    </p>
                  </div>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'} mt-8 lg:mt-0`}>
                    <div className="relative h-64 md:h-80 lg:h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
                      <svg 
                        className="w-32 h-32 text-[#188f8b] opacity-20" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        {step.icon}
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#188f8b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to build your dream app?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#188f8b] font-semibold rounded-lg shadow-lg hover:bg-slate-100 transition-colors duration-300">
                Start Your Project
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppDevelopmentPage;