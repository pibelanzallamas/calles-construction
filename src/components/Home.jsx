import React from "react";
import image from "../assets/home-image.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/userState";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleGo() {
    navigate("/estimate");
  }

  function logOut() {
    const noUser = {
      id: null,
      email: null,
    };
    navigate("/");
    dispatch(setUser(noUser));
    alerts("Bye!", `Logout successul 🏝`, "success");
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
          {user.id ? <section className="admin-badge">Admin</section> : <></>}
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
