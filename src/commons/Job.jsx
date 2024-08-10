import React, { useState } from "react";
import trash from "../assets/trash.svg";
import { useSelector } from "react-redux";

function Job({ service }) {
  // const [even, setEven] = useState(even % 2 == 0 ? "even" : "odd");
  const user = useSelector((state) => state.user);

  return (
    <div className="job-card">
      <figure>
        <img src={service.pic} alt={service.title} className="job-img" />
      </figure>
      <section className={service.side}>
        <div className={`pencil-line ${service.side}`}>
          <h3>{service.title}</h3>
          {user.id && (
            <figure>
              <img src={trash} alt="trash-icon" />
            </figure>
          )}
        </div>
        <p>{service.bigDesc}</p>
      </section>
    </div>
  );
}

export default Job;
