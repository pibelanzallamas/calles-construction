import React from "react";
import Service from "../commons/Service";
import { services } from "../utilities/services.js";
import { useNavigate } from "react-router-dom";

function Services({ takeValue }) {
  const navigation = useNavigate();

  const getService = (value) => {
    takeValue(value);
    navigation("/jobs");
  };

  return (
    <>
      <section className="services-compo">
        <h2>Services</h2>
        {services.map((service, i) => (
          <Service getTitle={getService} key={i} element={service} />
        ))}
      </section>
      <section className="services-compo2">
        <h2>Services</h2>
        <div className="grid-services">
          {services.map((service, i) => (
            <Service getTitle={getService} key={i} element={service} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;
