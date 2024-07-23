import React from "react";
import calles from "../assets/calles_calle.png";

function Location() {
  return (
    <section className="location-compo" id="location">
      <h2>Location</h2>
      <figure className="location-img">
        <img src={calles} alt="calle-location" />
      </figure>
      <p>
        <i>Orchard Dr, Clifton, New Jersey </i>
      </p>
    </section>
  );
}

export default Location;
