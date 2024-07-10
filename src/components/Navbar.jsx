import React, { useEffect, useState } from "react";
import logo from "../assets/nav-logo.png";
import { Squash as Hamburger } from "hamburger-react";

function Navbar({ openFunc }) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    openFunc(isOpen);
  }, [isOpen]);

  return (
    <nav id="navbar">
      <figure className="nav-logo">
        <img src={logo} alt="calles-logo" />
      </figure>
      <ul className="desktop-navbar">
        <a href="#jobs">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#location">Location</a>
      </ul>
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
