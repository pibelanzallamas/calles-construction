import React from "react";
// import pencil from "../assets/edit.svg";

function Service({ element, getTitle }) {
  return (
    <div className="service">
      <figure>
        <img src={element.logo} alt={element.title} />
      </figure>
      <h3 onClick={() => getTitle(element.title)}>{element.title}</h3>
      {/* <div className="pencil-line">
        {user.id && (
          <figure onClick={edit}>
            <img src={pencil} alt="pencil-icon" />
          </figure>
        )}
      </div> */}
      <p>{element.desc}</p>
    </div>
  );
}

export default Service;
