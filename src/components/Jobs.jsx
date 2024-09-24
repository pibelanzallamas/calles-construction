import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import { texts } from "../utilities/text";
import { services } from "../utilities/services";
import Text from "../commons/Text";
import Job from "../commons/Job";
import TopButton from "../commons/TopButton";
import UserModals from "../modals/UserModals";
import portadaJobs from "../assets/jobs-img.jpg";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import ReactLoading from "react-loading";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

function Jobs({ serv }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [jobs, setJobs] = useState({});
  const [rubro, setRubro] = useState(serv || "");
  const [finalJobs, setFinalJobs] = useState([]); //jobs filtrados
  const [estado, setEstado] = useState(false);
  const [more, setMore] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [moreImages, setMoreImages] = useState(1);
  const divs = Array.from({ length: moreImages });
  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [id, setId] = useState("");
  const [processing, setProcessing] = useState(null);
  const imgUpdater = useRef(null);
  const [newImg, setNewImg] = useState("");
  const [deleting, setDeleting] = useState(false);

  //get jobs
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/jobs/") //ver si se modifica jobs"" tamb se modifina finalJobsss
      .then((resp) => setJobs(resp.data))
      .catch((err) => console.log(err));
  }, [estado]);

  //filtrar
  useEffect(() => {
    if (services.length > 0) {
      setFinalJobs(
        services.filter(
          (ele) => ele.category.toLowerCase() == rubro.toLowerCase()
        )
      );
    }
  }, [rubro, jobs]);

  //select default value for category with rubro
  useEffect(() => {
    if (rubro) {
      setCategory(rubro.toLowerCase());
      setMore(false);
      setMoreImages(1);
    }
  }, [rubro]);

  //post job
  //upload images to the cloud
  const uploadImages = async (pic) => {
    const f = new FormData();
    f.append("file", pic);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );
      return data.secure_url;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to upload image to the cloud");
    }
  };
  //upload images into db
  const imagesDb = async (link, category, jid) => {
    try {
      await axios.post(
        "https://calles-construction-back.onrender.com/api/images/create",
        {
          image: link,
          category,
          jid,
        }
      );

      return true;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to upload image to the database");
    }
  };
  //create job
  const createJobs = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const links = [];

      for (let i = 0; i < allImages.length; i++) {
        links.push(await uploadImages(allImages[i]));
      }

      const resp = await axios.post(
        "https://calles-construction-back.onrender.com/api/jobs/create",
        {
          title,
          description: desc,
          date,
          category,
        }
      );

      if (resp.data) {
        console.log(resp.data);
        for (let i = 0; i < links.length; i++) {
          imagesDb(links[i], category, resp.data[1].id);
        }

        setEstado(!estado);
        alerts("Okey!", "Job upload successfuly", "success");
        navigate("/jobs");
      } else {
        alerts("Atention!", "Jobs was already created", "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Job couldn't be uploaded", "danger");
    }
    setTitle("");
    setDesc("");
    setDate("");
    setLoading(false);
  };

  //delete job
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);
  function handleDelete(id) {
    setJid(id);
    openBox();
  }
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const resp = await axios.delete(
        `https://calles-construction-back.onrender.com/api/jobs/delete/${jid}`
      );

      alerts("Okey!", "Job erased successfuly", "success");
      setEstado(!estado);
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Job couldn't be erased", "danger");
    }
    closeBox();
    setDeleting(false);
  };

  const updateData = async (id, data) => {
    setProcessing(id);

    try {
      await axios.put(
        `https://calles-construction-back.onrender.com/api/jobs/update/${id}`,
        { data }
      );

      setEstado(!estado);
      alerts(
        "Job Modified",
        "The job has been modified successfully.",
        "success"
      );
    } catch (e) {
      alerts("Modification Error", "The job could not be modified.", "warning");
      console.log(e);
    }
    setProcessing(0);
  };

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>
      <figure className="jobs-img">
        <img src={portadaJobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      <div className="botonera">
        <a onClick={() => setRubro("Drywall")}>Drywall</a>
        <a onClick={() => setRubro("Painting")}>Painting</a>
        <a onClick={() => setRubro("Electrical")}>Electrical</a>
        <a onClick={() => setRubro("Carpentry")}>Carpentry</a>
        <a onClick={() => setRubro("Plumbing")}>Plumbing</a>
        <a onClick={() => setRubro("Utilities")}>Utilities</a>
      </div>

      {rubro && <h2 className="rubro-title">{rubro}</h2>}

      {finalJobs.length > 0 &&
        finalJobs.map((job, i) => (
          <>
            <Job
              key={job.id}
              service={job}
              indice={i}
              deleteFun={handleDelete}
              disparador={() => setEstado(!estado)}
              updateData={updateData}
            />
            {console.log("job id desde JOB COMPO", job.id)}
            {deleting && (
              <ReactLoading
                type={"spin"}
                color="#0f4c61"
                height={50}
                width={50}
              />
            )}
          </>
        ))}

      {user.id && (
        <>
          <div className="more-button">
            <figure onClick={() => setMore(!more)} className="more-button">
              <img src={more ? lessButton : moreButton} alt="less-button"></img>
            </figure>
          </div>
          {more && (
            <div className="form-job">
              <form onSubmit={createJobs}>
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    maxLength={25}
                    placeholder="title"
                  />
                </div>
                <div className="field">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                    rows={5}
                    maxLength={140}
                    placeholder="description"
                  />
                </div>
                <div className="field">
                  <label htmlFor="cat">Category</label>
                  <select
                    id="cat"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="drywall">Drywall</option>
                    <option value="painting">Painting</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>

                {divs.map((_, index) => (
                  <div key={index} className="field">
                    <label htmlFor="image">Image {index + 1}</label>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => {
                        const updatedImages = [...allImages];
                        updatedImages[index] = e.target.files[0];
                        setAllImages(updatedImages);
                      }}
                      required
                    />
                  </div>
                ))}

                <div className="moreLessImages">
                  {moreImages > 1 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages > 1 ? moreImages - 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={minus} alt="more-button"></img>
                    </figure>
                  )}

                  {moreImages < 15 && (
                    <figure
                      onClick={() =>
                        setMoreImages(
                          moreImages < 15 ? moreImages + 1 : moreImages
                        )
                      }
                      className="more-button"
                    >
                      <img src={plus} alt="more-button"></img>
                    </figure>
                  )}
                </div>

                {loading ? (
                  <p className="loading-text"> Loading ...</p>
                ) : (
                  <button type="submit">Send</button>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {rubro && <TopButton />}

      <UserModals
        isOpen={confirmBox}
        onClose={closeBox}
        onConfirm={confirmDelete}
        text={"You sure you want to delete this job?"}
      />
    </section>
  );
}

export default Jobs;

//tenemos para agregar jobs:
//en dos tablas:
//primera, datos normales
//segunda, images
//la segunda linkeada a la primera por un Job ID
//para eliminar:
//esuchar el boton, pasasrle el id del job.
//con el id borrar directo d ela bdd
//update. dos tabla:
//modificar solo los datos --> mod esa tabla, co jid
//modificar la otra de acuerdo al IMG ID de cada imagen
//modificarla
