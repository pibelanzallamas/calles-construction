import React from "react";

function Service({ logo, title, desc }) {
  return (
    <div className="service">
      <figure>
        <img src={logo} alt={title} />
      </figure>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default Service;
