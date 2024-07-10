import React from "react";

function Hidden({ isOpen }) {
  return (
    <div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#jobs">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#location">Location</a>
      </ul>
    </div>
  );
}

export default Hidden;
