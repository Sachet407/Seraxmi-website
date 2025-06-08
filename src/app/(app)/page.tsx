"use client";
import React from "react";

import ServicesSection from "@/components/landingPage/ServicesSection";
import TechStackShowcase from "@/components/landingPage/TechStackShowcase";
import ShowProjects from "@/components/landingPage/ShowProjects";
import Hero from "@/components/landingPage/Hero";



const page = () => {

  return (
    <>
      <Hero />
      <ServicesSection />
      <TechStackShowcase />
      <ShowProjects />
    </>
  );
};

export default page;