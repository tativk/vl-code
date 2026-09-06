import React from "react";
import "./About.css";
import Header from "../components/Header-Footer/Header";
import Footer from "../components/Header-Footer/Footer";

import Hero from "../components/About/Hero";
import StorySection from "../components/About/StorySection";
import ValuesSection from "../components/About/ValuesSection";
import ProcessSection from "../components/About/ProcessSection";
import TeamSection from "../components/About/TeamSection";
import FinalCTA from "../components/About/FinalCTA";


const About = () => {
  return (
    <main className="about" dir="rtl">
      <Header />
      <Hero />
      <StorySection />
      <ValuesSection />
      <ProcessSection />
      <TeamSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default About;