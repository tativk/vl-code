import React from "react";
import "./Home.css";


import HomeHero from "../components/Home/HomeHero";
import Services from "../components/Home/Services";
import HomeProjects from "../components/Home/HomeProjects";
import WhyVelora from "../components/Home/WhyVelora";

import Testimonials from "../components/Home/Testimonials";
import FinalCTA from "../components/Home/FinalCTA";

const Home = () => {
  return (
    <main className="home" dir="rtl">
      <HomeHero />
      <Services />
      <HomeProjects />
      <WhyVelora />
      
      <Testimonials />
      <FinalCTA />
    </main>
  );
};

export default Home;