"use client";
import React, { useState, useEffect } from "react";
import { Zap, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
    const [currentService, setCurrentService] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const services = [
    "App Development",
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "AI/ML Solutions",
    "Cyber Security",
  ];

  const codeLines = [
    "const innovation = 'unlimited';",
    "",
    "function buildFuture() {",
    "  const creativity = 'boundless';",
    "  const technology = 'cutting-edge';",
    "  const passion = 'infinite';",
    "  ",
    "  return excellence + creativity;",
    "}"
  ];

  const coloredCodeLines = [
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
  ];

  // Service rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentLine >= codeLines.length) return;

    const currentLineText = codeLines[currentLine];
    const currentTypedLength = typedCode.split('\n')[currentLine]?.length || 0;

    if (currentTypedLength < currentLineText.length) {
      const timeout = setTimeout(() => {
        const lines = typedCode.split('\n');
        lines[currentLine] = currentLineText.slice(0, currentTypedLength + 1);
        setTypedCode(lines.join('\n'));
      }, 50 + Math.random() * 50);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      setTimeout(() => {
        if (currentLine < codeLines.length - 1) {
          setCurrentLine(prev => prev + 1);
          const lines = typedCode.split('\n');
          if (!lines[currentLine + 1]) {
            lines.push('');
            setTypedCode(lines.join('\n'));
          }
        } else {
          // Restart typing after a pause
          setTimeout(() => {
            setTypedCode('');
            setCurrentLine(0);
          }, 2000);
        }
      }, 300);
    }
  }, [typedCode, currentLine, isTyping]);

  interface CodeLinePart {
    text: string;
    color: string;
  }

  interface ColoredCodeLine {
    parts: CodeLinePart[];
  }

  const renderColoredLine = (lineIndex: number) => {
    const line: ColoredCodeLine = coloredCodeLines[lineIndex];
    const typedLines: string[] = typedCode.split('\n');
    const typedLine: string = typedLines[lineIndex] || '';

    let charCount = 0;
    return (
      <div key={lineIndex} className="min-h-[1.5rem]">
        {line.parts.map((part: CodeLinePart, partIndex: number) => {
          const startChar = charCount;
          const endChar = charCount + part.text.length;
          charCount += part.text.length;

          const visibleText = typedLine.slice(startChar, endChar);

          return (
            <span key={partIndex} className={part.color || "text-gray-300"}>
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
       <section className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        {/* Animated background elements - ONLY CHANGE MADE HERE */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* NEW - This will definitely show a grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[length:100px_100px] opacity-60 dark:opacity-20"
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

        {/* Rest of the code remains EXACTLY the same */}
        <div className="max-w-8xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
          {/* Left Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <Zap className="w-4 h-4 animate-pulse text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Leading Tech Solutions Provider
              </span>
              <Sparkles className="w-4 h-4 text-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold tracking-tight leading-tight">
                <span className="block bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Innovative

                  Digital Solutions
                </span>
              </h1>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-700 dark:text-slate-300">
                <span>for </span>
                <span className="relative inline-block">
                  <span
                    key={currentService}
                    className="bg-[#1a837f] bg-clip-text text-transparent font-semibold animate-pulse transition-all duration-700 ease-in-out"
                  >
                    {services[currentService]}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transform scale-x-0 animate-pulse" style={{ animation: 'scaleX 3s infinite' }}></div>
                </span>
              </div>
            </div>

            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your business with cutting-edge technology. From sleek mobile apps to smart AI/ML implementations, we empower your digital journey with innovation and excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
              <button className="group px-8 py-4 bg-[#188f8b] hover:from-blue-700 0 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group px-8 py-4 bg-transparent border-2 border-slate-300 dark:border-slate-600 hover:border-[#188f8b]  text-slate-700 font-semibold rounded-2xl hover:bg-purple-50  transition-all duration-300 flex items-center gap-2 hover:text-[#188f8b]">
                <span>Explore Services</span>
                <Sparkles className="w-4 h-4 group-hover:text-[#188f8b] transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Right Section - Code Editor */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-4xl">
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl rotate-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Main Code Editor */}
              <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 backdrop-blur-sm">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <div className="text-slate-400 text-sm font-mono">innovation.js</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 text-xs">Live</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-lg leading-relaxed">
                  <div className="space-y-1">
                    {coloredCodeLines.map((_, index) => renderColoredLine(index))}
                  </div>

                  {/* Cursor blink effect */}
                  <div className="mt-4 flex items-center space-x-2 text-green-400">
                    <span>//</span>
                    <span className="animate-pulse">Building the future...</span>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes scaleX {
          0%, 100% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
        }
      `}</style>
      </section>
  )
}

export default Hero