import React from "react";
import "./Home.css";

import HomeHero from "../components/Home/HomeHero";
import HomePaths from "../components/Home/HomePaths";
import FeaturedCourses from "../components/Home/FeaturedCourses";
import FeaturedPortfolio from "../components/Home/FeaturedPortfolio";
import WhyVelora from "../components/Home/WhyVelora";
import AboutTeaser from "../components/Home/AboutTeaser";
import Testimonials from "../components/Home/Testimonials";
import FinalCTA from "../components/Home/FinalCTA";

const Home = () => {
  return (
    <main className="home" dir="rtl">
      <HomeHero />
      <HomePaths />
      <FeaturedCourses />
      <FeaturedPortfolio />
      <WhyVelora />
      <AboutTeaser />
      <Testimonials />
      <FinalCTA />
    </main>
  );
};

export default Home;