import React from "react";
import trash from "../assets/trash.svg";
import { useSelector } from "react-redux";

function Job({ service, deleteFun, indice }) {
  const user = useSelector((state) => state.user);

  if (indice % 2 === 0) {
    service.side = "r";
  } else service.side = "l";

  const fecha = service.date.split("T")[0].split("-");

  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = meses[fecha[1] - 1] + " " + fecha[2];

  return (
    <div className="job-card">
      <figure>
        <img src={service.image} alt={service.title} className="job-img" />
      </figure>
      <section className={service.side}>
        <div className={`pencil-line ${service.side}`}>
          <h3>{service.title}</h3>
          <p className="job-date">{date}</p>
          {user.id && (
            <figure onClick={() => deleteFun(service.id)}>
              <img src={trash} alt="trash-icon" />
            </figure>
          )}
        </div>
        <p>{service.description}</p>
      </section>
    </div>
  );
}

export default Job;
