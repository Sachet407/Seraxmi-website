"use client";
import React from "react";
import { Cpu, BrainCircuit, Bot, Database, Network, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AIMLSolutionsPage = () => {
  // Enhanced neural network configuration
  const neuralLayers = [
    { label: "Input", nodes: 4, color: "from-blue-500 to-blue-600" },
    { label: "Hidden 1", nodes: 6, color: "from-purple-500 to-purple-600" },
    { label: "Hidden 2", nodes: 5, color: "from-pink-500 to-pink-600" },
    { label: "Output", nodes: 3, color: "from-green-500 to-green-600" }
  ];

  const services = [
    {
      title: "Predictive Analytics",
      description: "Forecast trends with machine learning models",
      icon: <BrainCircuit className="w-8 h-8 text-[#188f8b]" />,
      features: ["Time Series", "Behavior Prediction", "Risk Assessment"],
    },
    {
      title: "Computer Vision",
      description: "Image and video analysis powered by AI",
      icon: <Cpu className="w-8 h-8 text-[#188f8b]" />,
      features: ["Object Detection", "Facial Recognition", "Medical Imaging"],
    },
    {
      title: "NLP Solutions",
      description: "Understand and generate human language",
      icon: <Bot className="w-8 h-8 text-[#188f8b]" />,
      features: ["Chatbots", "Sentiment Analysis", "Text Summarization"],
    },
    {
      title: "Anomaly Detection",
      description: "Identify unusual patterns in data",
      icon: <Network className="w-8 h-8 text-[#188f8b]" />,
      features: ["Fraud Detection", "Network Security", "Quality Control"],
    },
    {
      title: "Recommendation Engines",
      description: "Personalized suggestions for users",
      icon: <Database className="w-8 h-8 text-[#188f8b]" />,
      features: ["Product Recs", "Content Curation", "Personalized Marketing"],
    },
    {
      title: "Process Automation",
      description: "AI-powered workflow optimization",
      icon: <Cpu className="w-8 h-8 text-[#188f8b]" />,
      features: ["Document Processing", "Data Extraction", "Intelligent Routing"],
    }
  ];

  const stats = [
    { value: "90%", label: "Accuracy", icon: <BrainCircuit className="w-6 h-6" /> },
    { value: "10x", label: "Faster Processing", icon: <Cpu className="w-6 h-6" /> },
    { value: "24/7", label: "AI Monitoring", icon: <Network className="w-6 h-6" /> },
    { value: "100+", label: "Models Deployed", icon: <Database className="w-6 h-6" /> }
  ];

  // Improved Neural Network Visualization
  const NeuralNetwork = () => {
    const layerSpacing = 100 / (neuralLayers.length - 1);
    
    return (
      <div className="relative w-full h-64 md:h-96">
        {/* Connections */}
        {neuralLayers.slice(0, -1).map((layer, layerIdx) => (
          [...Array(layer.nodes)].map((_, nodeIdx) => (
            [...Array(neuralLayers[layerIdx + 1].nodes)].map((_, nextNodeIdx) => (
              <motion.div
                key={`conn-${layerIdx}-${nodeIdx}-${nextNodeIdx}`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.15, pathLength: 1 }}
                transition={{ 
                  delay: layerIdx * 0.2 + nodeIdx * 0.05,
                  duration: 1.5,
                  type: "spring"
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <svg className="w-full h-full">
                  <line
                    x1={`${layerIdx * layerSpacing}%`}
                    y1={`${((nodeIdx + 0.5) / layer.nodes) * 100}%`}
                    x2={`${(layerIdx + 1) * layerSpacing}%`}
                    y2={`${((nextNodeIdx + 0.5) / neuralLayers[layerIdx + 1].nodes) * 100}%`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-red-900 "
                  />
                </svg>
              </motion.div>
            ))
          ))
        ))}

        {/* Nodes */}
        {neuralLayers.map((layer, layerIdx) => (
          <div 
            key={`layer-${layerIdx}`}
            className="absolute top-0 h-full flex flex-col justify-around"
            style={{ left: `${layerIdx * layerSpacing}%` }}
          >
            {[...Array(layer.nodes)].map((_, nodeIdx) => (
              <motion.div
                key={`node-${layerIdx}-${nodeIdx}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.3 + layerIdx * 0.2 + nodeIdx * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
                className={`relative w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${layer.color} shadow-md`}
              />
            ))}
          </div>
        ))}

        {/* Layer Labels */}
        {neuralLayers.map((layer, layerIdx) => (
          <div 
            key={`label-${layerIdx}`}
            className="absolute bottom-0 left-0 right-0 text-center"
            style={{ left: `${layerIdx * layerSpacing}%`, width: `${layerSpacing}%` }}
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + layerIdx * 0.1 }}
              className="text-xs md:text-sm font-medium text-slate-600  inline-block px-2 py-1 bg-white/50  rounded-md"
            >
              {layer.label}
            </motion.span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 ">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50  border border-blue-200 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4 animate-pulse text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent Systems
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
              AI & ML Solutions
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Transform your business with cutting-edge artificial intelligence
            </p>
          </div>

          {/* Neural Network Visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-slate-200"
          >
            <NeuralNetwork />
            <div className="mt-6 text-center text-sm text-slate-500">
              Neural network architecture visualization
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900  mb-4">
              Our AI/ML Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Custom solutions leveraging the latest AI advancements
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
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50  border border-slate-200 "
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-[#188f8b]/10 p-3 rounded-xl mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#188f8b] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-600">{feature}</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-[#188f8b]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Harness AI?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how AI can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#188f8b] font-semibold rounded-lg shadow-lg hover:bg-slate-100 transition-colors duration-300">
                Get AI Consultation
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMLSolutionsPage;