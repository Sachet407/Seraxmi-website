"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Zap, ArrowRight, Sparkles,X, Calendar, Mail, User, Building, DollarSign, FileText, CheckCircle } from "lucide-react";



const Hero = () => {
  const [currentService, setCurrentService] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
      name: '',
      companyName: '',
      budget: '',
      email: '',
      projectDescription: ''
    })

  const services = useMemo(() => [
    "App Development",
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "AI/ML Solutions",
    "Cyber Security",
  ], []);

  const codeLines = useMemo(() => [
    "const innovation = 'unlimited';",
    "",
    "function buildFuture() {",
    "  const creativity = 'boundless';",
    "  const technology = 'cutting-edge';",
    "  const passion = 'infinite';",
    "  ",
    "  return excellence + impact;",
    "}"
  ], []);

  const coloredCodeLines = useMemo(() => [
    {
      parts: [
        { text: "const", color: "text-blue-400" },
        { text: " ", color: "" },
        { text: "innovation", color: "text-purple-400" },
        { text: " = ", color: "text-gray-300" },
        { text: "'unlimited'", color: "text-orange-400" },
        { text: ";", color: "text-gray-300" }
      ]
    },
    { parts: [{ text: "", color: "" }] },
    {
      parts: [
        { text: "function", color: "text-blue-400" },
        { text: " ", color: "" },
        { text: "buildFuture", color: "text-green-400" },
        { text: "() {", color: "text-gray-300" }
      ]
    },
    {
      parts: [
        { text: "  ", color: "" },
        { text: "const", color: "text-blue-400" },
        { text: " ", color: "" },
        { text: "creativity", color: "text-purple-400" },
        { text: " = ", color: "text-gray-300" },
        { text: "'boundless'", color: "text-orange-400" },
        { text: ";", color: "text-gray-300" }
      ]
    },
    {
      parts: [
        { text: "  ", color: "" },
        { text: "const", color: "text-blue-400" },
        { text: " ", color: "" },
        { text: "technology", color: "text-purple-400" },
        { text: " = ", color: "text-gray-300" },
        { text: "'cutting-edge'", color: "text-orange-400" },
        { text: ";", color: "text-gray-300" }
      ]
    },
    {
      parts: [
        { text: "  ", color: "" },
        { text: "const", color: "text-blue-400" },
        { text: " ", color: "" },
        { text: "passion", color: "text-purple-400" },
        { text: " = ", color: "text-gray-300" },
        { text: "'infinite'", color: "text-orange-400" },
        { text: ";", color: "text-gray-300" }
      ]
    },
    { parts: [{ text: "  ", color: "" }] },
    {
      parts: [
        { text: "  ", color: "" },
        { text: "return", color: "text-pink-400" },
        { text: " ", color: "" },
        { text: "excellence", color: "text-purple-400" },
        { text: " + ", color: "text-gray-300" },
        { text: "creativity", color: "text-purple-400" },
        { text: ";", color: "text-gray-300" }
      ]
    },
    { parts: [{ text: "}", color: "text-gray-300" }] }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  useEffect(() => {
    if (!isTyping || currentLine >= codeLines.length) return;

    const currentLineText = codeLines[currentLine];
    const currentTypedLength = typedCode.split('\n')[currentLine]?.length || 0;

    if (currentTypedLength < currentLineText.length) {
      const timeout = setTimeout(() => {
        const lines = typedCode.split('\n');
        lines[currentLine] = currentLineText.slice(0, currentTypedLength + 1);
        setTypedCode(lines.join('\n'));
      }, 50 + (currentLine % 3) * 25);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        if (currentLine < codeLines.length - 1) {
          setCurrentLine(prev => prev + 1);
          const lines = typedCode.split('\n');
          if (!lines[currentLine + 1]) {
            lines.push('');
            setTypedCode(lines.join('\n'));
          }
        } else {
          setTimeout(() => {
            setTypedCode('');
            setCurrentLine(0);
          }, 2000);
        }
      }, 300);
    }
  }, [typedCode, currentLine, isTyping, codeLines]);
      
  
  const closeModal =() => {
      setIsModalOpen(false)
    }
    const openModal = () => {
      setIsModalOpen(true)
  
    }
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
    const handleSubmit = (e: React.FormEvent) => {
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
    }

  const renderColoredLine = (lineIndex: number) => {
    const line = coloredCodeLines[lineIndex];
    const typedLines = typedCode.split('\n');
    const typedLine = typedLines[lineIndex] || '';

    let charCount = 0;
    return (
      <div key={`line-${lineIndex}`} className="min-h-[1.5rem]">
        {line.parts.map((part, partIndex) => {
          const startChar = charCount;
          const endChar = charCount + part.text.length;
          charCount += part.text.length;

          const visibleText = typedLine.slice(startChar, endChar);

          return (
            <span 
              key={`part-${lineIndex}-${partIndex}`} 
              className={part.color || "text-gray-300"}
            >
              {visibleText}
            </span>
          );
        })}
        {lineIndex === currentLine && typedLines[lineIndex] && (
          <span className="animate-pulse text-blue-400">|</span>
        )}
      </div>
    );
  };


  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[length:100px_100px] opacity-60 "
            style={{
              backgroundImage: `
                linear-gradient(to right, #1a837f22 1px, transparent 1px),
                linear-gradient(to bottom, #1a837f22 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5"></div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-16 relative z-10">
        <div className="text-center lg:text-left space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-gradient-to-r from-blue-50 to-purple-50  border border-blue-200  rounded-full text-xs md:text-sm font-medium shadow-lg backdrop-blur-sm mt-6 md:mt-0">
            <Zap className="w-3 h-3 md:w-4 md:h-4 animate-pulse text-blue-600 " />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leading Tech Solutions Provider
            </span>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 to-slate-700  bg-clip-text text-transparent">
                Innovative Digital Solutions
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-700 ">
              <span>for </span>
              <span className="relative inline-block" key={services[currentService]}>
                <span className="bg-[#1a837f] bg-clip-text text-transparent font-semibold animate-pulse transition-all duration-700 ease-in-out">
                  {services[currentService]}
                </span>
                <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transform scale-x-0 animate-pulse" style={{ animation: 'scaleX 3s infinite' }}></div>
              </span>
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-600  max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transform your business with cutting-edge technology. From sleek mobile apps to smart AI/ML implementations, we empower your digital journey with innovation and excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-6 md:pt-8">
            <button className="group px-6 py-3 md:px-8 md:py-4 bg-[#188f8b] hover:from-blue-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 md:gap-3 text-sm md:text-base" onClick={openModal}>
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            {/* <button className="group px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-slate-300 dark:border-slate-600 hover:border-[#188f8b] text-slate-700 font-semibold rounded-2xl hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 hover:text-[#188f8b] text-sm md:text-base">
              <span>Explore Services</span>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 group-hover:text-[#188f8b] transition-colors duration-300" />
            </button> */}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end mt-8 md:mt-0">
          <div className="relative w-full max-w-4xl">
            <div className="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl rotate-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-slate-800/80 border-b border-slate-700">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="text-slate-400 text-xs md:text-sm font-mono">innovation.js</div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-xs">Live</span>
                </div>
              </div>

              <div className="p-4 md:p-6 font-mono text-sm md:text-lg leading-relaxed">
                <div className="space-y-1">
                  {coloredCodeLines.map((_, index) => (
                    <React.Fragment key={`codeline-${index}`}>
                      {renderColoredLine(index)}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-3 md:mt-4 flex items-center space-x-2 text-green-400">
                  <span>{'//'}</span>
                  <span className="animate-pulse">Building the future...</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
        {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white  rounded-3xl shadow-2xl border border-gray-200/20 ">
            {!isSubmitted ? (
              <>
                {/* Modal Header */}
                <div className="relative px-8 pt-8 pb-6 border-b border-gray-200/20 ">
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100  transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#188f8b] to-[#16807c] rounded-2xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 ">Book a Call</h2>
                      <p className="text-gray-600  mt-1">Let&apos;s discuss your project and bring your vision to life</p>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700  mb-3">
                      <User className="w-5 h-5 text-[#188f8b]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300  bg-white  text-gray-900  placeholder-gray-500  focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Company Name Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700  mb-3">
                      <Building className="w-5 h-5 text-[#188f8b]" />
                      Company Name <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300  bg-white  text-gray-900  placeholder-gray-500  focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Budget Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700  mb-3">
                      <DollarSign className="w-5 h-5 text-[#188f8b]" />
                      Project Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300  bg-white  text-gray-900 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
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
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700  mb-3">
                      <Mail className="w-5 h-5 text-[#188f8b]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300  bg-white  text-gray-900 
                       placeholder-gray-500 focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Project Description Field */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700  mb-3">
                      <FileText className="w-5 h-5 text-[#188f8b]" />
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300  bg-white  text-gray-900  placeholder-gray-500  focus:ring-2 focus:ring-[#188f8b] focus:border-transparent outline-none transition-all duration-200 resize-none"
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
                <h3 className="text-2xl font-bold text-gray-900  mb-4">Thank You!</h3>
                <p className="text-gray-600  text-lg mb-2">Your meeting request has been submitted successfully.</p>
                <p className="text-[#188f8b] font-semibold text-lg">Stay updated on your Gmail account please.</p>
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 ">We&apos;ll reach out to you within 24 hours to schedule your consultation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;


