import React, { useState } from "react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useSelector } from "react-redux";

function Job({ service, deleteFun, indice }) {
  const user = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(service.description);
  const [title, setTitle] = useState(service.title);
  const [dat, setDat] = useState(service.date.split("T")[0]);
  const [img, setImg] = useState(null);

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

  //dos funciones para editar, una para editar solo la imagen
  //una para editar el resto de los campos

  const editFun = () => {
    setEditMode(!editMode);
  };

  const handleChangeImage = () => {};

  return (
    <div className="job-card">
      <div className={`pencil-line ${service.side}`}>
        {editMode ? (
          <>
            <input
              className="input-job"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              className="input-job"
              type="date"
              value={dat}
              onChange={(e) => setDat(e.target.value)}
            ></input>
          </>
        ) : (
          <>
            <h3>{service.title}</h3>
            <p className="job-date">{date}</p>
          </>
        )}
        {user.id &&
          (editMode ? (
            <></>
          ) : (
            <>
              <figure
                onClick={() => editFun(service.id)}
                on
                className="job-button"
                title="Enter Edit Mode"
              >
                <img src={edit} alt="edit-icon"></img>
              </figure>
              <figure
                onClick={() => deleteFun(service.id)}
                className="job-button"
                title="Delete Job"
              >
                <img src={trash} alt="trash-icon" />
              </figure>
            </>
          ))}
      </div>
      <section className={service.side}>
        {editMode ? (
          <>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              rows={3}
              maxLength={50}
              className="input-job"
            />
          </>
        ) : (
          <p>{service.description}</p>
        )}
      </section>
      {editMode && (
        <div className="edit-buttons">
          <figure onClick={() => editFun(service.id)} className="edit-button">
            <img src={edit} alt="edit-icon" title="Exit Edit Mode"></img>
          </figure>
          <button title="Update Job">Submit</button>
          <figure onClick={() => deleteFun(service.id)} className="edit-button">
            <img src={trash} alt="trash-icon" title="Delete Job" />
          </figure>
        </div>
      )}
      <div className="job-image">
        <figure>
          <img src={service.image} alt={service.title} className="job-img" />
        </figure>
        {user.id && editMode && (
          <button onClick={() => handleChangeImage(service.id)}>
            Edit image
          </button>
        )}
      </div>
    </div>
  );
}
//real alfa
export default Job;

//al activar modo de edicion: que los textos se transforme en campos y que
//se puedan editar los campos, con lo que yo quiera, pero que dentro tengan los antiguos
//y cuando yo presione, enter, o un boton que diga submit, se cambie al modo no edit
//y se vean los cambios realizados recientemente
//

//modigico aca en un job con los datos traidos por props
//  job (name: 'asdfa', title: "hahaha") mod ---> mod *job* en bdd --> mandar un senial
// de que se modifico este job, YO MODIGIQUE!!! recibie jobs recibe la alerta y trae a todos
// de nuevo/ modo view de nuevo...
