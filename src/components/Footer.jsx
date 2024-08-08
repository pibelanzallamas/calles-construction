import React from "react";
import { Link } from "react-router-dom";
import facelogo from "../assets/facelogo.svg";
import instalogo from "../assets/instalogo.svg";
import twitterlogo from "../assets/twitterlogo.svg";
import telegram from "../assets/telegram.svg";
import one from "../assets/1.svg";
import two from "../assets/2.svg";
import three from "../assets/3.svg";
import fourth from "../assets/5.svg";
import five from "../assets/4.svg";
import six from "../assets/6.svg";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="social">
        <figure>
          <a href="https://www.google.com.ar" target="_blank">
            <img src={facelogo} alt="social" />
          </a>
        </figure>
        <figure>
          <a href="https://www.google.com.ar" target="_blank">
            <img src={telegram} alt="social" />
          </a>
        </figure>
        <figure>
          <a href="https://www.google.com.ar" target="_blank">
            <img src={twitterlogo} alt="social" />
          </a>
        </figure>
        <figure>
          <a href="https://www.google.com.ar" target="_blank">
            <img src={instalogo} alt="social" />
          </a>
        </figure>
      </div>
      <div className="credits">
        <div className="contact">
          <div className="line">
            <img src={one} alt="" />
            <p>Contact</p>
          </div>
          <div className="line">
            <img src={two} />
            <a href="tel:347242525">
              <p>3476242525</p>
            </a>
          </div>
          <div className="line">
            <img src={three} />
            <a href="mailto:callesconstruction86@gmail.com">
              <p>callesconstruction86@gmail.com</p>
            </a>
          </div>
        </div>
        <div className="contact">
          <div className="line">
            <img src={fourth} alt="" />
            <p>Jul, 2024</p>
          </div>
          <div className="line">
            <img src={five} alt="" />
            <p>Clifton, New Jersey</p>
          </div>
          <div className="line">
            <img src={six} alt="" />
            <p>
              Powered by Vercel - <Link to={"/login"}>Admin Mode</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
