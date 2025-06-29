"use client";
import React from "react";
import { Shield, Lock, Fingerprint, EyeOff, Server, Network, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CyberSecurityPage = () => {
  // Predefined positions for threat visualization nodes
  const threatNodes = [
    { id: 1, top: "10%", left: "15%", delay: "0s" },
    { id: 2, top: "85%", left: "25%", delay: "0.3s" },
    { id: 3, top: "40%", left: "75%", delay: "0.6s" },
    { id: 4, top: "60%", left: "50%", delay: "0.9s" },
    { id: 5, top: "25%", left: "90%", delay: "1.2s" },
    { id: 6, top: "75%", left: "80%", delay: "1.5s" }
  ];

  const services = [
    {
      title: "Threat Assessment",
      description: "Comprehensive vulnerability analysis and penetration testing",
      icon: <Shield className="w-8 h-8 text-[#188f8b]" />,
      features: ["Penetration Testing", "Risk Analysis", "Security Audits"],
      bg: "bg-gradient-to-br from-blue-100/50 to-blue-50 dark:from-blue-900/10 dark:to-blue-950/5"
    },
    {
      title: "Network Security",
      description: "Protect your infrastructure from intrusions and attacks",
      icon: <Network className="w-8 h-8 text-[#188f8b]" />,
      features: ["Firewall Configuration", "Intrusion Detection", "VPN Solutions"],
      bg: "bg-gradient-to-br from-purple-100/50 to-purple-50 dark:from-purple-900/10 dark:to-purple-950/5"
    },
    {
      title: "Data Protection",
      description: "Encryption and access control for sensitive information",
      icon: <Lock className="w-8 h-8 text-[#188f8b]" />,
      features: ["End-to-End Encryption", "DLP Solutions", "Data Masking"],
      bg: "bg-gradient-to-br from-green-100/50 to-green-50 dark:from-green-900/10 dark:to-green-950/5"
    },
    {
      title: "Identity Management",
      description: "Secure authentication and access control systems",
      icon: <Fingerprint className="w-8 h-8 text-[#188f8b]" />,
      features: ["MFA Solutions", "IAM Systems", "Biometric Auth"],
      bg: "bg-gradient-to-br from-amber-100/50 to-amber-50 dark:from-amber-900/10 dark:to-amber-950/5"
    },
    {
      title: "Incident Response",
      description: "24/7 monitoring and rapid threat mitigation",
      icon: <EyeOff className="w-8 h-8 text-[#188f8b]" />,
      features: ["SIEM Solutions", "Threat Hunting", "Forensics"],
      bg: "bg-gradient-to-br from-red-100/50 to-red-50 dark:from-red-900/10 dark:to-red-950/5"
    },
    {
      title: "Cloud Security",
      description: "Enterprise-grade protection for cloud environments",
      icon: <Server className="w-8 h-8 text-[#188f8b]" />,
      features: ["CSPM", "CASB Solutions", "Cloud Firewalls"],
      bg: "bg-gradient-to-br from-indigo-100/50 to-indigo-50 dark:from-indigo-900/10 dark:to-indigo-950/5"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Threat Detection Rate", icon: <Shield className="w-6 h-6" /> },
    { value: "24/7", label: "Security Monitoring", icon: <EyeOff className="w-6 h-6" /> },
    { value: "500+", label: "Vulnerabilities Patched", icon: <Lock className="w-6 h-6" /> },
    { value: "50+", label: "Enterprise Clients", icon: <Server className="w-6 h-6" /> }
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
                Enterprise-Grade Protection
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
              Cyber Security
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Advanced protection against evolving digital threats
            </p>
          </div>

          {/* Animated Shield Graphic */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-[#188f8b]/10 rounded-full blur-xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
                  <Shield className="w-16 h-16 md:w-20 md:h-20 text-[#188f8b] animate-pulse" />
                </div>
                <div className="absolute -inset-4 border-2 border-[#188f8b]/30 rounded-3xl animate-spin-slow"></div>
                <div className="absolute -inset-8 border-2 border-[#188f8b]/20 rounded-3xl animate-spin-slow-reverse"></div>
              </div>
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
              Comprehensive Security Solutions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Protecting your digital assets with cutting-edge technologies
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
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#188f8b] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
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

      {/* Threat Landscape Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Static threat nodes visualization */}
                  <div className="absolute inset-0 opacity-30">
                    {threatNodes.map((node) => (
                      <div 
                        key={node.id}
                        className="absolute w-2 h-2 bg-[#188f8b] rounded-full animate-pulse"
                        style={{
                          top: node.top,
                          left: node.left,
                          animationDelay: node.delay
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Network className="w-16 h-16 mx-auto mb-6 text-[#188f8b]" />
                      <h3 className="text-xl font-bold text-white mb-2">Threat Visualization</h3>
                      <p className="text-slate-400">Real-time attack simulation</p>
                    </div>
                  </div>
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
                Modern Threats Require Modern Solutions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                In today&apos;s digital landscape, cyber threats evolve at an unprecedented pace. Our multi-layered security approach ensures comprehensive protection against:
              </p>
              <ul className="space-y-4">
                {[
                  "Ransomware attacks",
                  "Phishing campaigns",
                  "Zero-day exploits",
                  "Insider threats",
                  "Cloud vulnerabilities",
                  "IoT device breaches"
                ].map((threat, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">{threat}</span>
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
              Secure Your Digital Assets Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don&apos;t wait for a breach to take action. Our security experts are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#188f8b] font-semibold rounded-lg shadow-lg hover:bg-slate-100 transition-colors duration-300">
                Get Security Audit
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                Speak to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CyberSecurityPage;