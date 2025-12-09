"use client";

import React, { useState } from "react"; 
import { motion } from "framer-motion";
import Image from "next/image";

// ==============================
// 📌 Define Testimonial Type
// ==============================
interface Testimonial {
  _id: string;
  profileImage: string;
  position: string;
  fullName: string;
  companyName: string;
  review: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

// Define Component Props
interface TestimonialSectionProps {
  initialTestimonials: Testimonial[];
}

// ==============================
// 📌 Component
// ==============================
export default function TestimonialSection({ initialTestimonials }: TestimonialSectionProps) {
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const hasTestimonials = testimonials.length > 0;

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* ... (Header code remains the same) ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Clients <span className="text-[#1a837f]">Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the people who’ve worked with me
          </p>
        </motion.div>


        {/* Empty State */}
        {!hasTestimonials && (
          <p className="text-center text-gray-500">
            No testimonials available.
          </p>
        )}

        {/* MAIN CAROUSEL */}
        {hasTestimonials && (
          <div className="relative">

            {/* Left/Right Arrows (These are outside the card, so they're fine) */}
            {/* ... (Arrow button code remains the same) ... */}
             <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>


            {/* Slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t._id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      // 1. Reduced horizontal padding (p-6 vs p-8) and kept vertical spacing consistent (space-y-4/6)
                      className="bg-white rounded-xl shadow-lg p-6 sm:p-10 max-w-4xl mx-auto flex flex-col space-y-6"
                    >
                      {/* Top Row: Profile and Info */}
                      <div className="flex items-start **flex-col sm:flex-row** sm:mb-0">
                        {/* Profile: Profile image size remains fixed (h-14 w-14) */}
                        <div className="flex-shrink-0 mr-4 **mb-4 sm:mb-0**">
                          <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-blue-100">
                            <Image
                              src={t.profileImage}
                              alt={`${t.fullName} Avatar`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {t.fullName}
                          </h3>
                          {/* 2. Changed alignment from row to column for small devices for stacking name/title/stars if screen is very narrow */}
                          <div className="**flex flex-col sm:flex-row sm:items-center**"> 
                            <span className="text-gray-600 text-sm">
                              {t.position},
                            </span>
                             {/* Added a space/divider if on small screen */}
                            <span className="text-gray-600 text-sm **sm:ml-1**">
                              {t.companyName}
                            </span>
                          </div>

                          {/* Stars: Ensured stars are close to the name */}
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-5 h-5 ${i < t.stars ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review */}
                      {/* 3. Reduced bottom margin on review text for small screens (mb-4 vs mb-6) */}
                      <blockquote className="text-base sm:text-lg text-gray-700 italic **mb-4 sm:mb-6**">
                        “{t.review}”
                      </blockquote>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}