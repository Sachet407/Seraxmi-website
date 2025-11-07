"use client";
import React from "react";
import ServicesSection from "@/components/landingPage/ServicesSection";
import TechStackShowcase from "@/components/landingPage/TechStackShowcase";
import TestimonialSection from "@/components/landingPage/Testimonial";
import Hero from "@/components/landingPage/Hero";
import BlogSection from "@/components/landingPage/BlogSection";
const page = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TechStackShowcase />
      <BlogSection />
      <TestimonialSection />
    </>
  );
};
export default page;