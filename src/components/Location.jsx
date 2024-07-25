import React from "react";
import calles from "../assets/new-calles.png";
import TopButton from "../commons/TopButton";

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
      <TopButton />
    </section>
  );
}

export default Location;
