"use client";
import React, { useState, useEffect } from "react";
import { Mail, Clock, Settings, Wrench} from "lucide-react";
import ServicesSection from "@/components/landingPage/ServicesSection";
import TechStackShowcase from "@/components/landingPage/TechStackShowcase";
import ShowProjects from "@/components/landingPage/ShowProjects";
import Hero from "@/components/landingPage/Hero";
import BlogSection from "@/components/landingPage/BlogSection";

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 2 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  type TimeCardProps = {
    value: number;
    label: string;
  };

  const TimeCard: React.FC<TimeCardProps> = ({ value, label }) => (
    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="text-2xl md:text-4xl font-bold mb-2 font-mono" style={{color: '#188f8b'}}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-gray-600 text-xs md:text-sm uppercase tracking-wide font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Background Content - Blurred */}
      <div className="blur-sm pointer-events-none select-none">
        <Hero />
        <ServicesSection />
        <TechStackShowcase />
        <ShowProjects />
        <BlogSection />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

      {/* Maintenance Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto transform animate-fadeIn border border-gray-100">
          {/* Header */}
          <div className="relative p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Settings className="w-6 h-6 text-gray-600 animate-spin" style={{animationDuration: '3s'}} />
                </div>
                <div className="p-3 rounded-full" style={{backgroundColor: '#188f8b15'}}>
                  <Wrench className="w-6 h-6" style={{color: '#188f8b'}} />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
              Under Maintenance
            </h1>
            <p className="text-gray-600 text-center text-lg">
              We&apos;re working hard to improve your experience
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-gray-700 leading-relaxed">
                Our website is currently undergoing scheduled maintenance to bring you better features and improved performance. We&apos;ll be back online soon!
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 mr-2" style={{color: '#188f8b'}} />
                <span className="text-gray-700 font-medium">Back online in</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                <TimeCard value={timeLeft.days} label="Days" />
                <TimeCard value={timeLeft.hours} label="Hours" />
                <TimeCard value={timeLeft.minutes} label="Minutes" />
                <TimeCard value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" style={{color: '#188f8b'}} />
                Need Immediate Assistance?
              </h3>
              <p className="text-gray-600 text-center mb-4">
                For urgent inquiries or support, please don&apos;t hesitate to contact us:
              </p>
              <div className="text-center">
                <a 
                  href="mailto:itsolutions@seraxmi.com.my" 
                  className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{backgroundColor: '#188f8b'}}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#156f6b'}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#188f8b'}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  itsolutions@seraxmi.com
                </a>
              </div>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-sm">
                Thank you for your patience while we make these improvements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;