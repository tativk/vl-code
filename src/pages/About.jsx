import React from "react";
import "./About.css";

import Hero from "../components/About/Hero";
import StorySection from "../components/About/StorySection";
import ValuesSection from "../components/About/ValuesSection";
import ProcessSection from "../components/About/ProcessSection";
import TeamSection from "../components/About/TeamSection";
import FinalCTA from "../components/About/FinalCTA";
import ScrollToTop from "../components/ScrollToTop";

const About = () => {
  return (
    <main className="about" dir="rtl">
      <Hero />
      <StorySection />
      <ValuesSection />
      <ProcessSection />
      <TeamSection />
      <FinalCTA />
    </main>
  );
};

export default About;