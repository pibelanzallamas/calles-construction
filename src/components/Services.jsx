import React from "react";
import Service from "../commons/Service";
import { services } from "../utilities/services.js";

function Services() {
  return (
    <section className="services-compo">
      {services.map((service, i) => (
        <Service
          title={service.title}
          desc={service.desc}
          logo={service.logo}
          key={i}
        />
      ))}
    </section>
  );
}

export default Services;
