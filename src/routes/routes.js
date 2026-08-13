import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Verification from "../pages/Verification";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={<Verification />} />
    </Routes>
  );
};

export default AppRoutes;