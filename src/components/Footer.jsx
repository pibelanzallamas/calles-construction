import React from "react";
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
          <img src={facelogo} alt="social" />
        </figure>
        <figure>
          <img src={telegram} alt="social" />
        </figure>
        <figure>
          <img src={twitterlogo} alt="social" />
        </figure>
        <figure>
          <img src={instalogo} alt="social" />
        </figure>
      </div>
      <div className="contact">
        <div className="credits">
          <div className="line">
            <img src={one} alt="" />
            <p>Contact</p>
          </div>
          <div className="line">
            <img src={two} />
            <a href="tel:347242525">
              <p>347242525</p>
            </a>
          </div>
          <div className="line">
            <img src={three} />
            <a href="mailto:callesconstruction86@gmail.com">
              <p>callesconstruction86@gmail.com</p>
            </a>
          </div>
        </div>
        <div className="credits">
          <div className="line">
            <img src={fourth} alt="" />
            <p>2024</p>
          </div>
          <div className="line">
            <img src={five} alt="" />
            <p>Paterson, New Jersey, Usa</p>
          </div>
          <div className="line">
            <img src={six} alt="" />
            <p>Developed by Brandon Castillo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
