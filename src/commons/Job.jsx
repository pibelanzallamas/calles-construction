import React, { useState } from "react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useSelector } from "react-redux";

function Job({ service, deleteFun, indice }) {
  const user = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  if (indice % 2 === 0) {
    service.side = "l";
  } else service.side = "r";

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

  function editFun() {
    alert("cool");
    setEditMode(true);
  }

  return (
    <div className="job-card">
      <div className={`pencil-line ${service.side}`}>
        <h3>{service.title}</h3>
        <p className="job-date">{date}</p>
        {user.id && (
          <>
            <figure onClick={() => editFun(service.id)}>
              <img src={edit} alt="edit-icon"></img>
            </figure>
            <figure onClick={() => deleteFun(service.id)}>
              <img src={trash} alt="trash-icon" />
            </figure>
          </>
        )}
      </div>
      <section className={service.side}>
        <p>{service.description}</p>
      </section>

      <figure>
        <img src={service.image} alt={service.title} className="job-img" />
      </figure>
    </div>
  );
}

export default Job;

//al activar modo de edicion: que los textos se transforme en campos y que
//se puedan editar los campos, con lo que yo quiera, pero que dentro tengan los antiguos
//y cuando yo presione, enter, o un boton que diga submit, se cambie al modo no edit
//y se vean los cambios realizados recientemente
//
