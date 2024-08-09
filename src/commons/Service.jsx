import React from "react";
// import pencil from "../assets/edit.svg";

function Service({ logo, title, desc }) {
  return (
    <div className="service">
      <figure>
        <img src={logo} alt={title} />
      </figure>
      <h3>{title}</h3>
      {/* <div className="pencil-line">
        {user.id && (
          <figure onClick={edit}>
            <img src={pencil} alt="pencil-icon" />
          </figure>
        )}
      </div> */}
      <p>{desc}</p>
    </div>
  );
}

export default Service;
