import React from "react";
import image from "../assets/home-image.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
          your needs. <span className="admin-badge">{user.id && "Admin"}</span>
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
            {user.id && <span className="admin-badge"> Admin</span>}
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
