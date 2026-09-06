import React from "react";
import Hero from "../components/Learning/Hero";
import PopularCourses from "../components/Learning/PopularCourses";
import LearningPath from "../components/Learning/LearningPath";
import Header from "../components/Header-Footer/Header";
import Footer from "../components/Header-Footer/Footer";
import "./Learning.css";

const Learning = () => {
  return (
    <main className="Learning" dir="rtl" >
      <Header />
      <Hero />
      <LearningPath />
      <PopularCourses />
      <Footer />
      
    </main>

  );
};
export default Learning;