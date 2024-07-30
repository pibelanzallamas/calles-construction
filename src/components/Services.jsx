import React from "react";
import Service from "../commons/Service";
import { services } from "../utilities/services.js";
import TopButton from "../commons/TopButton";
import tail from "../assets/tail.png";

function Services() {
  return (
    <>
      <section className="services-compo">
        <h2>Services</h2>
        {services.map((service, i) => (
          <Service
            title={service.title}
            desc={service.desc}
            logo={service.logo}
            key={i}
          />
        ))}
        <TopButton />
      </section>
      <section className="services-compo2">
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
        <figure className="tail-deco">
          <img src={tail} alt="tail-for-decoration" />
        </figure>
        <TopButton />
      </section>
    </>
  );
}

export default Services;
