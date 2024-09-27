import React, { useRef, useState } from "react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

function Job({
  key,
  service,
  deleteFun,
  updateData,
  updateImages,
  indice,
  processing,
}) {
  const user = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(service.description);
  const [title, setTitle] = useState(service.title);
  const [dat, setDat] = useState(service.date.split("T")[0]);

  //algoritmo para calcular Fecha
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

  return (
    <div className="job-card" key={key}>
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
                onClick={() => setEditMode(!editMode)}
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
              maxLength={150}
              className="input-job"
            />
          </>
        ) : (
          <p>{service.description}</p>
        )}
      </section>

      <div className={"last-row"}>
        {editMode && (
          <>
            <div className="edit-buttons">
              <button
                onClick={() =>
                  updateData(service.id, {
                    title,
                    description: desc,
                    date: service.date,
                  })
                }
                title="Update Job"
              >
                Submit
              </button>
              <figure
                onClick={() => setEditMode(!editMode)}
                className="edit-button"
              >
                <img src={edit} alt="edit-icon" title="Exit Edit Mode"></img>
              </figure>
              <figure
                onClick={() => deleteFun(service.id)}
                className="edit-button"
              >
                <img src={trash} alt="trash-icon" title="Delete Job" />
              </figure>
            </div>
            {processing === service.id && (
              <>
                <ReactLoading
                  type={"spin"}
                  color="#0f4c61"
                  height={50}
                  width={50}
                />
                {setEditMode(false)}
              </>
            )}
          </>
        )}
      </div>

      <div className="job-images">
        {service.images && service.images.length > 0 ? (
          service.images.map((image, index) => (
            <div key={index} className="job-image">
              <figure>
                <img
                  src={image.image}
                  alt={service.title}
                  className="job-img"
                />
              </figure>
              {user.id && editMode && (
                <button onClick={() => updateImages(image.id, service.id)}>
                  Edit image
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}

export default Job;
