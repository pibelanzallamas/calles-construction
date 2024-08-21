import React from "react";
// import pencil from "../assets/edit.svg";

function Service({ element, getTitle }) {
  return (
    <div className="service">
      <figure>
        <img src={element.logo} alt={element.title} />
      </figure>
      <a onClick={() => getTitle(element.title)}>{element.title}</a>
      <p>{element.desc}</p>
    </div>
  );
}

export default Service;
