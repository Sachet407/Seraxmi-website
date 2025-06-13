"use client";
import React from "react";

import ServicesSection from "@/components/landingPage/ServicesSection";
import TechStackShowcase from "@/components/landingPage/TechStackShowcase";
import ShowProjects from "@/components/landingPage/ShowProjects";
import Hero from "@/components/landingPage/Hero";
import BlogSection from "@/components/landingPage/BlogSection";



const page = () => {

  return (
    <>
      <Hero />
      <ServicesSection />
      <TechStackShowcase />
      <ShowProjects />
      <BlogSection/>
    </>
  );
};

export default page;