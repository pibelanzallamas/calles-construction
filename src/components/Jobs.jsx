import React, { useEffect, useState } from "react";
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

function Jobs({ serv }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [jobs, setJobs] = useState({});
  const [jid, setJid] = useState("");
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [estado, setEstado] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [rubro, setRubro] = useState(serv || "");
  const [finalJobs, setFinalJobs] = useState([]);

  //get jobs
  useEffect(() => {
    axios
      .get("https://calles-construction-back.onrender.com/api/jobs/")
      .then((resp) => setJobs(resp.data))
      .catch((err) => console.log(err));
  }, [estado]);

  //filtrar los jobs mostrados por rubro
  useEffect(() => {
    setFinalJobs(services.filter((ele) => ele.category == rubro.toLowerCase()));
  }, [rubro]);

  //upload images
  const createJobs = async (e) => {
    e.preventDefault();

    const f = new FormData();
    f.append("file", image);
    f.append("upload_preset", "nfi9e7vs");
    f.append("api_key", import.meta.env.VITE_API_KEY);
    setLoading(true);

    try {
      const url = await axios.post(
        "https://api.cloudinary.com/v1_1/dh71ewqgp/image/upload",
        f
      );
      const img = url.data.secure_url;
      const resp = await axios.post(
        "https://calles-construction-back.onrender.com/api/jobs/create",
        {
          title,
          description: desc,
          image: img,
          date,
        }
      );
      setEstado(!estado);

      if (resp.data[1]) {
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
    setImage("");
    setLoading(false);
  };

  //delete images
  const openBox = () => setConfirmBox(true);
  const closeBox = () => setConfirmBox(false);
  function handleDelete(id) {
    setJid(id);
    openBox();
  }
  const confirmDelete = async () => {
    console.log("tenes el jid?", jid);
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
            />
          </>
        ))}

      {user.id && (
        <>
          <div className="more-button">
            {more ? (
              <figure onClick={() => setMore(false)} className="more-button">
                <img src={lessButton} alt="less-button"></img>
              </figure>
            ) : (
              <figure onClick={() => setMore(true)} className="more-button">
                <img src={moreButton} alt="more-button"></img>
              </figure>
            )}
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
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
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
