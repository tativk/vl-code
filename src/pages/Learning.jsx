import React from "react";
import Hero from "../components/Learning/Hero";
import PopularCourses from "../components/Learning/PopularCourses";
import "./Learning.css";

const Learning = () => {
  return (
    <main className="Learning" dir="rtl" >
      <Hero />
      <PopularCourses />
      
    </main>

  );
};
export default Learning;