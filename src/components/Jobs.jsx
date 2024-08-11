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

  //get images

  //upload images
  function createJobs(e) {
    e.preventDefault();
    setLoading(true);
    //loading true
    //subir imagen a server
    //obtener url
    //enviar url y lo demas
    //alerts todo bien
    //cambiar estado
    //loading false
    alert("upload");
    setEstado(!estado);
    setLoading(false);
  }

  //delete images
  function handleDelete() {
    alert("delete");
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
          <Job service={service} key={i} deleteFun={handleDelete} />
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
