import React from "react";
import trash from "../assets/trash.svg";
import { useSelector } from "react-redux";

function Job({ service, deleteFun }) {
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
            <figure onClick={() => deleteFun()}>
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
