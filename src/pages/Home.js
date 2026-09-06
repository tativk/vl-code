import React from "react";
import "./Home.css";
import Header from "../components/Header-Footer/Header";
import Footer from "../components/Header-Footer/Footer";
import HomeHero from "../components/Home/HomeHero";
import Services from "../components/Home/Services";
import HomeProjects from "../components/Home/HomeProjects";
import WhyVelora from "../components/Home/WhyVelora";

import Testimonials from "../components/Home/Testimonials";
import FinalCTA from "../components/Home/FinalCTA";

const Home = () => {
  return (
    <main className="home" dir="rtl">
      <Header />
      <HomeHero />
      <Services />
      <HomeProjects />
      <WhyVelora />
      
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home;