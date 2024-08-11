import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { texts } from "../utilities/text";
import axios from "axios";
import Text from "../commons/Text";
import Job from "../commons/Job";
import TopButton from "../commons/TopButton";
import portadaJobs from "../assets/jobs-img.jpg";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";
import { alerts } from "../utils/alerts";

function Jobs() {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [estado, setEstado] = useState(false);

  //get jobs
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/jobs/")
      .then((resp) => setJobs(resp.data))
      .catch((err) => console.log(err));
  }, [estado]);

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
      const resp = await axios.post("http://localhost:3000/api/jobs/create", {
        title,
        description: desc,
        image: img,
        date,
      });
      setEstado(!estado);

      if (resp.data[1]) {
        alerts("Good!", "Jobs was created successfuly", "success");
      } else {
        alerts("Atention!", "Jobs was already created", "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Warning!", "Jobs could be created", "warning");
    }
    setTitle("");
    setDesc("");
    setDate("");
    setImage(null);
    setLoading(false);
  };

  //delete images
  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3000/api/jobs/delete/${id}`
      );

      alert("Good", "The Job was created", "success");
      setEstado(!estado);
    } catch (e) {
      console.log(e);
      alerts("Atention", "The Job couldn't be erase", "danger");
    }
  };

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>
      <figure className="jobs-img">
        <img src={portadaJobs} alt="jobs-img" />
      </figure>
      <Text text={texts[0]} />

      {jobs.length > 0 &&
        jobs.map((job, i) => (
          <>
            <Job
              service={job}
              key={job.id}
              indice={i}
              deleteFun={handleDelete}
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
      <TopButton />
    </section>
  );
}

export default Jobs;
