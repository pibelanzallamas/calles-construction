import React from "react";
import Service from "../commons/Service";
import { services } from "../utilities/services.js";

function Services() {
  return (
    <section className="services-compo">
      <h2>Services</h2>
      <div className="grid-services">
        {services.map((service, i) => (
          <Service
            title={service.title}
            desc={service.desc}
            logo={service.logo}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;
