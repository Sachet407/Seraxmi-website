// app/page.tsx
import React from "react";
import ServicesSection from "@/components/landingPage/ServicesSection";
import TechStackShowcase from "@/components/landingPage/TechStackShowcase";
import TestimonialSection from "@/components/landingPage/Testimonial";
import Hero from "@/components/landingPage/Hero";
import BlogSection from "@/components/landingPage/BlogSection";

// Fetch testimonials
async function getTestimonials() {
  const res = await fetch("http://localhost:3000/api/testimonial", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.success ? json.data : [];
}

// ✅ Fetch blogs (SERVER)
async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 1800 }, // Cache 30 mins
  });

  console.log("Blog fetch response status:", res);

  if (!res.ok) return [];

  const json = await res.json();
  return json.success ? json.data : [];
}

const Page = async () => {
  const [testimonials, blogs] = await Promise.all([
    getTestimonials(),
    getBlogs(),
  ]);

  return (
    <>
      <Hero />
      <ServicesSection />
      <TechStackShowcase />
      
      {/* Pass blogs to BlogSection */}
      <BlogSection />

      <TestimonialSection initialTestimonials={testimonials} />
    </>
  );
};

export default Page;
