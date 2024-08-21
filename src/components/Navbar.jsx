import React, { useEffect, useState } from "react";
import logo from "../assets/nav-logo.png";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar({ openFunc }) {
  const [isOpen, setOpen] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    openFunc(isOpen);
  }, [isOpen]);

  return (
    <nav id="navbar">
      <div className="logo-section">
        <Link to="/">
          <figure className="nav-logo">
            <img src={logo} alt="calles-logo" />
          </figure>
        </Link>
        {user.id && <button>Change</button>}
      </div>
      <ul className="desktop-navbar">
        <Link to="/services">Services</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/location">Location</Link>
      </ul>
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
