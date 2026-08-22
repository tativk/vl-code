import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Learning from "../pages/Learning";

import About from "../pages/About";
import Rules from "../pages/Rules";  
import FAQ from "../pages/FAQ";
import Signup from "../pages/Signup";
import { ImPacman } from "react-icons/im";
import Verify from "../pages/Verify";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/about" element={<About />} />
      <Route path="/rules" element={<Rules />} /> 
      <Route path="/faq" element={<FAQ />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
};

export default AppRoutes;
