"use client";
import React, { useState } from 'react';
import { Code2, Smartphone, Shield, BrainCircuit, Cloud, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme: ColorScheme;
  href: string;
}

interface ColorScheme {
  border: string;
  text: string;
  bg: string;
  bgLight: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  colorScheme,
  href
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleNavigation = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    
    try {
      await router.push(href);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      // Reset loading state after a short delay
      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  return (
    <div className={`relative group flex flex-col p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ${colorScheme.border} border-t-4 hover:-translate-y-2 h-full`}>
      <div className={`mb-4 p-3 rounded-lg ${colorScheme.bgLight} inline-flex`}>
        <Icon 
          size={28}
          strokeWidth={1.5}
          className={colorScheme.text}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      
      <div className="mt-auto">
        <Link 
          href={href} 
          onClick={handleNavigation}
          className={`inline-flex items-center ${colorScheme.text} group-hover:underline font-medium transition-colors duration-200`}
        >
          {isNavigating ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Loading...
            </>
          ) : (
            <>
              Explore more
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </Link>
      </div>
      
      <div className={`absolute inset-0 rounded-xl border-2 ${colorScheme.border} opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10`}></div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const colorSchemes: Record<string, ColorScheme> = {
    blue: {
      border: 'border-blue-500',
      text: 'text-blue-600',
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-50'
    },
    purple: {
      border: 'border-purple-500',
      text: 'text-purple-600',
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-50'
    },
    green: {
      border: 'border-green-500',
      text: 'text-green-600',
      bg: 'bg-green-500',
      bgLight: 'bg-green-50'
    },
    red: {
      border: 'border-red-500',
      text: 'text-red-600',
      bg: 'bg-red-500',
      bgLight: 'bg-red-50'
    },
    yellow: {
      border: 'border-yellow-500',
      text: 'text-yellow-600',
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-50'
    },
    pink: {
      border: 'border-pink-500',
      text: 'text-pink-600',
      bg: 'bg-pink-500',
      bgLight: 'bg-pink-50'
    }
  };

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom websites and web applications tailored to your business needs with modern technologies.',
      colorScheme: colorSchemes.blue,
      href: '/services/web-development'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Cross-platform mobile applications for iOS and Android that delight your users.',
      colorScheme: colorSchemes.purple,
      href: '/services/app-development'
    },
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Comprehensive protection for your digital assets and infrastructure against threats.',
      colorScheme: colorSchemes.green,
      href: '/services/cyber-security'
    },
    {
      icon: BrainCircuit,
      title: 'AI/ML Solutions',
      description: 'Intelligent systems and predictive analytics to transform your business operations.',
      colorScheme: colorSchemes.red,
      href: '/services/ai-ml-solutions'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      colorScheme: colorSchemes.yellow,
      href: '/services/cloud-solutions'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Data-driven strategies to grow your online presence and boost conversions.',
      colorScheme: colorSchemes.pink,
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
              colorScheme={service.colorScheme}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;