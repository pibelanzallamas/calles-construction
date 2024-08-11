import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { services } from "../utilities/services";
import { texts } from "../utilities/text";
import axios from "axios";
import Text from "../commons/Text";
import Job from "../commons/Job";
import TopButton from "../commons/TopButton";
import portadaJobs from "../assets/jobs-img.jpg";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";

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

  // function changeEstado() {
  //   setEstado(!estado);
  // }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/images/")
  //     .then((jobs) => {
  //       setJobs(jobs.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // function deleteJob() {
  //   const jid = 9;
  //   axios
  //     .delete(
  //       "http://localhost:3000/api/images/delete",
  //       {
  //         data: { jid },
  //       },
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     )
  //     .then((res) => {
  //       alert("Deleted!", "Job deleted correctly", "danger");
  //     });
  // }

  // function createJobs(e) {
  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("api_key", import.meta.env.VITE_IMG_API);
  //   formData.append("name", title);

  //   axios
  //     .post("https://www.imghippo.com/v1/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials: false,
  //     })
  //     .then((response) => {
  //       console.log("exito", response);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  //   setLoading(false);
  // }

  function createJobs(e) {
    e.preventDefault();
    alert("ok");
  }

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>

      <figure className="jobs-img">
        <img src={portadaJobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      {services.map((service, i) => (
        <>
          <Job service={service} key={i} />
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
                  <label>Date</label>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                    maxLength={20}
                    placeholder="date"
                  />
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea
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
                  <label>Image</label>
                  <input
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
