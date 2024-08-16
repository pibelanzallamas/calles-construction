import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Jobs from "./Jobs";
import Gallery from "./Gallery";
import Estimate from "./Estimate";
import Services from "./Services";
import Location from "./Location";
import Login from "./Login";

function AppRoutes() {
  const [value, setValue] = useState("");

  const serviceValueHandler = (value) => {
    setValue(value);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="jobs" element={<Jobs serv={value} />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="estimate" element={<Estimate />} />
      <Route
        path="services"
        element={<Services takeValue={serviceValueHandler} />}
      />
      <Route path="location" element={<Location />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
