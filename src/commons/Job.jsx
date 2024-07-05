import React from "react";

function Job({ service }) {
  return (
    <div className="job-card">
      <figure>
        <img src={service.pic} alt={service.title} className="job-img" />
      </figure>
      <section className={service.side}>
        <h3>{service.title}</h3>
        <p>{service.bigDesc}</p>
      </section>
    </div>
  );
}

export default Job;
