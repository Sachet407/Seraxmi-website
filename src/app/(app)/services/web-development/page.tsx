"use client";
import React from "react";
import { Code, Globe, Shield, Cpu, Layout, Smartphone, Zap, ArrowRight, Star, Users, Award, CheckCircle } from "lucide-react";
import Image from "next/image";
const WebDevelopmentPage = () => {
  const services = [
    {
      title: "Custom Web Applications",
      description: "Tailored solutions that solve your unique business challenges with cutting-edge technology",
      icon: <Code className="w-8 h-8 text-teal-600" />,
      features: ["React/Next.js", "Node.js Backends", "Real-time Features"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center"
    },
    {
      title: "E-Commerce Solutions",
      description: "High-converting online stores with seamless checkout experiences and advanced analytics",
      icon: <Globe className="w-8 h-8 text-cyan-600" />,
      features: ["Shopify/Headless", "Payment Gateways", "Inventory Management"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center"
    },
    {
      title: "Enterprise Portals",
      description: "Secure internal systems for your organization with enterprise-grade security",
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      features: ["Role-based Access", "Data Encryption", "Audit Logs"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=center"
    },
    {
      title: "API Integrations",
      description: "Connect your web apps with other business systems seamlessly and efficiently",
      icon: <Cpu className="w-8 h-8 text-teal-700" />,
      features: ["REST/GraphQL", "Webhooks", "Third-party Services"],
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop&crop=center"
    },
    {
      title: "Responsive Design",
      description: "Flawless experiences across all devices with pixel-perfect precision",
      icon: <Smartphone className="w-8 h-8 text-cyan-700" />,
      features: ["Mobile-first", "Cross-browser", "Adaptive Layouts"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center"
    },
    {
      title: "CMS Development",
      description: "Content management made simple and powerful with intuitive interfaces",
      icon: <Layout className="w-8 h-8 text-emerald-700" />,
      features: ["WordPress", "Headless CMS", "Custom Admin Panels"],
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&crop=center"
    }
  ];

  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "Deep dive into your goals, target audience, and technical requirements to craft the perfect solution",
      icon: "1",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop&crop=center",
      color: "from-slate-600 to-slate-700"
    },
    {
      title: "Design & Prototyping",
      description: "Create stunning wireframes, UI mockups, and interactive prototypes that bring your vision to life",
      icon: "2",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop&crop=center",
      color: "from-teal-500 to-cyan-600"
    },
    {
      title: "Development & Integration",
      description: "Build with modern technologies, implementing robust architecture and seamless integrations",
      icon: "3",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop&crop=center",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Testing & Optimization",
      description: "Rigorous testing ensures quality, performance, and security across all platforms and devices",
      icon: "4",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop&crop=center",
      color: "from-cyan-500 to-teal-600"
    },
    {
      title: "Launch & Support",
      description: "Seamless deployment with ongoing monitoring, maintenance, and support for continuous success",
      icon: "5",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop&crop=center",
      color: "from-teal-600 to-emerald-700"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: <Award className="w-6 h-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "150+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-spin duration-[20s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50/80 to-slate-50/80 dark:from-teal-900/20 dark:to-slate-900/20 border border-teal-200/60 dark:border-teal-700/30 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
                <Zap className="w-4 h-4 animate-pulse text-teal-600 dark:text-teal-400" />
                <span className="bg-gradient-to-r from-teal-700 to-slate-700 dark:from-teal-400 dark:to-slate-300 bg-clip-text text-transparent">
                  Premium Web Solutions
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
                Web Development
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-teal-600 to-slate-600 dark:from-teal-400 dark:to-slate-400 bg-clip-text text-transparent">
                  That Delivers
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
                Building fast, secure, and scalable web experiences that drive real business results and exceed expectations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-slate-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start Your Project
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <Image
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center" 
                  alt="Modern web development workspace"
                  className="w-full h-80 object-cover"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-700">Live Development in Progress</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-400/80 to-slate-400/80 rounded-2xl rotate-12 opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-400/80 to-teal-500/80 rounded-xl -rotate-12 opacity-60 animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500/10 to-slate-500/10 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-teal-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Our Web Development Services
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs, delivered with precision and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-5 h-5 bg-gradient-to-br from-[#188f8b] to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-slate-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Our Proven Development Process
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              A structured, collaborative approach that ensures quality, efficiency, and exceptional results
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <div className={`w-20 h-1 bg-gradient-to-r ${step.color} rounded-full mt-2`}></div>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                  <button className="inline-flex items-center text-teal-600 hover:text-slate-700 font-medium group">
                    Learn about this phase
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={step.image} 
                        alt={step.title}
                        fill
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                      <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                        {step.icon}
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl opacity-20 rotate-12`}></div>
                    <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl opacity-30 -rotate-12`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-600 via-teal-600 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white mb-6">
              <Star className="w-4 h-4" />
              <span>Ready to Transform Your Digital Presence?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something
              <span className="block bg-gradient-to-r from-slate-200 to-teal-200 bg-clip-text text-transparent">
                Extraordinary Together
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your vision into a powerful web solution that drives growth, engages users, and delivers measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-4 bg-white text-teal-700 font-semibold rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Get Free Consultation
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <Globe className="w-5 h-5 mr-2" />
                View Case Studies
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">Trusted by industry leaders</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-24 h-8 bg-white/20 rounded-lg animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage;