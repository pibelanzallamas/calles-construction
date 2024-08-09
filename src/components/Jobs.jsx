import React, { useState } from "react";
import Text from "../commons/Text";
import Job from "../commons/Job";
import { useSelector } from "react-redux";
import { services } from "../utilities/services";
import jobs from "../assets/jobs-img.jpg";
import TopButton from "../commons/TopButton";
import moreButton from "../assets/moreButton.svg";
import lessButton from "../assets/lessButton.svg";

function Jobs() {
  const texts = [
    {
      title: "Philosophy",
      desc: "We are a solid group that cares for each other, cares about the work and cares about the people who hired us. We pay attention to details because we believe those are the most important things.",
    },
    {
      title: "Methodology",
      desc: "We ensure quality by using top-notch materials, maintaining clear communication, adhering to safety standards, and delivering timely results with attention to team work.",
    },
  ];
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);

  function handleMore() {
    setMore(true);
  }

  function handleLess() {
    setMore(false);
  }

  function createJobs() {
    setLoading(true);
  }

  return (
    <section id="jobs" className="jobs-compo">
      <h2>Jobs</h2>

      {user.id && (
        <>
          {more ? (
            <figure onClick={handleLess} className="more-button">
              <img src={lessButton} alt="less-button"></img>
            </figure>
          ) : (
            <figure onClick={handleMore} className="more-button">
              <img src={moreButton} alt="more-button"></img>
            </figure>
          )}
          {more && (
            <div className="estimate-compo form-job">
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
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    required
                    maxLength={20}
                    placeholder="image"
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
      {/* <figure className="jobs-img">
        <img src={jobs} alt="jobs-img" />
      </figure>

      <Text text={texts[0]} />

      <Job service={services[0]} />

      <Job service={services[1]} />

      <Job service={services[2]} />

      <Text text={texts[1]} />

      <Job service={services[3]} />

      <Job service={services[4]} />

      <Job service={services[5]} /> */}
      <TopButton />
    </section>
  );
}

export default Jobs;
