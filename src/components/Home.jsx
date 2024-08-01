import React from "react";
import image from "../assets/home-image.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleGo() {
    navigate("/estimate");
  }

  return (
    <section className="home-compo" id="home">
      <div className="home-mobile">
        <figure>
          <img src={image} alt="home-image" />
        </figure>
        <h1> Calle'$ Construcction</h1>
        <p>
          We offer a variety of professional contracting services to meet all
          your needs.
        </p>
        <div className="button-estimate-div">
          <button onClick={handleGo} className="button">
            Get Estimate
          </button>
        </div>
      </div>

      <div className="home-desktop">
        <div className="home-desktop-title">
          <h1>
            Calle'$ <br />
            Construcction
          </h1>
          <p>
            We offer a variety of professional contracting services to meet all
            your needs.
          </p>
          <button onClick={handleGo} className="button">
            Get Estimate
          </button>
        </div>
        <figure>
          <img src={image} alt="home-image" />
        </figure>
      </div>
    </section>
  );
}

export default Home;
