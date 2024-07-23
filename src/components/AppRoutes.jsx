import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Jobs from "./Jobs";
import Gallery from "./Gallery";
import Estimate from "./Estimate";
import Services from "./Services";
import Location from "./Location";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="estimate" element={<Estimate />} />
      <Route path="services" element={<Services />} />
      <Route path="location" element={<Location />} />
    </Routes>
  );
}

export default AppRoutes;
