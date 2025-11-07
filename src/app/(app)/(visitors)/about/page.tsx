"use client";
import React from "react";
import { Rocket, Users, Globe, Shield, Code, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

const AboutUs = () => {
  // Stats data
  const stats = [
    { value: "50+", label: "Projects Completed", icon: <Rocket className="w-6 h-6" /> },
    { value: "15+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
    { value: "100%", label: "Client Satisfaction", icon: <Users className="w-6 h-6" /> },
    { value: "24/7", label: "Global Support", icon: <Shield className="w-6 h-6" /> },
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology to create solutions that matter",
      icon: <Code className="w-8 h-8 text-[#188f8b]" />,
    },
    {
      title: "Excellence",
      description: "Delivering unparalleled quality in every product and service we provide",
      icon: <BarChart2 className="w-8 h-8 text-[#188f8b]" />,
    },
    {
      title: "Integrity",
      description: "Building trust through transparency, honesty, and ethical practices",
      icon: <Shield className="w-8 h-8 text-[#188f8b]" />,
    },
  ];

  const team = [
    {
      name: "Sachet Khatiwada",
      role: "CEO & Founder",
      image: "/SachetAvatar.jpg",
    },
    {
      name: "Piyush Pareek",
      role: "Security Expert",
      image: "/PiyushAvatar.jpg",
    },
    {
      name: "Sujan Shah",
      role: "Lead Developer",
      image: "/SujanAvatar.jpg",
    },
    {
      name: "Vedant Jain",
      role: "Tech Consultant",
      image: "/RatanAvatar.jpg",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-blue-50/30  overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900">
          <path
            d="M0,450 C300,550 700,350 1440,450 L1440,900 L0,900 Z"
            fill="currentColor"
            className="text-[#188f8b]/10 "
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50  border border-blue-200  rounded-full text-sm font-medium shadow-lg backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900  mb-6">
            Crafting Digital Excellence
          </h2>
          <p className="text-xl text-slate-600  max-w-3xl mx-auto leading-relaxed">
            Where innovative ideas meet flawless execution to create transformative digital experiences
          </p>
        </motion.div>

        {/* Company overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200  h-[400px] lg:h-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our creative team collaborating"
              fill
              className="object-cover w-full h-full"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent flex items-end p-8">
              <div>
                <p className="text-white/90 text-sm font-medium">Our Workspace</p>
                <h3 className="text-white text-2xl font-bold mt-1">Where Innovation Thrives</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900  mb-6">
              Pioneering Technology Solutions Since 2020
            </h3>
            <div className="space-y-5 text-slate-600  text-lg leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between business needs and technological possibilities, we&apos;ve grown into a trusted partner for organizations worldwide.
              </p>
              <p>
                Our team of passionate experts combines technical prowess with creative thinking to deliver solutions that not only meet but exceed expectations.
              </p>
              <p>
                We believe technology should be an enabler, not a barrier. That&apos;s why we focus on creating intuitive, powerful solutions that drive real business results.
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white  p-6 rounded-xl shadow-lg border border-slate-200  flex flex-col items-center text-center relative overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#188f8b]/10 "></div>
              <div className="bg-[#188f8b]/10 p-3 rounded-full mb-4 text-[#188f8b] relative z-10">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-bold text-slate-900  mb-2 relative z-10">
                {stat.value}
              </h4>
              <p className="text-slate-600  relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Core values */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-slate-900  mb-4">
              Our Guiding Principles
            </h3>
            <p className="text-xl text-slate-600  max-w-2xl mx-auto">
              The foundation of everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white  p-8 rounded-2xl shadow-lg border border-slate-200  hover:border-[#188f8b] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#188f8b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start mb-6 relative z-10">
                  <div className="bg-[#188f8b]/10 p-3 rounded-xl mr-5">
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900  mt-1">{value.title}</h4>
                </div>
                <p className="text-slate-600  relative z-10 text-lg leading-relaxed">
                  {value.description}
                </p>
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
            <h3 className="text-3xl font-bold text-slate-900  mb-4">
              Meet The Visionaries
            </h3>
            <p className="text-xl text-slate-600  max-w-2xl mx-auto">
              The brilliant minds shaping our future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-square shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/90 text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900  group-hover:text-[#188f8b] transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-[#188f8b]  font-medium mt-2">
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