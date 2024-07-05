import React from "react";
import image from "../assets/home-image.jpg";

function Home() {
  function handleGo() {
    const refe = document.getElementById("estimate");

    if (refe) {
      refe.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="home-compo" id="home">
      <figure>
        <img src={image} alt="home-image" />
      </figure>

      <h1> Calle'$ Construcction</h1>

      <p>
        We offer a variety of professional contracting services to meet all your
        needs.
      </p>

      <div className="button-estimate-div">
        <button onClick={handleGo} className="button">
          Get Estimate
        </button>
      </div>
    </section>
  );
}

export default Home;
