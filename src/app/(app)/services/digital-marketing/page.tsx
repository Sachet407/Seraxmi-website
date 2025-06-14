"use client";
import React from "react";
import { BarChart2, Search, Smartphone, Mail, Users, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const DigitalMarketingPage = () => {
  // Data for the bar chart
  const campaignResults = [
    { month: "Jan", growth: 35 },
    { month: "Feb", growth: 52 },
    { month: "Mar", growth: 48 },
    { month: "Apr", growth: 67 },
    { month: "May", growth: 73 },
    { month: "Jun", growth: 85 }
  ];

  const services = [
    {
      title: "SEO Optimization",
      description: "Dominate search results and drive organic traffic",
      icon: <Search className="w-8 h-8 text-[#188f8b]" />,
      results: ["+300% Traffic", "Top 3 Rankings", "Content Strategy"],
      bg: "bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/10 dark:to-blue-950/5"
    },
    {
      title: "PPC Advertising",
      description: "Precision-targeted ads for maximum conversions",
      icon: <BarChart2 className="w-8 h-8 text-[#188f8b]" />,
      results: ["5x ROAS", "Low CPC", "Smart Bidding"],
      bg: "bg-gradient-to-br from-purple-100/50 to-purple-50 dark:from-purple-900/10 dark:to-purple-950/5"
    },
    {
      title: "Social Media Marketing",
      description: "Engage audiences across all platforms",
      icon: <Users className="w-8 h-8 text-[#188f8b]" />,
      results: ["3M+ Reach", "50%+ Engagement", "Community Growth"],
      bg: "bg-gradient-to-br from-green-100/50 to-green-50 dark:from-green-900/10 dark:to-green-950/5"
    },
    {
      title: "Email Marketing",
      description: "Convert leads with targeted campaigns",
      icon: <Mail className="w-8 h-8 text-[#188f8b]" />,
      results: ["40% Open Rate", "25% CTR", "Automation"],
      bg: "bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/10 dark:to-amber-950/5"
    },
    {
      title: "Content Marketing",
      description: "Storytelling that drives action",
      icon: <Search className="w-8 h-8 text-[#188f8b]" />,
      results: ["10x Shares", "Brand Authority", "Thought Leadership"],
      bg: "bg-gradient-to-br from-red-100/50 to-red-50 dark:from-red-900/10 dark:to-red-950/5"
    },
    {
      title: "Mobile Marketing",
      description: "Reach customers on their devices",
      icon: <Smartphone className="w-8 h-8 text-[#188f8b]" />,
      results: ["App Installs", "SMS Campaigns", "Push Notifications"],
      bg: "bg-gradient-to-br from-indigo-100/50 to-indigo-50 dark:from-indigo-900/10 dark:to-indigo-950/5"
    }
  ];

  const stats = [
    { value: "3.5M+", label: "Leads Generated", icon: <Users className="w-6 h-6" /> },
    { value: "87%", label: "Client Retention", icon: <BarChart2 className="w-6 h-6" /> },
    { value: "5.2x", label: "Average ROI", icon: <Zap className="w-6 h-6" /> },
    { value: "200+", label: "Successful Campaigns", icon: <Mail className="w-6 h-6" /> }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4 animate-pulse text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data-Driven Results
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
              Digital Marketing
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Transform your online presence with strategies that deliver measurable growth
            </p>
          </div>

          {/* Bar Chart Section - Now Working */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-end justify-between h-64">
              {campaignResults.map((result, index) => (
                <div key={index} className="flex flex-col items-center w-10 md:w-14">
                  <div className="relative w-full h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${result.growth}%` }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1,
                        type: "spring",
                        damping: 10
                      }}
                      className="w-full bg-gradient-to-t from-[#188f8b] to-teal-400 rounded-t-md"
                    />
                  </div>
                  <span className="text-xs mt-2 text-slate-600 dark:text-slate-400">{result.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Typical client growth trajectory</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/circuit-pattern.svg')]"></div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center backdrop-blur-sm"
              >
                <div className="bg-[#188f8b]/10 p-3 rounded-full mb-4 text-[#188f8b]">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our Marketing Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive strategies tailored to your business goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
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
                  <ul className="space-y-3">
                    {service.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#188f8b] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-600 dark:text-slate-400">{result}</span>
                      </li>
                    ))}
                  </ul>
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

      {/* Case Study Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center"
            >
              <div className="text-center p-8">
                <BarChart2 className="w-16 h-16 mx-auto mb-6 text-[#188f8b]" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Client Success Story</h3>
                <p className="text-slate-600 dark:text-slate-400">325% revenue growth in 6 months</p>
              </div>
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="inline-flex items-center px-4 py-2 bg-[#188f8b]/10 text-[#188f8b] rounded-full text-sm font-medium">
                  View Case Study
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Proven Results Across Industries
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Our data-driven approach delivers consistent growth regardless of your market:
              </p>
              <ul className="space-y-4">
                {[
                  "E-commerce: 5x ROAS average",
                  "SaaS: 70% reduction in CAC",
                  "Healthcare: 300% lead increase",
                  "Finance: 45% conversion lift",
                  "Education: 8x enrollment growth"
                ].map((result, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">{result}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#188f8b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/hexagon-pattern.svg')]"></div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can drive measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#188f8b] font-semibold rounded-lg shadow-lg hover:bg-slate-100 transition-colors duration-300">
                Get Free Strategy Session
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                See Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketingPage;