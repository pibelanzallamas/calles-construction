import React, { useRef, useState } from "react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { alerts } from "../utils/alerts";
import ReactLoading from "react-loading";

function Job({ key, service, deleteFun, disparador, indice }) {
  const user = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(service.description);
  const [title, setTitle] = useState(service.title);
  const [dat, setDat] = useState(service.date.split("T")[0]);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const imgUpdater = useRef(null);

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

  //mod jobs
  //texts
  const submitUpdate = async () => {
    setLoading(true);
    try {
      const resp = await axios.put(
        `https://calles-construction-back.onrender.com/api/jobs/update/${key}`,
        { title, desc, dat }
      );

      console.log(resp.data);

      if (resp.data) {
        alerts("Okey!", "Job updated successfuly", "success");
        disparador();
      } else {
        alerts("Sorry!", "Job couldn't be updated", "warning");
      }
    } catch (e) {
      console.log("exit", e);
      alerts("Sorry!", "Job couldn't be updated", "danger");
    }
    setLoading(false);
  };

  const handleNewImage = (e) => {
    setImg(e.target.files[0]);
    handleChangeImage();
  };

  //image
  const handleChangeImage = async (key) => {
    const f = new FormData();
    f.append("file", img);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);
    setLoading(true);
    try {
      const clou = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );
      const link = clou.data.secure_url;

      console.log(link);

      const res = await axios.put(
        `https://calles-construction-back.onrender.com/api/jobs/update/${key}`,
        { link }
      );

      if (res.data) {
        disparador();
        alerts("Okey!", "Image updated successfuly", "success");
      } else {
        alerts("Sorry!", "Image couldn't be updated", "warning");
      }
    } catch (e) {
      console.log("error", e);
      alerts("Sorry!", "Image couldn't be updated", "danger");
    }
    setLoading(false);
  };

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
          <div className="edit-buttons">
            <figure
              onClick={() => setEditMode(!editMode)}
              className="edit-button"
            >
              <img src={edit} alt="edit-icon" title="Exit Edit Mode"></img>
            </figure>
            <button onClick={() => submitUpdate()} title="Update Job">
              Submit
            </button>
            <figure
              onClick={() => deleteFun(service.id)}
              className="edit-button"
            >
              <img src={trash} alt="trash-icon" title="Delete Job" />
            </figure>
          </div>
        )}
        {loading && (
          <ReactLoading type={"spin"} color="#0f4c61" height={50} width={50} />
        )}
      </div>
      <div className="job-image">
        <figure>
          <img src={service.image} alt={service.title} className="job-img" />
        </figure>
        {user.id && editMode && (
          <button onClick={() => imgUpdater.current.click()}>Edit image</button>
        )}
      </div>
      <input
        ref={imgUpdater}
        id="imagen-updater"
        type="file"
        onChange={handleNewImage}
        style={{ display: "none" }}
      ></input>
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

//editJob=> {
//recibir nuevos datos, title, date, descr
//actualizar datos con axios.put {desd, title, date}
//alerts
//mandar estado al jobs para marcar que tiene updates

//obtener link wwww.comepu.e
//obtener id www pavada
//modfiicar imagen y listo
