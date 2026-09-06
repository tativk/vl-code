import React from "react";
import Hero from "../components/Learning/Hero";
import PopularCourses from "../components/Learning/PopularCourses";
import LearningPath from "../components/Learning/LearningPath";
import MainCourses from "../components/Learning/MainCourses";
import Header from "../components/Header-Footer/Header";
import Footer from "../components/Header-Footer/Footer";
import "./Learning.css";

const Learning = () => {
  return (
    <>
      <Header />
      <main className="Learning" dir="rtl">
        <Hero />
        <LearningPath />
        <MainCourses />
        <PopularCourses />
      </main>
      <Footer />
    </>
  );
};
export default Learning;
