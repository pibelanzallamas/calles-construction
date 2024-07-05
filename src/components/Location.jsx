import React from "react";
import calles from "../assets/calles_calle.png";

function Location() {
  function handleGo() {
    const refe = document.getElementById("navbar");

    if (refe) {
      refe.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="location-compo" id="location">
      <h2>Location</h2>
      <figure className="location-img">
        <img src={calles} alt="calle-location" />
      </figure>
      <p>
        <i>Orchard Dr, Clifton, New Jersey </i>
      </p>

      <div className="button-estimate-div">
        <button onClick={handleGo} className="button">
          Go to Top
        </button>
      </div>
    </section>
  );
}

export default Location;
