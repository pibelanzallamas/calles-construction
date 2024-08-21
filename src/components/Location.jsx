import React from "react";
import calles from "../assets/new-calles.png";

function Location() {
  return (
    <section id="location" className="location-compo">
      <h2>Location</h2>
      <figure>
        <img src={calles} alt="calle-location" />
      </figure>
      <p>
        <i>Orchard Dr, Clifton, New Jersey </i>
      </p>
    </section>
  );
}

export default Location;
