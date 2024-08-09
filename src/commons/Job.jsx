import React from "react";
import trash from "../assets/trash.svg";

function Job({ service }) {
  return (
    <div className="job-card">
      <figure>
        <img src={service.pic} alt={service.title} className="job-img" />
      </figure>
      <section className={service.side}>
        <div className="pencil-line">
          <h3>{service.title}</h3>
          <figure>
            <img src={trash} alt="trash-icon" />
          </figure>
        </div>
        <p>{service.bigDesc}</p>
      </section>
    </div>
  );
}

export default Job;
