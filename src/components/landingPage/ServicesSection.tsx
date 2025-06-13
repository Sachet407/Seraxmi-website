"use client";
import React from 'react';
import { Code2, Smartphone, Shield, BrainCircuit, Cloud, TrendingUp, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  accentColor,
  href
}) => (
  <div className={`relative group flex flex-col p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-t-4 ${accentColor} hover:-translate-y-2 h-full`}>
    <div className="mb-4 p-3 rounded-lg bg-opacity-10 inline-flex" style={{ backgroundColor: `${accentColor.replace('border', 'bg')}20` }}>
      <Icon 
        size={28}
        strokeWidth={1.5}
        className={`${accentColor.replace('border', 'text')}`}
      />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm mb-6">{description}</p>
    
    <div className="mt-auto">
      <Link href={href} className={`inline-flex items-center ${accentColor.replace('border', 'text')} group-hover:underline font-medium`}>
        Explore more
        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
    
    <div className={`absolute inset-0 rounded-xl border-2 ${accentColor} opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10`}></div>
  </div>
);

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom websites and web applications tailored to your business needs with modern technologies.',
      accentColor: 'border-blue-500',
      href: '/services/web-development'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Cross-platform mobile applications for iOS and Android that delight your users.',
      accentColor: 'border-purple-500',
      href: '/services/app-development'
    },
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Comprehensive protection for your digital assets and infrastructure against threats.',
      accentColor: 'border-green-500',
      href: '/services/cyber-security'
    },
    {
      icon: BrainCircuit,
      title: 'AI/ML Solutions',
      description: 'Intelligent systems and predictive analytics to transform your business operations.',
      accentColor: 'border-red-500',
      href: '/services/ai-ml-solutions'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      accentColor: 'border-yellow-500',
      href: '/services/cloud-solutions'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Data-driven strategies to grow your online presence and boost conversions.',
      accentColor: 'border-pink-500',
      href: '/services/digital-marketing'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions to power your business growth in the modern era
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              accentColor={service.accentColor}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;